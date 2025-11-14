import fs from "node:fs";
import path from "node:path";
import zlib from "node:zlib";
import { pipeline } from 'node:stream/promises';

export const decompress = async (args) => {
  const [sourceArg, destinationArg] = args.split(" ");
  const currentDir = process.cwd();

  const sourcePath = path.join(currentDir, sourceArg);
  let destinationPath = path.join(currentDir, destinationArg);

  try {
    const sourceStats = await fs.promises.stat(sourcePath);
    if (!sourceStats.isFile()) {
      throw new Error('Source must be a file');
    }

    const destStats = await fs.promises.stat(destinationPath).catch(() => null);
    
    if (destStats?.isDirectory()) {
      const fileName = path.basename(sourcePath);
      destinationPath = path.join(destinationPath, fileName);
    }

    const brotli = zlib.createBrotliDecompress();

    await pipeline(
      fs.createReadStream(sourcePath),
      brotli,
      fs.createWriteStream(destinationPath)
    );

    console.log(`File decompressed from ${sourceArg} to ${destinationArg}`);
  } catch (err) {
    console.error(`Error decompressing file: ${err.message}`);
  }
};