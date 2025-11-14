import { cwd, chdir } from "node:process";
import path from "node:path";
import { platform } from "node:os";

const isRootDirectory = () => {
  const currentDir = cwd();
  return platform() === "win32"
    ? path.parse(currentDir).root === currentDir 
    : currentDir === "/"; 
};

export const up = () => {
  if (!isRootDirectory()) {
    const parentDir = path.resolve(cwd(), "..");
    chdir(parentDir);
  }
};
