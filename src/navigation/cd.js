import { chdir, cwd } from "process";
import path from "path";
import fs from "fs/promises";

export const cd = async (targetPath) => {
  try {
    const newPath = path.isAbsolute(targetPath)
      ? targetPath
      : path.resolve(cwd(), targetPath);

    const stats = await fs.stat(newPath);
    if (!stats.isDirectory()) {
      console.log("Operation failed: Path is not a directory.");
      return;
    }

    chdir(newPath);
  } catch (error) {
    console.log("Operation failed: Invalid path or access denied.");
  }
};
