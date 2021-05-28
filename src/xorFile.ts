import fs from "fs";
import { hexSingleByteXorDecipher, scoreUtfString } from "./singleByteXor";

export const xorEachLine = (filePath: string): string => {
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const lines = fileContent.split("\n");
  let lowestScore = Infinity;
  let possibleAnswer = "";
  for (let index = 0; index < lines.length; index++) {
    const element = lines[index];
    const decrypted = hexSingleByteXorDecipher(element);
    const score = scoreUtfString(decrypted);
    if (score < lowestScore) {
      lowestScore = score;
      possibleAnswer = decrypted;
    }
  }
  return possibleAnswer;
};
