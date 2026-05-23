[CmdletBinding()]
param(
  [Parameter(Mandatory = $true)]
  [string] $SessionFile,

  [string] $WorkRoot = (Join-Path $env:LOCALAPPDATA 'CodexSessionRepair'),

  [int] $LargeLineBytes = 200000,

  [switch] $Apply
)

$ErrorActionPreference = 'Stop'

function Get-SharedSha256 {
  param([Parameter(Mandatory = $true)][string] $Path)

  $sha = [System.Security.Cryptography.SHA256]::Create()
  $stream = [System.IO.File]::Open(
    $Path,
    [System.IO.FileMode]::Open,
    [System.IO.FileAccess]::Read,
    [System.IO.FileShare]::ReadWrite
  )
  try {
    return ([BitConverter]::ToString($sha.ComputeHash($stream))).Replace('-', '')
  }
  finally {
    $stream.Dispose()
    $sha.Dispose()
  }
}

function Copy-SharedFile {
  param(
    [Parameter(Mandatory = $true)][string] $Source,
    [Parameter(Mandatory = $true)][string] $Destination
  )

  $in = [System.IO.File]::Open(
    $Source,
    [System.IO.FileMode]::Open,
    [System.IO.FileAccess]::Read,
    [System.IO.FileShare]::ReadWrite
  )
  try {
    $out = [System.IO.File]::Open(
      $Destination,
      [System.IO.FileMode]::Create,
      [System.IO.FileAccess]::Write,
      [System.IO.FileShare]::None
    )
    try {
      $in.CopyTo($out)
    }
    finally {
      $out.Dispose()
    }
  }
  finally {
    $in.Dispose()
  }
}

function Test-JsonlSession {
  param(
    [Parameter(Mandatory = $true)][string] $Path,
    [int] $LargeThreshold = 200000
  )

  $validator = Join-Path $PSScriptRoot 'validate-session.mjs'
  $raw = & node $validator $Path $LargeThreshold
  if ($LASTEXITCODE -ne 0) {
    throw "validate-session.mjs failed with exit code $LASTEXITCODE"
  }
  $raw | ConvertFrom-Json
}

$source = (Resolve-Path -LiteralPath $SessionFile).Path
$sessionsRoot = Join-Path $env:USERPROFILE '.codex\sessions'
$resolvedSessionsRoot = (Resolve-Path -LiteralPath $sessionsRoot).Path

if (-not $source.StartsWith($resolvedSessionsRoot, [System.StringComparison]::OrdinalIgnoreCase)) {
  throw "Refusing to repair a file outside Codex sessions: $source"
}

if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
  throw 'Node.js is required for streaming JSONL sanitization but was not found on PATH.'
}

$backupDir = Join-Path $WorkRoot 'backups'
$candidateDir = Join-Path $WorkRoot 'candidates'
New-Item -ItemType Directory -Force -Path $backupDir, $candidateDir | Out-Null

$timestamp = Get-Date -Format 'yyyyMMdd-HHmmss'
$leaf = Split-Path -Leaf $source
$backup = Join-Path $backupDir ($leaf -replace '\.jsonl$', ".$timestamp.original.jsonl")
$candidate = Join-Path $candidateDir ($leaf -replace '\.jsonl$', ".$timestamp.sanitized.jsonl")
$script = Join-Path $PSScriptRoot 'sanitize-session.mjs'

$sourceHashBefore = Get-SharedSha256 $source
Copy-SharedFile -Source $source -Destination $backup
$backupHash = Get-SharedSha256 $backup

if ($sourceHashBefore -ne $backupHash) {
  throw "Backup hash mismatch. Source may have changed during copy."
}

$sanitizeReportRaw = & node $script $backup $candidate (Split-Path -Leaf $backup)
if ($LASTEXITCODE -ne 0) {
  throw "sanitize-session.mjs failed with exit code $LASTEXITCODE"
}
$sanitizeReport = $sanitizeReportRaw | ConvertFrom-Json
$candidateStats = Test-JsonlSession -Path $candidate -LargeThreshold $LargeLineBytes

if ($candidateStats.parse_errors -ne 0) {
  throw "Candidate has JSON parse errors: $($candidateStats.parse_errors)"
}

$applied = $false
$sourceHashAfter = $null

if ($Apply) {
  $currentHash = Get-SharedSha256 $source
  if ($currentHash -ne $backupHash) {
    throw "Refusing to apply because source changed after backup. Current=$currentHash Backup=$backupHash"
  }

  Copy-SharedFile -Source $candidate -Destination $source
  $candidateHash = Get-SharedSha256 $candidate
  $sourceHashAfter = Get-SharedSha256 $source

  if ($candidateHash -ne $sourceHashAfter) {
    throw "Applied file hash mismatch. Candidate=$candidateHash Source=$sourceHashAfter"
  }

  $applied = $true
}

[pscustomobject]@{
  source = $source
  backup = $backup
  candidate = $candidate
  applied = $applied
  source_hash_before = $sourceHashBefore
  source_hash_after = $sourceHashAfter
  sanitize_report = $sanitizeReport
  candidate_stats = $candidateStats
} | ConvertTo-Json -Depth 10
