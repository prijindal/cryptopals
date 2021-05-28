import { bufferXor } from "./xor";

export const utfRepeatingXor = (utfString: string, key: string): string => {
  let buffer = Buffer.alloc(0);
  let keyIndex = 0;
  for (let index = 0; index < utfString.length; index++) {
    buffer = Buffer.concat([
      buffer,
      bufferXor(
        Buffer.from(utfString[index], "utf-8"),
        Buffer.from(key[keyIndex], "utf-8")
      ),
    ]);
    keyIndex += 1;
    if (keyIndex >= key.length) {
      keyIndex = 0;
    }
  }
  return buffer.toString("hex");
};
