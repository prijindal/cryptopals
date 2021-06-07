import { pkcs7Padding } from "../src/pkcs7";

describe("PKCS#7 Padding", () => {
  it("Test padding", () => {
    expect(pkcs7Padding(Buffer.from("YELLOW SUBMARINE", "utf-8"), 20)).toEqual(
      Buffer.from("YELLOW SUBMARINE\x04\x04\x04\x04", "utf-8")
    );
  });
});
