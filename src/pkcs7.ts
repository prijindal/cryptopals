export const pkcs7Padding = (buf: Buffer, length: number): Buffer => {
  const b = Buffer.alloc(length);
  for (let index = 0; index < buf.length; index++) {
    b[index] = buf[index];
  }
  if (buf.length < length) {
    for (let index = 0; index < length - buf.length; index++) {
      b[buf.length + index] = length - buf.length;
    }
  }
  return b;
};
