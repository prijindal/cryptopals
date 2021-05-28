const VALID_ALPHABETS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

const occurance_english: { [k: string]: number } = {
  a: 8.2389258,
  b: 1.5051398,
  c: 2.8065007,
  d: 4.2904556,
  e: 12.813865,
  f: 2.2476217,
  g: 2.0327458,
  h: 6.1476691,
  i: 6.1476691,
  j: 0.1543474,
  k: 0.7787989,
  l: 4.0604477,
  m: 2.4271893,
  n: 6.8084376,
  o: 7.5731132,
  p: 1.9459884,
  q: 0.0958366,
  r: 6.0397268,
  s: 6.3827211,
  t: 9.1357551,
  u: 2.7822893,
  v: 0.9866131,
  w: 2.3807842,
  x: 0.151321,
  y: 1.9913847,
  z: 0.0746517,
  "*": 0,
  "\n": 0,
};

export const scoreUtfString = (utfString: string): number => {
  const frequencies: { [k: string]: number } = {};
  for (const iterator of Object.keys(occurance_english)) {
    frequencies[iterator] = 0;
  }
  for (let index = 0; index < utfString.length; index++) {
    const element = utfString[index];
    if (frequencies[element.toLowerCase()] != null) {
      frequencies[element.toLowerCase()] += (1 / utfString.length) * 100;
    }
  }
  let score = 0;
  for (const iterator of Object.keys(occurance_english)) {
    score += Math.abs(frequencies[iterator] - occurance_english[iterator]);
  }
  return score;
};

export const hexSingleByteXorDecipher = (hexString: string): string => {
  const hexBuffer = Buffer.from(hexString, "hex");
  //   const utf8String = hexBuffer.toString("utf-8");
  const possibleKeys: Array<string> = [];
  for (let index = 0; index < 255; index++) {
    possibleKeys.push(index.toString(16));
  }
  const possibleAnswers: Array<string> = [];
  for (const possibleKey of possibleKeys) {
    const keyBuffer = Buffer.from(possibleKey, "hex");
    const buffer = Buffer.allocUnsafe(hexBuffer.length);

    for (let i = 0; i < hexBuffer.length; ++i) {
      buffer[i] = hexBuffer[i] ^ keyBuffer[0];
    }
    possibleAnswers.push(buffer.toString("utf-8"));
  }
  let probableAnswer = possibleAnswers[0];
  let lowestScore = scoreUtfString(possibleAnswers[0]);
  for (const possibleAnswer of possibleAnswers) {
    const score = scoreUtfString(possibleAnswer);
    if (score < lowestScore) {
      probableAnswer = possibleAnswer;
      lowestScore = score;
    }
  }
  return probableAnswer;
};
