import fs from "fs";

const splitBuffer = (buf: Buffer, length: number): Array<Buffer> => {
  const fileContentSplit = [];
  let bytes = buf;
  while (bytes.length > 0) {
    fileContentSplit.push(bytes.subarray(0, length));
    bytes = bytes.subarray(length);
  }
  return fileContentSplit;
};

export const detectAesEcb = (buf: Buffer): boolean => {
  const splited = splitBuffer(buf, 16);
  for (let index = 0; index < splited.length; index++) {
    const element = splited[index];
    for (let j = index + 1; j < splited.length; j++) {
      const second = splited[j];
      if (Buffer.compare(element, second) == 0) {
        return true;
      }
    }
  }
  return false;
};

export const detectAesEcbFromFile = (filePath: string): string => {
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const lines = fileContent.split("\n");
  let answer = "";
  for (const line of lines) {
    const lineBuf = Buffer.from(line, "hex");
    if (detectAesEcb(lineBuf)) {
      answer = line;
    }
  }
  return answer;
};
