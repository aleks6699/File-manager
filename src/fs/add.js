// src/navigation/add.js
import fs from "fs";
import path from "path";


export const add = (fileName) => {
  const currentDir = process.cwd(); 
  const filePath = path.join(currentDir, fileName); 

  if (!fileName) {
    console.error("Invalid input: Please provide a file name.");
    return;
  }

  fs.writeFile(filePath, "", (err) => {
    if (err) {
      console.error(`Error creating file: ${err.message}`);
    } else {
      console.log(`File created: ${filePath}`);
    }
  });
};
