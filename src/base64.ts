export const hexToBase64 = (hexString: string): string => {
  const buffer = Buffer.from(hexString, "hex");

  const base64 = buffer.toString("base64");
  return base64;
};
