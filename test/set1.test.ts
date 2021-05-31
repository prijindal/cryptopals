import { hexToBase64 } from "../src/base64";
import { hexXor } from "../src/xor";
import { hexSingleByteXorDecipher, scoreUtfString } from "../src/singleByteXor";
import { xorEachLine } from "../src/xorFile";
import { utfRepeatingXor } from "../src/repeatingXor";
import {
  breakRepeatingXorFile,
  hammingDistance,
} from "../src/breakRepeatingXor";
import { decryptAesFile, encryptAes, decryptAes } from "../src/aes";

describe("hexToBase64 test", () => {
  it("Sample hex test", () => {
    expect(
      hexToBase64(
        "49276d206b696c6c696e6720796f757220627261696e206c696b65206120706f69736f6e6f7573206d757368726f6f6d"
      )
    ).toEqual(
      "SSdtIGtpbGxpbmcgeW91ciBicmFpbiBsaWtlIGEgcG9pc29ub3VzIG11c2hyb29t"
    );
  });
});

describe("hexXor test", () => {
  it("Sample hex test", () => {
    expect(
      hexXor(
        "1c0111001f010100061a024b53535009181c",
        "686974207468652062756c6c277320657965"
      )
    ).toEqual("746865206b696420646f6e277420706c6179");
  });
});

describe("Deciher singleByteXorCipher", () => {
  it("Scoring function", () => {
    expect(scoreUtfString("Ieeacdm*GI-y*fcao*k*zedn*el*hkied")).toBeGreaterThan(
      scoreUtfString("Cooking MC's like a pound of bacon")
    );
    expect(scoreUtfString("Yuuqst}:WY=i:vsq:{:juot~:u|:x{yut")).toBeGreaterThan(
      scoreUtfString("Cooking MC's like a pound of bacon")
    );
    expect(
      scoreUtfString("Dhhlni`'JD t'knlb'f'whric'ha'efdhi")
    ).toBeGreaterThan(scoreUtfString("Cooking MC's like a pound of bacon"));
    expect(scoreUtfString("zmSmH�IReCWKn@dGfSjeMr")).toBeGreaterThan(
      scoreUtfString("Now that the party is jumping\n")
    );
    expect(scoreUtfString("xoQoJKPgAUIlBfEdQhgOp")).toBeGreaterThan(
      scoreUtfString("Now that the party is jumping\n")
    );
  });
  it("Sample hex test", () => {
    const solution = hexSingleByteXorDecipher(
      "1b37373331363f78151b7f2b783431333d78397828372d363c78373e783a393b3736"
    );
    expect(solution.answer).toEqual("Cooking MC's like a pound of bacon");
  });
});

describe("Detect single-character XOR in a file", () => {
  it("Sample hex test", () => {
    const solution = xorEachLine("test/1/4.txt");
    expect(solution.answer).toEqual("Now that the party is jumping\n");
  });
});

describe("Repeating-key XOR tests", () => {
  it("Sample hex test", () => {
    expect(
      utfRepeatingXor(
        "Burning 'em, if you ain't quick and nimble\nI go crazy when I hear a cymbal",
        "ICE"
      )
    ).toEqual(
      "0b3637272a2b2e63622c2e69692a23693a2a3c6324202d623d63343c2a26226324272765272a282b2f20430a652e2c652a3124333a653e2b2027630c692b20283165286326302e27282f"
    );
  });
});

describe("Breaking repeating-key xor", () => {
  it("Test Hamming code", () => {
    expect(hammingDistance("this is a test", "wokka wokka!!!")).toEqual(37);
  });
  it("Test Breaking repeating xor", () => {
    const solution = breakRepeatingXorFile("test/1/6.txt");
    expect(solution.key).toEqual("Terminator X: Bring the noise");
    expect(
      solution.answer.indexOf("I'm back and I'm ringin' the bell")
    ).toEqual(0);
  });
});

describe("Aes decrypt", () => {
  it("Simple aes decrypt/encrypt", () => {
    const encrypted = encryptAes("HELLO", "YELLOW SUBMARINE");
    const decrypted = decryptAes(encrypted, "YELLOW SUBMARINE");
    expect(decrypted).toEqual("HELLO");
  });
  it("Test decryption", () => {
    expect(
      decryptAesFile("test/1/7.txt", "YELLOW SUBMARINE").indexOf(
        "I'm back and I'm ringin' the bell"
      )
    ).toEqual(0);
  });
});
