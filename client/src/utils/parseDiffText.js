function parseDiffText(diffText) {
  const files = [];
  let current = null;
  let lineNum = 0;

  const lines = diffText.split("\n");

  for (const raw of lines) {
    if (raw.startsWith("File: ")) {
      if (current) files.push(current);
      current = { filename: raw.slice(6).trim(), lines: [] };
      lineNum = 0;
      continue;
    }

    if (raw.startsWith("---")) continue;
    if (!current) continue;

    const match = raw.match(/^Line (\d+) \((added|removed|context)\): (.*)/);

    if (match) {
      lineNum = parseInt(match[1]);
      current.lines.push({
        lineNumber: lineNum,
        type: match[2],
        content: match[3],
      });
    } else if (raw.trim()) {
      lineNum++;
      current.lines.push({
        lineNumber: lineNum,
        type: "context",
        content: raw,
      });
    }
  }

  if (current) files.push(current);
  return files;
}

export default parseDiffText;
