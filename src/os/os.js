import { EOL, homedir, cpus, userInfo, availableParallelism } from "node:os";
import { arch } from "node:process";

export function getOsInfo(command) {
  if (command.startsWith("--")) {
    const option = command.slice(2);
    switch (option) {
      case "EOL":
        console.log(JSON.stringify(EOL));
        break;
      case "cpus":
        { const cpusInfo = cpus();
        const coreCount = availableParallelism();
        const cpuInfo = cpusInfo.map((cpu, index) => ({
          number: index + 1,
          model: cpu.model,
          speed: `${(cpu.speed / 1000).toFixed(2)} GHz`,
        }));

        console.log(`Number of cores: ${coreCount}`);
        console.table(cpuInfo);

        break; }
      case "homedir":
        console.log(homedir());
        break;
      case "username":
        console.log(userInfo().username);
        break;
      case "architecture":
        console.log(arch);
        break;
      default:
        console.log("Invalid OS command");
        break;
    }
  }
}
