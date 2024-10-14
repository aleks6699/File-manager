import { EOL, homedir, cpus, userInfo } from "node:os";
import { arch } from "node:process";

export function getOsInfo(command) {
  if (command.startsWith("--")) {
    const option = command.slice(2); 
    switch (option) {
      case "EOL":
        console.log(JSON.stringify(EOL)); 
        break;
      case "cpus":
        console.log(JSON.stringify(cpus(), null, 2)); 
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
