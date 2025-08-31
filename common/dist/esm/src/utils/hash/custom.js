// src/utils/hash.ts
import { ethers } from "ethers";
import { sha1 } from "js-sha1";
import { sha224, sha256 } from "js-sha256";
import { sha384, sha512 } from "js-sha512";
import * as forge from "node-forge";
import {
  poseidon1,
  poseidon2,
  poseidon3,
  poseidon4,
  poseidon5,
  poseidon6,
  poseidon7,
  poseidon8,
  poseidon9,
  poseidon10,
  poseidon11,
  poseidon12,
  poseidon13,
  poseidon14,
  poseidon15,
  poseidon16
} from "poseidon-lite";
function calculateUserIdentifierHash(destChainID, userID, userDefinedData) {
  const solidityPackedUserContextData = getSolidityPackedUserContextData(
    destChainID,
    userID,
    userDefinedData
  );
  const inputBytes = Buffer.from(solidityPackedUserContextData.slice(2), "hex");
  const sha256Hash = ethers.sha256(inputBytes);
  const ripemdHash = ethers.ripemd160(sha256Hash);
  return BigInt(ripemdHash);
}
function customHasher(pubKeyFormatted) {
  if (pubKeyFormatted.length < 16) {
    return flexiblePoseidon(pubKeyFormatted.map(BigInt)).toString();
  } else {
    const rounds = Math.ceil(pubKeyFormatted.length / 16);
    if (rounds > 16) {
      throw new Error("Number of rounds is greater than 16");
    }
    const hash = new Array(rounds);
    for (let i = 0; i < rounds; i++) {
      hash[i] = { inputs: new Array(16).fill(BigInt(0)) };
    }
    for (let i = 0; i < rounds; i++) {
      for (let j = 0; j < 16; j++) {
        if (i * 16 + j < pubKeyFormatted.length) {
          hash[i].inputs[j] = BigInt(pubKeyFormatted[i * 16 + j]);
        }
      }
    }
    const finalHash = flexiblePoseidon(hash.map((h) => poseidon16(h.inputs)));
    return finalHash.toString();
  }
}
function flexiblePoseidon(inputs) {
  switch (inputs.length) {
    case 1:
      return poseidon1(inputs);
    case 2:
      return poseidon2(inputs);
    case 3:
      return poseidon3(inputs);
    case 4:
      return poseidon4(inputs);
    case 5:
      return poseidon5(inputs);
    case 6:
      return poseidon6(inputs);
    case 7:
      return poseidon7(inputs);
    case 8:
      return poseidon8(inputs);
    case 9:
      return poseidon9(inputs);
    case 10:
      return poseidon10(inputs);
    case 11:
      return poseidon11(inputs);
    case 12:
      return poseidon12(inputs);
    case 13:
      return poseidon13(inputs);
    case 14:
      return poseidon14(inputs);
    case 15:
      return poseidon15(inputs);
    case 16:
      return poseidon16(inputs);
    default:
      throw new Error(`Unsupported number of inputs: ${inputs.length}`);
  }
}
function getSolidityPackedUserContextData(destChainID, userID, userDefinedData) {
  const userIdHex = userID.replace(/-/g, "");
  return ethers.solidityPacked(
    ["bytes32", "bytes32", "bytes"],
    [
      ethers.zeroPadValue(ethers.toBeHex(destChainID), 32),
      ethers.zeroPadValue("0x" + userIdHex, 32),
      ethers.toUtf8Bytes(userDefinedData)
    ]
  );
}
export {
  calculateUserIdentifierHash,
  customHasher,
  getSolidityPackedUserContextData
};
//# sourceMappingURL=custom.js.map