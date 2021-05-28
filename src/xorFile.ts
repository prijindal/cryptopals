import fs from "fs";
import { hexSingleByteXorDecipher, scoreUtfString } from "./singleByteXor";

export const xorEachLine = (filePath: string): string => {
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const lines = fileContent.split("\n");
  let lowestScore = Infinity;
  const possibleAnswers = [];
  let possibleAnswer = "";
  for (let index = 0; index < lines.length; index++) {
    const element = lines[index];
    const decrypted = hexSingleByteXorDecipher(element);
    const score = scoreUtfString(decrypted);
    possibleAnswers.push(decrypted);
    if (score < lowestScore) {
      lowestScore = score;
      possibleAnswer = decrypted;
    }
  }
  for (const possibleAnwer of possibleAnswers) {
    if (possibleAnswers.indexOf("Now") >= 0) {
      console.log(possibleAnwer);
    }
  }
  return possibleAnswer;
};
