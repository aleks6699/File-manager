import fs from "node:fs";
import path from "node:path";

export const rn = (args) => {
  const [oldName, newName] = args.split(" ");

  if (!oldName || !newName) {
    console.error("Invalid input: please provide both old and new filenames.");
    return;
  }

  const currentDir = process.cwd();
  const oldFilePath = path.join(currentDir, oldName);
  const newFilePath = path.join(currentDir, newName);

  fs.rename(oldFilePath, newFilePath, (err) => {
    if (err) {
      console.error(`Error renaming file: ${err.message}`);
    } else {
      console.log(`File renamed from ${oldName} to ${newName}`);
    }
  });
};
