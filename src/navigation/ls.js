import { readdir } from "fs/promises";
import { cwd } from "process";

export const ls = async () => {
  try {
    const currentDir = cwd();
    const entries = await readdir(currentDir, { withFileTypes: true });

    const content = entries
      .map((entry) => ({
        Name: entry.name,
        Type: entry.isDirectory() ? "Folder" : "File",
      }))
      .sort((a, b) => {
        if (a.Type === b.Type) return a.Name.localeCompare(b.Name);
        return a.Type === "Folder" ? -1 : 1;
      });

    console.table(content);
  } catch (error) {
    console.error("Operation failed: Unable to read directory.");
  }
};
