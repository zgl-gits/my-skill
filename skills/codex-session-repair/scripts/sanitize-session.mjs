import fs from "node:fs";
import readline from "node:readline";

const [src, out, backupName = "original backup"] = process.argv.slice(2);

if (!src || !out) {
  console.error("Usage: node sanitize-session.mjs <source.jsonl> <output.jsonl> [backup-name]");
  process.exit(2);
}

const note = `[omitted historical image payload during local Codex session repair; original preserved in ${backupName}]`;

let lineNo = 0;
let changedLines = 0;
let parseErrors = 0;
let omittedStrings = 0;
let omittedImages = 0;
let beforeBytes = 0;
let afterBytes = 0;

function shouldOmitString(value) {
  if (/^data:image\//.test(value)) return true;
  if (/^(iVBORw0KGgo|\/9j\/|R0lGODlh|UklGR)/.test(value)) return true;
  if (value.length > 200000 && /^[A-Za-z0-9+/=\r\n]+$/.test(value)) return true;
  return false;
}

function sanitize(value) {
  if (typeof value === "string") {
    if (shouldOmitString(value)) {
      omittedStrings += 1;
      return { value: note, changed: true };
    }
    return { value, changed: false };
  }

  if (Array.isArray(value)) {
    let changed = false;
    const next = value.map((item) => {
      const result = sanitize(item);
      changed ||= result.changed;
      return result.value;
    });
    return { value: next, changed };
  }

  if (value && typeof value === "object") {
    if (value.type === "input_image") {
      omittedImages += 1;
      return { value: { type: "input_text", text: note }, changed: true };
    }

    let changed = false;
    const next = {};
    for (const [key, item] of Object.entries(value)) {
      const result = sanitize(item);
      changed ||= result.changed;
      next[key] = result.value;
    }
    return { value: next, changed };
  }

  return { value, changed: false };
}

const input = fs.createReadStream(src, { encoding: "utf8" });
const output = fs.createWriteStream(out, { encoding: "utf8" });
const rl = readline.createInterface({ input, crlfDelay: Infinity });

rl.on("line", (line) => {
  lineNo += 1;
  beforeBytes += Buffer.byteLength(line, "utf8") + 1;

  let outLine = line;
  const likelyNeedsSanitizing =
    line.includes("input_image") ||
    line.includes("image_url") ||
    line.includes("data:image/") ||
    line.includes("iVBORw0KGgo") ||
    line.includes("/9j/") ||
    line.includes("R0lGODlh") ||
    line.includes("UklGR");

  if (likelyNeedsSanitizing) {
    try {
      const parsed = JSON.parse(line);
      const result = sanitize(parsed);
      if (result.changed) {
        outLine = JSON.stringify(result.value);
        changedLines += 1;
      }
    } catch {
      parseErrors += 1;
    }
  }

  afterBytes += Buffer.byteLength(outLine, "utf8") + 1;
  output.write(`${outLine}\n`);
});

rl.on("close", () => {
  output.end(() => {
    const report = {
      lineNo,
      changedLines,
      parseErrors,
      omittedStrings,
      omittedImages,
      beforeBytes,
      afterBytes,
      savedBytes: beforeBytes - afterBytes,
    };
    console.log(JSON.stringify(report, null, 2));
  });
});
