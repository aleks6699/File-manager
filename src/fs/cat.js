import fs from "fs";

export const cat = async (filePath) => {
  try {
    const readStream = fs.createReadStream(filePath, { encoding: "utf8" });

    readStream.on("data", (chunk) => {
      process.stdout.write(chunk); 
    });

    readStream.on("error", (err) => {
      console.error(`Error reading file: ${err.message}`);
    });

    readStream.on("end", () => {
      console.log("\nFile read complete."); 
    });
  } catch (error) {
    console.error(`Operation failed: ${error.message}`);
  }
};
