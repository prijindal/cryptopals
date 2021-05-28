import fs from "fs";

export const hammingDistance = (string1: string, string2: string): number => {
  const buf1 = Buffer.from(string1, "utf-8");
  const buf2 = Buffer.from(string2, "utf-8");
  let distance = 0;
  const length = Math.max(buf1.length, buf2.length);
  const buffer: Array<number> = [];

  for (let i = 0; i < length; ++i) {
    buffer[i] = buf1[i] ^ buf2[i];
    while (buffer[i]) {
      distance += buffer[i] & 1;
      buffer[i] >>= 1;
    }
  }
  return distance;
};

export const breakRepeatingXorFile = (filePath: string): string => {
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const lines = fileContent.split("\n");
  return lines[0];
};
