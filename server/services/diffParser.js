
function parseDiff(diffText) {
  const file = [];
  let currentFile = null;
  let lineNumber = 0;

  const lines = diffText.split("\n");

  let k = 1;
  for (const line of lines) {
    // console.log(line + " " + k++);

    if (line.startsWith("diff --git")) {
      if (currentFile) file.push(currentFile);

      currentFile = {
        filename: "",
        changes: [],
      };
    } else if (line.startsWith("+++ b/")) {
      if (currentFile) {
        currentFile.filename = line.slice(6);
      }
    } else if (line.startsWith("@@ ")) {
      const match = line.match(/\+([0-9]+)/);
      lineNumber = match ? parseInt(match[1]) : 0;
    } else if (currentFile) {
      if (line.startsWith("+") && !line.startsWith("+++")) {
        currentFile.changes.push({
          lineNumber: lineNumber,
          type: "added",
          content: line.slice(1),
        });

        lineNumber++;
      } else if (line.startsWith("-") && !line.startsWith("---")) {
        currentFile.changes.push({
          lineNumber: lineNumber,
          type: "removed",
          content: line.slice(1),
        });
      } else if (line.startsWith("\\")) {
        lineNumber++;
      }
    }
  }
  if (currentFile) file.push(currentFile);
  return file.filter((f) => f.filename);
}


// async function formatForAI(parsedFiles) {
//   let output = "";

//   for (const file of parsedFiles) {
//     output += `File: ${file.filename}\n\n`;

//     for (const change of file.changes) {
//       output += `${change.type} at line ${change.lineNumber}\n`;
//       output += `${change.content}\n\n`;
//     }
//   }
//   return output;
// }


function formatForAI(parsedFiles) {
  return parsedFiles.map(file => {
    const changes = file.changes
      .map(c => `Line ${c.lineNumber} (${c.type}): ${c.content}`)
      .join('\n');

    return `File: ${file.filename}\n${changes}`;
  }).join('\n\n---\n\n');
}


export {parseDiff, formatForAI};