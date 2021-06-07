import { pkcs7Padding } from "../src/pkcs7";
import { cbcEncrypt, cbcDecrypt } from "../src/cbc";

describe("PKCS#7 Padding", () => {
  it("Test padding", () => {
    expect(pkcs7Padding(Buffer.from("YELLOW SUBMARINE", "utf-8"), 20)).toEqual(
      Buffer.from("YELLOW SUBMARINE\x04\x04\x04\x04", "utf-8")
    );
    expect(pkcs7Padding(Buffer.from("YELLOW SUBMARINE", "utf-8"), 10)).toEqual(
      Buffer.from("YELLOW SUBMARINE\x04\x04\x04\x04", "utf-8")
    );
    expect(pkcs7Padding(Buffer.from("YELLOW SUBMARINE", "utf-8"), 16)).toEqual(
      Buffer.from("YELLOW SUBMARINE", "utf-8")
    );
  });
});

describe("CBC Encryption", () => {
  it("Test encryption", () => {
    expect(
      cbcEncrypt(
        Buffer.from("Hello World. How are you?", "utf-8"),
        Buffer.from("YELLOW SUBMARINE", "utf-8"),
        Buffer.from("0000000000000000", "ascii")
      ).toString("base64")
    ).toEqual("pjarqsLnUXJArxlZQevVHrBSCVQLDRIxSCUpeWD6+Zo=");
  });
  it("Test decryption", () => {
    expect(
      cbcDecrypt(
        Buffer.from("pjarqsLnUXJArxlZQevVHrBSCVQLDRIxSCUpeWD6+Zo=", "base64"),
        Buffer.from("YELLOW SUBMARINE", "utf-8"),
        Buffer.from("0000000000000000", "ascii")
      ).toString("utf-8")
    ).toBe("Hello World. How are you?");
  });
});
