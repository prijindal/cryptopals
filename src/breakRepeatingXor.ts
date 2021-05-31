import fs from "fs";
import { utfRepeatingXor } from "./repeatingXor";
import { hexSingleByteXorDecipher, scoreUtfString } from "./singleByteXor";

export const hammingDisanceBuffer = (buf1: Buffer, buf2: Buffer): number => {
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

export const hammingDistance = (string1: string, string2: string): number => {
  const buf1 = Buffer.from(string1, "ascii");
  const buf2 = Buffer.from(string2, "ascii");
  return hammingDisanceBuffer(buf1, buf2);
};

const splitBuffer = (buf: Buffer, length: number): Array<Buffer> => {
  const fileContentSplit = [];
  let bytes = buf;
  while (bytes.length > 0) {
    fileContentSplit.push(bytes.subarray(0, length));
    bytes = bytes.subarray(length);
  }
  return fileContentSplit;
};

const transposeBlocks = (
  buffers: Array<Buffer>,
  keysize: number
): Array<Buffer> => {
  const result: Array<Buffer> = [];
  for (let index = 0; index < keysize; index++) {
    const b: Array<number> = [];
    for (const buffer of buffers) {
      b.push(buffer[index]);
    }
    result.push(Buffer.from(b));
  }
  return result;
};

const MAX_KEY_SIZE = 40;

export const breakRepeatingXorFile = (
  filePath: string
): { key: string; answer: string } => {
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const fileContentBytes = Buffer.from(fileContent, "base64");
  const keysizes = Array.from(Array(MAX_KEY_SIZE - 1).keys()).map((a) => a + 2);
  const hammingDistances: { [k: string]: number } = {};
  for (const keysize of keysizes) {
    const fileContentSplit = splitBuffer(fileContentBytes, keysize);
    const multhammingDistance = [
      hammingDisanceBuffer(fileContentSplit[0], fileContentSplit[1]),
      hammingDisanceBuffer(fileContentSplit[1], fileContentSplit[2]),
      hammingDisanceBuffer(fileContentSplit[2], fileContentSplit[3]),
      hammingDisanceBuffer(fileContentSplit[3], fileContentSplit[4]),
    ];
    const sum = multhammingDistance.reduce((a, b) => a + b, 0);
    let hammingDistance: number = sum / multhammingDistance.length;
    hammingDistance = hammingDistance / keysize;
    hammingDistances[keysize] = hammingDistance;
  }
  const possibleKeySizes: Array<number> = [];
  for (let index = 0; index < 4; index++) {
    let minimumValue = Infinity;
    let minimumKey = "";
    for (const key in hammingDistances) {
      const element = hammingDistances[key];
      if (element < minimumValue) {
        minimumKey = key;
        minimumValue = element;
      }
    }
    hammingDistances[minimumKey] = Infinity;
    possibleKeySizes.push(parseInt(minimumKey, 10));
  }
  const keySolutions = [];
  for (const keySize of possibleKeySizes) {
    const fileContentSplit = splitBuffer(fileContentBytes, keySize);
    // console.log(fileContentSplit);
    const transposeds = transposeBlocks(fileContentSplit, keySize);
    // console.log(transposeds);
    let keySolution: Buffer = Buffer.alloc(0);
    for (const transposed of transposeds) {
      const solution = hexSingleByteXorDecipher(transposed.toString("hex"));
      keySolution = Buffer.concat([
        keySolution,
        Buffer.from(solution.key, "ascii"),
      ]);
    }
    keySolutions.push(keySolution);
  }
  const possibleAnswers: Array<{ key: string; answer: string }> = [];
  for (const keyBuffer of keySolutions) {
    const answer = utfRepeatingXor(
      fileContentBytes.toString("ascii"),
      keyBuffer.toString("ascii")
    );
    possibleAnswers.push({
      key: keyBuffer.toString("ascii"),
      answer: Buffer.from(answer, "hex").toString("ascii"),
    });
  }
  let probableAnswer = possibleAnswers[0];
  let lowestScore = scoreUtfString(possibleAnswers[0].answer);
  for (const possibleAnswer of possibleAnswers) {
    const score = scoreUtfString(possibleAnswer.answer);
    if (score < lowestScore) {
      probableAnswer = possibleAnswer;
      lowestScore = score;
    }
  }
  return probableAnswer;
};
