import { cwd, chdir } from "process";
import path from "path";
import { platform } from "os";

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
