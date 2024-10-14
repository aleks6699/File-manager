// src/navigation/hash.js
import fs from "fs";
import crypto from "crypto";

export const hash = (filePath) => {
  if (!filePath) {
    console.error("Invalid input: Please provide a file path.");
    return;
  }

  const hash = crypto.createHash("sha256");
  
  const fileStream = fs.createReadStream(filePath);


  fileStream.on("data", (data) => {
    hash.update(data); 
  });


  fileStream.on("end", () => {
    const hashValue = hash.digest("hex"); 
    console.log(`Hash of file "${filePath}": ${hashValue}`);
  });

  fileStream.on("error", (err) => {
    console.error(`Error reading file: ${err.message}`);
  });
};
