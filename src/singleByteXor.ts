const occurance_english: { [k: string]: number } = {
  a: 0.0651738,
  b: 0.0124248,
  c: 0.0217339,
  d: 0.0349835,
  e: 0.1041442,
  f: 0.0197881,
  g: 0.015861,
  h: 0.0492888,
  i: 0.0558094,
  j: 0.0009033,
  k: 0.0050529,
  l: 0.033149,
  m: 0.0202124,
  n: 0.0564513,
  o: 0.0596302,
  p: 0.0137645,
  q: 0.0008606,
  r: 0.0497563,
  s: 0.051576,
  t: 0.0729357,
  u: 0.0225134,
  v: 0.0082903,
  w: 0.0171272,
  x: 0.0013692,
  y: 0.0145984,
  z: 0.0007836,
  " ": 0.1918182,
};

export const scoreUtfString = (utfString: string): number => {
  const frequencies: { [k: string]: number } = {};
  for (let index = 0; index < utfString.length; index++) {
    const element = utfString[index];
    if (frequencies[element.toLowerCase()] == null) {
      frequencies[element.toLowerCase()] = 0;
    }
    frequencies[element.toLowerCase()] += 1 / utfString.length;
  }
  const keysInString = [];
  for (const key of Object.keys(frequencies)) {
    if (Object.keys(occurance_english).indexOf(key) >= 0) {
      keysInString.push(key);
    }
  }
  if (keysInString.length == 0) {
    return Infinity;
  }
  let score = 0;
  for (const iterator of Object.keys(frequencies)) {
    let occurance_score = occurance_english[iterator];
    if (occurance_score == null) {
      occurance_score = 0;
    }
    score += Math.abs(frequencies[iterator] - occurance_score);
  }
  return score;
};

export const hexSingleByteXorDecipher = (
  hexString: string
): { key: string; answer: string } => {
  const hexBuffer = Buffer.from(hexString, "hex");
  //   const utf8String = hexBuffer.toString("utf-8");
  const possibleKeys: Array<string> = [];
  for (let index = 0; index < 255; index++) {
    possibleKeys.push(index.toString(16));
  }
  const possibleAnswers: Array<{ key: string; answer: string }> = [];
  for (const possibleKey of possibleKeys) {
    const keyBuffer = Buffer.from(possibleKey, "hex");
    const buffer = Buffer.allocUnsafe(hexBuffer.length);

    for (let i = 0; i < hexBuffer.length; ++i) {
      buffer[i] = hexBuffer[i] ^ keyBuffer[0];
    }
    possibleAnswers.push({
      key: keyBuffer.toString("ascii"),
      answer: buffer.toString("ascii"),
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
