import crypto from "crypto";
import fs from "fs";

export const encryptAesBuffer = (text: Buffer, key: Buffer): Buffer => {
  const decipher = crypto.createCipheriv("aes-128-ecb", key, "");
  let dec = decipher.update(text);
  dec = Buffer.concat([dec, decipher.final()]);
  return dec;
};

export const encryptAes = (text: string, key: string): string => {
  return encryptAesBuffer(
    Buffer.from(text, "utf-8"),
    Buffer.from(key, "utf-8")
  ).toString("base64");
};

export const decryptAesBuffer = (text: Buffer, key: Buffer): Buffer => {
  const decipher = crypto.createDecipheriv("aes-128-ecb", key, "");
  let dec = decipher.update(text);
  dec = Buffer.concat([dec, decipher.final()]);
  return dec;
};

export const decryptAes = (text: string, key: string): string => {
  return decryptAesBuffer(
    Buffer.from(text, "base64"),
    Buffer.from(key, "utf-8")
  ).toString("utf-8");
};

export const decryptAesFile = (filePath: string, key: string): string => {
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const lines = fileContent.split("\n");
  const fileText = lines.join("");
  return decryptAes(fileText, key);
};
