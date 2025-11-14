import fs from "node:fs";
import path from "node:path";

export const mkdir = (directoryName) => {
  if (!directoryName) {
    console.error("Please provide a directory name.");
    return;
  }

  const currentDir = process.cwd();
  const directoryPath = path.join(currentDir, directoryName);

  fs.mkdir(directoryPath, { recursive: true }, (err) => {
    if (err) {
      console.error(`Error creating directory: ${err.message}`);
    } else {
      console.log(`Directory created: ${directoryPath}`);
    }
  });
};
