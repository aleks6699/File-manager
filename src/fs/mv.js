import fs from "node:fs";
import path from "node:path";
import { pipeline } from 'node:stream/promises';

export const mv = async (args) => {
  const [sourceArg, destinationArg] = args.split(" ");
  const currentDir = process.cwd();

  const sourcePath = path.join(currentDir, sourceArg);
  let destinationPath = path.join(currentDir, destinationArg);

  try {
    const destStats = await fs.promises.stat(destinationPath).catch(() => null);
    
    if (destStats?.isDirectory()) {
      const fileName = path.basename(sourcePath);
      destinationPath = path.join(destinationPath, fileName);
    }

    const sourceStats = await fs.promises.stat(sourcePath);
    if (!sourceStats.isFile()) {
      throw new Error('Source must be a file');
    }

    await pipeline(
      fs.createReadStream(sourcePath),
      fs.createWriteStream(destinationPath)
    );

    await fs.promises.unlink(sourcePath);

    console.log(`File moved from ${sourceArg} to ${destinationArg}`);
  } catch (err) {
    console.error(`Error moving file: ${err.message}`);
  }
};