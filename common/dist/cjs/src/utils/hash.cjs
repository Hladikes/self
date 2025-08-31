var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/utils/hash.ts
var hash_exports = {};
__export(hash_exports, {
  calculateUserIdentifierHash: () => calculateUserIdentifierHash,
  customHasher: () => customHasher,
  flexiblePoseidon: () => flexiblePoseidon,
  getHashLen: () => getHashLen,
  getSolidityPackedUserContextData: () => getSolidityPackedUserContextData,
  hash: () => hash,
  packBytesAndPoseidon: () => packBytesAndPoseidon
});
module.exports = __toCommonJS(hash_exports);
var import_ethers = require("ethers");
var import_js_sha1 = require("js-sha1");
var import_js_sha256 = require("js-sha256");
var import_js_sha512 = require("js-sha512");
var forge = __toESM(require("node-forge"), 1);
var import_poseidon_lite = require("poseidon-lite");

// src/constants/constants.ts
var MAX_BYTES_IN_FIELD = 31;

// src/utils/bytes.ts
function computeIntChunkLength(byteLength) {
  const packSize = MAX_BYTES_IN_FIELD;
  const remain = byteLength % packSize;
  let numChunks = (byteLength - remain) / packSize;
  if (remain > 0) {
    numChunks += 1;
  }
  return numChunks;
}
function hexToSignedBytes(hexString) {
  const bytes = [];
  for (let i = 0; i < hexString.length - 1; i += 2) {
    const byte = parseInt(hexString.substr(i, 2), 16);
    bytes.push(byte >= 128 ? byte - 256 : byte);
  }
  return bytes;
}
function packBytesArray(unpacked) {
  const packSize = MAX_BYTES_IN_FIELD;
  const maxBytes = unpacked.length;
  const maxInts = computeIntChunkLength(maxBytes);
  const out = new Array(maxInts).fill(0n);
  for (let i = 0; i < maxInts; i++) {
    let sum = 0n;
    for (let j = 0; j < packSize; j++) {
      const idx = packSize * i + j;
      if (idx >= maxBytes) {
        continue;
      } else if (j === 0) {
        sum = BigInt(unpacked[idx]);
      } else {
        sum += (1n << BigInt(8 * j)) * BigInt(unpacked[idx]);
      }
    }
    out[i] = sum;
  }
  return out;
}

// src/utils/hash.ts
function calculateUserIdentifierHash(destChainID, userID, userDefinedData) {
  const solidityPackedUserContextData = getSolidityPackedUserContextData(
    destChainID,
    userID,
    userDefinedData
  );
  const inputBytes = Buffer.from(solidityPackedUserContextData.slice(2), "hex");
  const sha256Hash = import_ethers.ethers.sha256(inputBytes);
  const ripemdHash = import_ethers.ethers.ripemd160(sha256Hash);
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
    const hash2 = new Array(rounds);
    for (let i = 0; i < rounds; i++) {
      hash2[i] = { inputs: new Array(16).fill(BigInt(0)) };
    }
    for (let i = 0; i < rounds; i++) {
      for (let j = 0; j < 16; j++) {
        if (i * 16 + j < pubKeyFormatted.length) {
          hash2[i].inputs[j] = BigInt(pubKeyFormatted[i * 16 + j]);
        }
      }
    }
    const finalHash = flexiblePoseidon(hash2.map((h) => (0, import_poseidon_lite.poseidon16)(h.inputs)));
    return finalHash.toString();
  }
}
function flexiblePoseidon(inputs) {
  switch (inputs.length) {
    case 1:
      return (0, import_poseidon_lite.poseidon1)(inputs);
    case 2:
      return (0, import_poseidon_lite.poseidon2)(inputs);
    case 3:
      return (0, import_poseidon_lite.poseidon3)(inputs);
    case 4:
      return (0, import_poseidon_lite.poseidon4)(inputs);
    case 5:
      return (0, import_poseidon_lite.poseidon5)(inputs);
    case 6:
      return (0, import_poseidon_lite.poseidon6)(inputs);
    case 7:
      return (0, import_poseidon_lite.poseidon7)(inputs);
    case 8:
      return (0, import_poseidon_lite.poseidon8)(inputs);
    case 9:
      return (0, import_poseidon_lite.poseidon9)(inputs);
    case 10:
      return (0, import_poseidon_lite.poseidon10)(inputs);
    case 11:
      return (0, import_poseidon_lite.poseidon11)(inputs);
    case 12:
      return (0, import_poseidon_lite.poseidon12)(inputs);
    case 13:
      return (0, import_poseidon_lite.poseidon13)(inputs);
    case 14:
      return (0, import_poseidon_lite.poseidon14)(inputs);
    case 15:
      return (0, import_poseidon_lite.poseidon15)(inputs);
    case 16:
      return (0, import_poseidon_lite.poseidon16)(inputs);
    default:
      throw new Error(`Unsupported number of inputs: ${inputs.length}`);
  }
}
function getHashLen(hashFunction) {
  switch (hashFunction) {
    case "sha1":
      return 20;
    case "sha224":
      return 28;
    case "sha256":
      return 32;
    case "sha384":
      return 48;
    case "sha512":
      return 64;
    default:
      console.log(`${hashFunction} not found in getHashLen`);
      return 32;
  }
}
function getSolidityPackedUserContextData(destChainID, userID, userDefinedData) {
  const userIdHex = userID.replace(/-/g, "");
  return import_ethers.ethers.solidityPacked(
    ["bytes32", "bytes32", "bytes"],
    [
      import_ethers.ethers.zeroPadValue(import_ethers.ethers.toBeHex(destChainID), 32),
      import_ethers.ethers.zeroPadValue("0x" + userIdHex, 32),
      import_ethers.ethers.toUtf8Bytes(userDefinedData)
    ]
  );
}
function hash(hashFunction, bytesArray, format = "bytes") {
  const unsignedBytesArray = bytesArray.map((byte) => byte & 255);
  let hashResult;
  switch (hashFunction) {
    case "sha1":
      hashResult = (0, import_js_sha1.sha1)(unsignedBytesArray);
      break;
    case "sha224":
      hashResult = (0, import_js_sha256.sha224)(unsignedBytesArray);
      break;
    case "sha256":
      hashResult = (0, import_js_sha256.sha256)(unsignedBytesArray);
      break;
    case "sha384":
      hashResult = (0, import_js_sha512.sha384)(unsignedBytesArray);
      break;
    case "sha512":
      hashResult = (0, import_js_sha512.sha512)(unsignedBytesArray);
      break;
    default:
      console.log("\x1B[31m%s\x1B[0m", `${hashFunction} not found in hash`);
      hashResult = (0, import_js_sha256.sha256)(unsignedBytesArray);
  }
  if (format === "hex") {
    return hashResult;
  }
  if (format === "bytes") {
    return hexToSignedBytes(hashResult);
  }
  const actualForgeUtil = forge.util ? forge.util : forge.default.util;
  if (format === "binary") {
    return actualForgeUtil.binary.raw.encode(new Uint8Array(hexToSignedBytes(hashResult)));
  }
  throw new Error(`Invalid format: ${format}`);
}
function packBytesAndPoseidon(unpacked) {
  const packed = packBytesArray(unpacked);
  return customHasher(packed.map(String)).toString();
}
//# sourceMappingURL=hash.cjs.map