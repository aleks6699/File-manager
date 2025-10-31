import fs from "node:fs";
import path from "node:path";
export const  rm = (fileName) => {
  const currentDir = process.cwd(); 
  const filePath = path.join(currentDir, fileName); 

  if (!fileName) {
    console.error("Invalid input: Please provide a file name."); 
    return;
  }

  fs.unlink(filePath, (err) => {
    if (err) {
      console.error(`Error deleting file: ${err.message}`);
    } else {
      console.log(`File deleted: ${filePath}`);
    }
  });
};