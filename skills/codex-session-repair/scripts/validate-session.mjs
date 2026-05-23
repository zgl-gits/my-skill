import fs from "node:fs";
import readline from "node:readline";

const [path, thresholdArg = "200000"] = process.argv.slice(2);
const threshold = Number.parseInt(thresholdArg, 10);

if (!path) {
  console.error("Usage: node validate-session.mjs <session.jsonl> [large-line-threshold]");
  process.exit(2);
}

let lineCount = 0;
let parseErrors = 0;
let largeRows = 0;
let imageUrlLines = 0;
let inputImageLines = 0;
let dataImageLines = 0;
let pngBase64Lines = 0;
let compactedRows = 0;
let maxLineBytes = 0;

const rl = readline.createInterface({
  input: fs.createReadStream(path, { encoding: "utf8" }),
  crlfDelay: Infinity,
});

rl.on("line", (line) => {
  lineCount += 1;
  const bytes = Buffer.byteLength(line, "utf8");
  if (bytes > maxLineBytes) maxLineBytes = bytes;
  if (bytes >= threshold) largeRows += 1;
  if (line.includes('"image_url"')) imageUrlLines += 1;
  if (line.includes('"input_image"')) inputImageLines += 1;
  if (line.includes("data:image/")) dataImageLines += 1;
  if (line.includes("iVBORw0KGgo")) pngBase64Lines += 1;

  try {
    const parsed = JSON.parse(line);
    if (parsed?.type === "compacted") compactedRows += 1;
  } catch {
    parseErrors += 1;
  }
});

rl.on("close", () => {
  console.log(JSON.stringify({
    line_count: lineCount,
    parse_errors: parseErrors,
    large_rows: largeRows,
    max_line_bytes: maxLineBytes,
    image_url_lines: imageUrlLines,
    input_image_lines: inputImageLines,
    data_image_lines: dataImageLines,
    png_base64_lines: pngBase64Lines,
    compacted_rows: compactedRows,
    file_bytes: fs.statSync(path).size,
  }, null, 2));
});
