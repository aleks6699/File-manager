import process from "process";
const userName = process.env.npm_config_username || "User";

console.log(`Hello ${userName}!`);

console.log(process.cwd());

process.on("SIGINT", () => {
  console.log(`Thank you for using File Manager, ${userName}, goodbye!`);
  process.exit(0);
});

process.stdin.on("data", (data) => {
  const input = data.toString().trim();
  if (input === ".exit") {
    console.log(`Thank you for using File Manager, ${userName}, goodbye!`);
    process.exit(0);
  }
});


