import crypto from "crypto";
import fs from "fs";

export const encryptAes = (text: string, key: string): string => {
  const decipher = crypto.createCipheriv("aes-128-ecb", key, "");
  let dec = decipher.update(text, "utf-8", "base64");
  dec += decipher.final("base64");
  return dec;
};

export const decryptAes = (text: string, key: string): string => {
  const decipher = crypto.createDecipheriv("aes-128-ecb", key, "");
  let dec = decipher.update(text, "base64", "utf-8");
  dec = dec + decipher.final();
  return dec;
};

export const decryptAesFile = (filePath: string, key: string): string => {
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const lines = fileContent.split("\n");
  const fileText = lines.join("");
  return decryptAes(fileText, key);
};
