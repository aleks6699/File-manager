import process from "process";
import readline from "readline";
import os from "os";
import { up } from "./src/navigation/up.js";
import { cd } from "./src/navigation/cd.js";
import { ls } from "./src/navigation/ls.js";
import { getOsInfo } from "./src/os/os.js";

const modules = {
  up,
  cd,
  ls,
  os: getOsInfo,
};

const userName = process.env.npm_config_username || "User";
process.chdir(os.homedir());

console.log(`Welcome to the File Manager, ${userName}!`);

const printCurrentDirectory = () => {
  console.log(`You are currently in ${process.cwd()}`);
};

printCurrentDirectory();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "> ",
});

rl.on("line", async (input) => {
  const inputTrimmed = input.trim();
  const command = inputTrimmed.split(" ")[0];
  const args = inputTrimmed.split(" ").slice(1).join(" ").trim();
  try {
    if (command === ".exit") {
      console.log(`Thank you for using File Manager, ${userName}, goodbye!`);
      process.exit(0);
    } else if (modules[command]) {
      await modules[command](args);
    } else {
      console.log("Invalid command");
    }
  } catch (error) {
    console.log("Operation failed");
  }

  printCurrentDirectory();
  rl.prompt();
});

rl.on("SIGINT", () => {
  console.log(`Thank you for using File Manager, ${userName}, goodbye!`);
  process.exit(0);
});

rl.prompt();
