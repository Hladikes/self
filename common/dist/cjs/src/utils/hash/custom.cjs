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

// src/utils/hash/custom.ts
var custom_exports = {};
__export(custom_exports, {
  calculateUserIdentifierHash: () => calculateUserIdentifierHash,
  customHasher: () => customHasher,
  getSolidityPackedUserContextData: () => getSolidityPackedUserContextData
});
module.exports = __toCommonJS(custom_exports);

// src/utils/hash.ts
var import_ethers = require("ethers");
var import_js_sha1 = require("js-sha1");
var import_js_sha256 = require("js-sha256");
var import_js_sha512 = require("js-sha512");
var forge = __toESM(require("node-forge"), 1);
var import_poseidon_lite = require("poseidon-lite");
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
    const finalHash = flexiblePoseidon(hash.map((h) => (0, import_poseidon_lite.poseidon16)(h.inputs)));
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
//# sourceMappingURL=custom.cjs.map