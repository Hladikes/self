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

// src/utils/circuits/index.ts
var circuits_exports = {};
__export(circuits_exports, {
  bigIntToHex: () => bigIntToHex,
  castFromScope: () => castFromScope,
  castFromUUID: () => castFromUUID,
  castToAddress: () => castToAddress,
  castToScope: () => castToScope,
  castToUUID: () => castToUUID,
  castToUserIdentifier: () => castToUserIdentifier,
  formatAndUnpackForbiddenCountriesList: () => formatAndUnpackForbiddenCountriesList,
  formatAndUnpackReveal: () => formatAndUnpackReveal,
  formatCountriesList: () => formatCountriesList,
  formatForbiddenCountriesListFromCircuitOutput: () => formatForbiddenCountriesListFromCircuitOutput,
  generateCircuitInputsDSC: () => generateCircuitInputsDSC,
  generateCircuitInputsOfac: () => generateCircuitInputsOfac,
  generateCircuitInputsRegister: () => generateCircuitInputsRegister,
  generateCircuitInputsVCandDisclose: () => generateCircuitInputsVCandDisclose,
  getAttributeFromUnpackedReveal: () => getAttributeFromUnpackedReveal,
  getCircuitNameFromPassportData: () => getCircuitNameFromPassportData,
  getOlderThanFromCircuitOutput: () => getOlderThanFromCircuitOutput,
  hexToUUID: () => hexToUUID,
  revealBitmapFromAttributes: () => revealBitmapFromAttributes,
  revealBitmapFromMapping: () => revealBitmapFromMapping,
  reverseBytes: () => reverseBytes,
  reverseCountryBytes: () => reverseCountryBytes,
  stringToAsciiBigIntArray: () => stringToAsciiBigIntArray,
  unpackReveal: () => unpackReveal,
  validateUserId: () => validateUserId
});
module.exports = __toCommonJS(circuits_exports);

// src/utils/circuits/uuid.ts
function hexToBigInt(hex) {
  return BigInt(`0x${hex}`);
}
function checkBigInt(bigInt) {
  const max253BitValue = BigInt(2n ** 253n - 1n);
  if (bigInt > max253BitValue) {
    throw new Error("Input should be < 2^253 - 1");
  }
}
function uuidToBigInt(uuid) {
  const hexString = uuid.replace(/-/g, "");
  const bigInt = hexToBigInt(hexString);
  return bigInt;
}
function bigIntToHex(bigInt) {
  return bigInt.toString(16).padStart(32, "0");
}
function castFromScope(scope) {
  checkStringLength(scope);
  return stringToBigInt(scope).toString();
}
function castFromUUID(uuid) {
  const bigInt = uuidToBigInt(uuid);
  checkBigInt(bigInt);
  return bigInt.toString();
}
function castToAddress(bigInt) {
  return `0x${bigInt.toString(16).padStart(40, "0")}`;
}
function castToScope(num) {
  const str = num.toString().slice(1);
  const charCodes = str.match(/.{1,3}/g) || [];
  return String.fromCharCode(...charCodes.map((code) => parseInt(code, 10)));
}
function castToUUID(bigInt) {
  const hex = bigIntToHex(bigInt);
  return hexToUUID(hex);
}
function checkStringLength(str) {
  if (str.length > 25) {
    throw new Error("Input string must not exceed 25 characters");
  }
}
function stringToBigInt(str) {
  return BigInt(
    "1" + Array.from(str).map((char) => char.charCodeAt(0).toString().padStart(3, "0")).join("")
  );
}
function castToUserIdentifier(bigInt, user_identifier_type) {
  switch (user_identifier_type) {
    case "hex":
      return castToAddress(bigInt);
    case "uuid":
      return castToUUID(bigInt);
  }
}
function hexToUUID(hex) {
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}
function stringToAsciiBigIntArray(str) {
  const asciiBigIntArray = [];
  for (let i = 0; i < str.length; i++) {
    asciiBigIntArray.push(BigInt(str.charCodeAt(i)));
  }
  return asciiBigIntArray;
}
function validateUserId(userId, type) {
  switch (type) {
    case "hex":
      return /^[0-9A-Fa-f]+$/.test(userId);
    case "uuid":
      return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
        userId
      );
    default:
      return false;
  }
}

// src/constants/constants.ts
var COMMITMENT_TREE_DEPTH = 33;
var CSCA_TREE_DEPTH = 12;
var DSC_TREE_DEPTH = 21;
var MAX_BYTES_IN_FIELD = 31;
var MAX_FORBIDDEN_COUNTRIES_LIST_LENGTH = 40;
var MAX_PADDED_ECONTENT_LEN = {
  sha1: 384,
  sha224: 512,
  sha256: 512,
  sha384: 768,
  sha512: 896
};
var MAX_PADDED_SIGNED_ATTR_LEN = {
  sha1: 128,
  sha224: 128,
  sha256: 128,
  sha384: 256,
  sha512: 256
};
var OFAC_TREE_LEVELS = 64;
var attributeToPosition = {
  issuing_state: [2, 4],
  name: [5, 43],
  passport_number: [44, 52],
  nationality: [54, 56],
  date_of_birth: [57, 62],
  gender: [64, 64],
  expiry_date: [65, 70],
  older_than: [88, 89],
  ofac: [90, 90]
};
var attributeToPosition_ID = {
  issuing_state: [2, 4],
  name: [60, 89],
  passport_number: [5, 13],
  nationality: [45, 47],
  date_of_birth: [30, 35],
  gender: [37, 37],
  expiry_date: [38, 43],
  older_than: [90, 91],
  ofac: [92, 92]
};
var k_dsc = 35;
var k_dsc_3072 = 35;
var k_dsc_4096 = 35;
var max_csca_bytes = 1792;
var max_dsc_bytes = 1792;
var n_dsc = 120;
var n_dsc_3072 = 120;
var n_dsc_4096 = 120;
var n_dsc_ecdsa = 64;

// src/utils/circuits/formatOutputs.ts
function formatAndUnpackForbiddenCountriesList(forbiddenCountriesList_packed) {
  const forbiddenCountriesList_packed_formatted = [
    forbiddenCountriesList_packed["forbidden_countries_list_packed[0]"],
    forbiddenCountriesList_packed["forbidden_countries_list_packed[1]"],
    forbiddenCountriesList_packed["forbidden_countries_list_packed[2]"],
    forbiddenCountriesList_packed["forbidden_countries_list_packed[3]"]
  ];
  const trimmed = trimu0000(unpackReveal(forbiddenCountriesList_packed_formatted, "id"));
  const countries2 = [];
  for (let i = 0; i < trimmed.length; i += 3) {
    const countryCode = trimmed.slice(i, i + 3).join("");
    if (countryCode.length === 3) {
      countries2.push(countryCode);
    }
  }
  return countries2;
}
function trimu0000(unpackedReveal) {
  return unpackedReveal.filter((value) => value !== "\0");
}
function formatAndUnpackReveal(revealedData_packed, id_type) {
  const revealedData_packed_formatted_passport = [
    revealedData_packed["revealedData_packed[0]"],
    revealedData_packed["revealedData_packed[1]"],
    revealedData_packed["revealedData_packed[2]"]
  ];
  const revealedData_packed_formatted_id = [
    revealedData_packed["revealedData_packed[0]"],
    revealedData_packed["revealedData_packed[1]"],
    revealedData_packed["revealedData_packed[2]"],
    revealedData_packed["revealedData_packed[3]"]
  ];
  return unpackReveal(
    id_type === "passport" ? revealedData_packed_formatted_passport : revealedData_packed_formatted_id,
    id_type
  );
}
function formatForbiddenCountriesListFromCircuitOutput(forbiddenCountriesList) {
  const countryList1 = unpackReveal(forbiddenCountriesList, "id");
  const cleanedCountryList = countryList1.filter((value) => value !== "\0");
  const formattedCountryList = [];
  for (let i = 0; i < cleanedCountryList.length; i += 3) {
    const countryCode = cleanedCountryList.slice(i, i + 3).join("");
    if (countryCode.length === 3) {
      formattedCountryList.push(countryCode);
    }
  }
  return formattedCountryList;
}
function getAttributeFromUnpackedReveal(unpackedReveal, attribute, id_type) {
  const position = id_type === "passport" ? attributeToPosition[attribute] : attributeToPosition_ID[attribute];
  let attributeValue = "";
  for (let i = position[0]; i <= position[1]; i++) {
    if (unpackedReveal[i] !== "\0") {
      attributeValue += unpackedReveal[i];
    }
  }
  return attributeValue;
}
function getOlderThanFromCircuitOutput(olderThan) {
  const ageString = olderThan.map((code) => String.fromCharCode(parseInt(code))).join("");
  const age = parseInt(ageString, 10);
  return isNaN(age) ? 0 : age;
}
function revealBitmapFromAttributes(disclosureOptions, id_type) {
  const reveal_bitmap = Array(id_type === "passport" ? 88 : 90).fill("0");
  const att_to_position = id_type === "passport" ? attributeToPosition : attributeToPosition_ID;
  Object.entries(disclosureOptions).forEach(([attribute, { enabled }]) => {
    if (enabled && attribute in att_to_position) {
      const [start, end] = att_to_position[attribute];
      reveal_bitmap.fill("1", start, end + 1);
    }
  });
  return reveal_bitmap;
}
function revealBitmapFromMapping(attributeToReveal) {
  const reveal_bitmap = Array(90).fill("0");
  Object.entries(attributeToReveal).forEach(([attribute, reveal]) => {
    if (reveal !== "") {
      const [start, end] = attributeToPosition[attribute];
      reveal_bitmap.fill("1", start, end + 1);
    }
  });
  return reveal_bitmap;
}
function unpackReveal(revealedData_packed, id_type) {
  const packedArray = Array.isArray(revealedData_packed) ? revealedData_packed : [revealedData_packed];
  const bytesCount = id_type === "passport" ? [31, 31, 31] : [31, 31, 31, 31];
  const bytesArray = packedArray.flatMap((element, index) => {
    const bytes = bytesCount[index] || 31;
    const elementBigInt = BigInt(element);
    const byteMask = BigInt(255);
    const bytesOfElement = [...Array(bytes)].map((_, byteIndex) => {
      return elementBigInt >> BigInt(byteIndex) * BigInt(8) & byteMask;
    });
    return bytesOfElement;
  });
  return bytesArray.map((byte) => String.fromCharCode(Number(byte)));
}

// src/utils/circuits/formatInputs.ts
function formatCountriesList(countries2) {
  if (countries2.length > MAX_FORBIDDEN_COUNTRIES_LIST_LENGTH) {
    throw new Error(
      `Countries list must be inferior or equals to ${MAX_FORBIDDEN_COUNTRIES_LIST_LENGTH}`
    );
  }
  for (const country of countries2) {
    if (!country || country.length !== 3) {
      throw new Error(
        `Invalid country code: "${country}". Country codes must be exactly 3 characters long.`
      );
    }
  }
  const paddedCountries = countries2.concat(
    Array(MAX_FORBIDDEN_COUNTRIES_LIST_LENGTH - countries2.length).fill("")
  );
  const result = paddedCountries.flatMap((country) => {
    const chars = country.padEnd(3, "\0").split("").map((char) => char.charCodeAt(0));
    return chars;
  });
  return result;
}
function reverseBytes(input) {
  const hex = input.slice(2);
  const bytes = hex.match(/.{2}/g) || [];
  const reversedBytes = bytes.reverse();
  return "0x" + reversedBytes.join("");
}
function reverseCountryBytes(input) {
  const hex = input.slice(2);
  const groups = hex.match(/.{6}/g) || [];
  const reversedGroups = groups.reverse();
  const remainderLength = hex.length % 6;
  let remainder = "";
  if (remainderLength > 0) {
    remainder = hex.slice(hex.length - remainderLength);
  }
  return "0x" + reversedGroups.join("") + remainder;
}

// src/utils/date.ts
function getCurrentDateYYMMDD(dayDiff = 0) {
  const date = /* @__PURE__ */ new Date();
  date.setDate(date.getDate() + dayDiff);
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth() + 1;
  const day = date.getUTCDate();
  const YY = `0${year % 100}`.slice(-2);
  const MM = `0${month}`.slice(-2);
  const DD = `0${day}`.slice(-2);
  const yymmdd = `${YY}${MM}${DD}`;
  return Array.from(yymmdd).map((char) => parseInt(char));
}

// src/utils/hash.ts
var import_ethers = require("ethers");
var import_js_sha1 = require("js-sha1");
var import_js_sha256 = require("js-sha256");
var import_js_sha512 = require("js-sha512");
var forge = __toESM(require("node-forge"), 1);
var import_poseidon_lite = require("poseidon-lite");

// src/utils/bytes.ts
function bytesToBigDecimal(arr) {
  let result = BigInt(0);
  for (let i = 0; i < arr.length; i++) {
    result = result * BigInt(256) + BigInt(arr[i] & 255);
  }
  return result.toString();
}
function computeIntChunkLength(byteLength) {
  const packSize = MAX_BYTES_IN_FIELD;
  const remain = byteLength % packSize;
  let numChunks = (byteLength - remain) / packSize;
  if (remain > 0) {
    numChunks += 1;
  }
  return numChunks;
}
function hexToDecimal(hex) {
  return BigInt(`0x${hex}`).toString();
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
function splitToWords(number, wordsize, numberElement) {
  let t = number;
  const words = [];
  for (let i = 0; i < numberElement; ++i) {
    const baseTwo = BigInt(2);
    words.push(`${t % BigInt(Math.pow(Number(baseTwo), wordsize))}`);
    t = BigInt(t / BigInt(Math.pow(Number(BigInt(2)), wordsize)));
  }
  if (!(t == BigInt(0))) {
    throw `Number ${number} does not fit in ${(wordsize * numberElement).toString()} bits`;
  }
  return words;
}

// src/utils/hash.ts
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

// src/utils/passports/format.ts
function formatMrz(mrz) {
  const mrzCharcodes = [...mrz].map((char) => char.charCodeAt(0));
  if (mrz.length === 88) {
    mrzCharcodes.unshift(88);
    mrzCharcodes.unshift(95, 31);
    mrzCharcodes.unshift(91);
    mrzCharcodes.unshift(97);
  } else if (mrz.length === 90) {
    mrzCharcodes.unshift(90);
    mrzCharcodes.unshift(95, 31);
    mrzCharcodes.unshift(93);
    mrzCharcodes.unshift(97);
  } else {
    throw new Error(`Unsupported MRZ length: ${mrz.length}. Expected 88 or 90 characters.`);
  }
  return mrzCharcodes;
}

// src/utils/passports/passport.ts
var forge2 = __toESM(require("node-forge"), 1);
var import_poseidon_lite3 = require("poseidon-lite");

// src/utils/certificate_parsing/parseCertificateSimple.ts
var asn1js = __toESM(require("asn1js"), 1);
var import_pkijs = require("pkijs");
function getCertificateFromPem(pemContent) {
  const pemFormatted = pemContent.replace(/(-----(BEGIN|END) CERTIFICATE-----|\n|\r)/g, "");
  const binary = Buffer.from(pemFormatted, "base64");
  const arrayBuffer = new ArrayBuffer(binary.length);
  const view = new Uint8Array(arrayBuffer);
  for (let i = 0; i < binary.length; i++) {
    view[i] = binary[i];
  }
  const asn12 = asn1js.fromBER(arrayBuffer);
  if (asn12.offset === -1) {
    throw new Error(`ASN.1 parsing error: ${asn12.result.error}`);
  }
  return new import_pkijs.Certificate({ schema: asn12.result });
}

// src/utils/csca.ts
function findStartIndex(modulus, messagePaddedNumber) {
  const modulusNumArray = [];
  for (let i = 0; i < modulus.length; i += 2) {
    const hexPair = modulus.slice(i, i + 2);
    const number = parseInt(hexPair, 16);
    modulusNumArray.push(number);
  }
  for (let i = 0; i < messagePaddedNumber.length - modulusNumArray.length + 1; i++) {
    let matched = true;
    for (let j = 0; j < modulusNumArray.length; j++) {
      if (modulusNumArray[j] !== messagePaddedNumber[i + j]) {
        matched = false;
        break;
      }
    }
    if (matched) {
      return [i, modulusNumArray.length];
    }
  }
  throw new Error("DSC Pubkey not found in certificate");
}
function findStartIndexEC(point, messagePadded) {
  const pointNumArray = [];
  for (let i = 0; i < point.length; i += 2) {
    pointNumArray.push(parseInt(point.slice(i, i + 2), 16));
  }
  let startIndex = -1;
  for (let i = 0; i < messagePadded.length - pointNumArray.length + 1; i++) {
    const isMatch = pointNumArray.every((byte, j) => messagePadded[i + j] === byte);
    if (isMatch) {
      startIndex = i;
      break;
    }
  }
  if (startIndex === -1) {
    throw new Error("DSC Pubkey not found in CSCA certificate");
  }
  return [startIndex, pointNumArray.length];
}

// src/utils/shaPad.ts
function assert(cond, errorMessage) {
  if (!cond) {
    throw new Error(errorMessage);
  }
}
function int64toBytes(num) {
  const arr = new ArrayBuffer(8);
  const view = new DataView(arr);
  view.setInt32(4, num, false);
  return new Uint8Array(arr);
}
function int128toBytes(x) {
  const buffer = new ArrayBuffer(16);
  const view = new DataView(buffer);
  view.setBigUint64(0, BigInt(0), false);
  view.setBigUint64(8, BigInt(x), false);
  return new Uint8Array(buffer);
}
function int8toBytes(num) {
  const arr = new ArrayBuffer(1);
  const view = new DataView(arr);
  view.setUint8(0, num);
  return new Uint8Array(arr);
}
function mergeUInt8Arrays(a1, a2) {
  const mergedArray = new Uint8Array(a1.length + a2.length);
  mergedArray.set(a1);
  mergedArray.set(a2, a1.length);
  return mergedArray;
}
function sha384_512Pad(prehash_prepad_m_array, maxShaBytes) {
  let prehash_prepad_m = new Uint8Array(prehash_prepad_m_array);
  const length_bits = prehash_prepad_m.length * 8;
  const length_in_bytes = int128toBytes(length_bits);
  prehash_prepad_m = mergeUInt8Arrays(prehash_prepad_m, int8toBytes(2 ** 7));
  while ((prehash_prepad_m.length * 8 + length_in_bytes.length * 8) % 1024 !== 0) {
    prehash_prepad_m = mergeUInt8Arrays(prehash_prepad_m, int8toBytes(0));
  }
  prehash_prepad_m = mergeUInt8Arrays(prehash_prepad_m, length_in_bytes);
  assert(prehash_prepad_m.length * 8 % 1024 === 0, "Padding did not complete properly!");
  const messageLen = prehash_prepad_m.length;
  while (prehash_prepad_m.length < maxShaBytes) {
    prehash_prepad_m = mergeUInt8Arrays(prehash_prepad_m, int128toBytes(0));
  }
  assert(
    prehash_prepad_m.length === maxShaBytes,
    `Padding to max length did not complete properly! Your padded message is ${prehash_prepad_m.length} long but max is ${maxShaBytes}!`
  );
  return [Array.from(prehash_prepad_m), messageLen];
}
function shaPad(prehash_prepad_m_array, maxShaBytes) {
  let prehash_prepad_m = new Uint8Array(prehash_prepad_m_array);
  const length_bits = prehash_prepad_m.length * 8;
  const length_in_bytes = int64toBytes(length_bits);
  prehash_prepad_m = mergeUInt8Arrays(prehash_prepad_m, int8toBytes(2 ** 7));
  while ((prehash_prepad_m.length * 8 + length_in_bytes.length * 8) % 512 !== 0) {
    prehash_prepad_m = mergeUInt8Arrays(prehash_prepad_m, int8toBytes(0));
  }
  prehash_prepad_m = mergeUInt8Arrays(prehash_prepad_m, length_in_bytes);
  assert(prehash_prepad_m.length * 8 % 512 === 0, "Padding did not complete properly!");
  const messageLen = prehash_prepad_m.length;
  while (prehash_prepad_m.length < maxShaBytes) {
    prehash_prepad_m = mergeUInt8Arrays(prehash_prepad_m, int64toBytes(0));
  }
  assert(
    prehash_prepad_m.length === maxShaBytes,
    `Padding to max length did not complete properly! Your padded message is ${prehash_prepad_m.length} long but max is ${maxShaBytes}!`
  );
  return [Array.from(prehash_prepad_m), messageLen];
}

// src/utils/trees.ts
var import_i18n_iso_countries = __toESM(require("i18n-iso-countries"), 1);
var import_en = __toESM(require("i18n-iso-countries/langs/en.json"), 1);
var import_poseidon_lite2 = require("poseidon-lite");
var import_zk_kit_imt = require("@openpassport/zk-kit-imt");
var import_zk_kit_lean_imt = require("@openpassport/zk-kit-lean-imt");
var import_zk_kit_smt = require("@openpassport/zk-kit-smt");
import_i18n_iso_countries.default.registerLocale(import_en.default);
function generateMerkleProof(imt, _index, maxleaf_depth) {
  const { siblings, index } = imt.generateProof(_index);
  const leaf_depth = siblings.length;
  const path = [];
  for (let i = 0; i < maxleaf_depth; i += 1) {
    path.push(index >> i & 1);
    if (siblings[i] === void 0) {
      siblings[i] = BigInt(0);
    }
  }
  return { siblings, path, leaf_depth };
}
function generateSMTProof(smt, leaf) {
  const { entry, matchingEntry, siblings, root, membership } = smt.createProof(leaf);
  const leaf_depth = siblings.length;
  let closestleaf;
  if (!matchingEntry) {
    if (!entry[1]) {
      closestleaf = BigInt(0);
    } else {
      closestleaf = BigInt(entry[0]);
    }
  } else {
    closestleaf = BigInt(matchingEntry[0]);
  }
  siblings.reverse();
  while (siblings.length < OFAC_TREE_LEVELS) siblings.push(BigInt(0));
  return {
    root,
    leaf_depth,
    closestleaf,
    siblings
  };
}
function getCscaTreeInclusionProof(leaf, _serialized_csca_tree) {
  const tree = new import_zk_kit_imt.IMT(import_poseidon_lite2.poseidon2, CSCA_TREE_DEPTH, 0, 2);
  tree.setNodes(_serialized_csca_tree);
  const index = tree.indexOf(leaf);
  if (index === -1) {
    throw new Error("Your public key was not found in the registry");
  }
  const proof = tree.createProof(index);
  return [
    tree.root,
    proof.pathIndices.map((index2) => index2.toString()),
    proof.siblings.flat().map((sibling) => sibling.toString())
  ];
}
function getDobLeaf(dobMrz, i) {
  if (dobMrz.length !== 6) {
    return BigInt(0);
  }
  try {
    return (0, import_poseidon_lite2.poseidon6)(dobMrz);
  } catch (err) {
    console.error("Error in getDobLeaf:", err, "Index:", i, "DOB MRZ:", dobMrz);
    return BigInt(0);
  }
}
function getDscTreeInclusionProof(leaf, serialized_dsc_tree) {
  const hashFunction = (a, b) => (0, import_poseidon_lite2.poseidon2)([a, b]);
  const tree = import_zk_kit_lean_imt.LeanIMT.import(hashFunction, serialized_dsc_tree);
  const index = tree.indexOf(BigInt(leaf));
  if (index === -1) {
    throw new Error("Your public key was not found in the registry");
  }
  const { siblings, path, leaf_depth } = generateMerkleProof(tree, index, DSC_TREE_DEPTH);
  return [tree.root, path, siblings, leaf_depth];
}
function getLeaf(parsed, type) {
  if (type === "dsc") {
    const tbsArray = Object.keys(parsed.tbsBytes).map((key) => parsed.tbsBytes[key]);
    const [paddedTbsBytes, tbsBytesPaddedLength] = pad(parsed.hashAlgorithm)(
      tbsArray,
      max_dsc_bytes
    );
    const dsc_hash = packBytesAndPoseidon(Array.from(paddedTbsBytes));
    return (0, import_poseidon_lite2.poseidon2)([dsc_hash, tbsArray.length]).toString();
  } else {
    const tbsBytesArray = Array.from(parsed.tbsBytes);
    const paddedTbsBytesArray = tbsBytesArray.concat(
      new Array(max_csca_bytes - tbsBytesArray.length).fill(0)
    );
    const csca_hash = packBytesAndPoseidon(paddedTbsBytesArray);
    return (0, import_poseidon_lite2.poseidon2)([csca_hash, tbsBytesArray.length]).toString();
  }
}
function getLeafCscaTree(csca_parsed) {
  return getLeaf(csca_parsed, "csca");
}
function getLeafDscTree(dsc_parsed, csca_parsed) {
  const dscLeaf = getLeaf(dsc_parsed, "dsc");
  const cscaLeaf = getLeaf(csca_parsed, "csca");
  return (0, import_poseidon_lite2.poseidon2)([dscLeaf, cscaLeaf]).toString();
}
function generateSmallKey(input) {
  return input % (BigInt(1) << BigInt(OFAC_TREE_LEVELS));
}
function getYearLeaf(yearArr) {
  if (yearArr.length !== 2) {
    return BigInt(0);
  }
  try {
    return (0, import_poseidon_lite2.poseidon2)(yearArr);
  } catch (err) {
    return BigInt(0);
  }
}
function getNameDobLeaf(nameMrz, dobMrz, i) {
  return generateSmallKey((0, import_poseidon_lite2.poseidon2)([getDobLeaf(dobMrz), getNameLeaf(nameMrz)]));
}
function getNameLeaf(nameMrz, i) {
  const middleChunks = [];
  const chunks = [];
  try {
    if (nameMrz.length == 39) {
      chunks.push(nameMrz.slice(0, 13), nameMrz.slice(13, 26), nameMrz.slice(26, 39));
      for (const chunk of chunks) {
        if (chunk.length !== 13)
          throw new Error(`Invalid chunk length for Poseidon13: ${chunk.length}`);
        middleChunks.push((0, import_poseidon_lite2.poseidon13)(chunk));
      }
    } else if (nameMrz.length == 30) {
      chunks.push(nameMrz.slice(0, 10), nameMrz.slice(10, 20), nameMrz.slice(20, 30));
      for (const chunk of chunks) {
        if (chunk.length !== 10)
          throw new Error(`Invalid chunk length for Poseidon10: ${chunk.length}`);
        middleChunks.push((0, import_poseidon_lite2.poseidon10)(chunk));
      }
    } else {
      throw new Error(`Unsupported name MRZ length: ${nameMrz.length}`);
    }
    if (middleChunks.length !== 3)
      throw new Error(`Invalid number of middle chunks: ${middleChunks.length}`);
    return (0, import_poseidon_lite2.poseidon3)(middleChunks);
  } catch (err) {
    console.error("Error in getNameLeaf:", err, "Index:", i, "MRZ Length:", nameMrz.length);
    return BigInt(0);
  }
}
function getNameYobLeaf(nameMrz, yobMrz, i) {
  return generateSmallKey((0, import_poseidon_lite2.poseidon2)([getYearLeaf(yobMrz), getNameLeaf(nameMrz)]));
}
function getPassportNumberAndNationalityLeaf(passport, nationality, i) {
  if (passport.length !== 9) {
    console.log("parsed passport length is not 9:", i, passport);
    return;
  }
  if (nationality.length !== 3) {
    console.log("parsed nationality length is not 3:", i, nationality);
    return;
  }
  try {
    const fullHash = (0, import_poseidon_lite2.poseidon12)(passport.concat(nationality));
    return generateSmallKey(fullHash);
  } catch (err) {
    console.log("err : passport", err, i, passport);
  }
}

// src/utils/passports/passport.ts
function extractRSFromSignature(signatureBytes) {
  const derSignature = Buffer.from(signatureBytes).toString("binary");
  const asn12 = forge2.asn1.fromDer(derSignature);
  const signatureAsn1 = asn12.value;
  if (signatureAsn1.length !== 2) {
    throw new Error("Invalid signature format");
  }
  if (!Array.isArray(asn12.value) || asn12.value.length !== 2) {
    throw new Error("Invalid signature format");
  }
  const r = forge2.util.createBuffer(asn12.value[0].value).toHex();
  const s = forge2.util.createBuffer(asn12.value[1].value).toHex();
  return { r, s };
}
function extractSignatureFromDSC(dscCertificate) {
  const cert = getCertificateFromPem(dscCertificate);
  const dscSignature = cert.signatureValue.valueBlock.valueHexView;
  return Array.from(dscSignature);
}
function findStartPubKeyIndex(certificateData, rawCert, signatureAlgorithm) {
  const { publicKeyDetails } = certificateData;
  if (signatureAlgorithm === "ecdsa") {
    const { x, y } = publicKeyDetails;
    const [x_index, x_totalLength] = findStartIndexEC(x, rawCert);
    const [y_index, y_totalLength] = findStartIndexEC(y, rawCert);
    return [x_index, x_totalLength + y_totalLength];
  } else {
    const { modulus } = publicKeyDetails;
    return findStartIndex(modulus, rawCert);
  }
}
function formatSignatureDSCCircuit(cscaSignatureAlgorithm, cscaHashFunction, cscaCertificateData, signature) {
  const cscaSignatureAlgorithmFullName = getSignatureAlgorithmFullName(
    cscaCertificateData,
    cscaSignatureAlgorithm,
    cscaHashFunction
  );
  const { n, k } = getNAndK(cscaSignatureAlgorithmFullName);
  if (cscaSignatureAlgorithm === "ecdsa") {
    const { r, s } = extractRSFromSignature(signature);
    const signature_r = splitToWords(BigInt(hexToDecimal(r)), n, k);
    const signature_s = splitToWords(BigInt(hexToDecimal(s)), n, k);
    return [...signature_r, ...signature_s];
  } else {
    return formatInput(splitToWords(BigInt(bytesToBigDecimal(signature)), n, k));
  }
}
function generateCommitment(secret, attestation_id, passportData) {
  const passportMetadata = passportData.passportMetadata;
  const dg1_packed_hash = packBytesAndPoseidon(formatMrz(passportData.mrz));
  const eContent_shaBytes = hash(
    passportMetadata.eContentHashFunction,
    Array.from(passportData.eContent),
    "bytes"
  );
  const eContent_packed_hash = packBytesAndPoseidon(
    eContent_shaBytes.map((byte) => byte & 255)
  );
  const dsc_hash = getLeafDscTree(passportData.dsc_parsed, passportData.csca_parsed);
  return (0, import_poseidon_lite3.poseidon5)([
    secret,
    attestation_id,
    dg1_packed_hash,
    eContent_packed_hash,
    dsc_hash
  ]).toString();
}
function getPassportSignature(passportData, n, k) {
  const { signatureAlgorithm } = passportData.dsc_parsed;
  if (signatureAlgorithm === "ecdsa") {
    const { r, s } = extractRSFromSignature(passportData.encryptedDigest);
    const signature_r = splitToWords(BigInt(hexToDecimal(r)), n, k);
    const signature_s = splitToWords(BigInt(hexToDecimal(s)), n, k);
    return [...signature_r, ...signature_s];
  } else {
    return splitToWords(BigInt(bytesToBigDecimal(passportData.encryptedDigest)), n, k);
  }
}
function getCertificatePubKey(certificateData, signatureAlgorithm, hashFunction) {
  const signatureAlgorithmFullName = getSignatureAlgorithmFullName(
    certificateData,
    signatureAlgorithm,
    hashFunction
  );
  const { n, k } = getNAndK(signatureAlgorithmFullName);
  const { publicKeyDetails } = certificateData;
  if (signatureAlgorithm === "ecdsa") {
    const { x, y } = publicKeyDetails;
    const x_dsc = splitToWords(BigInt(hexToDecimal(x)), n, k);
    const y_dsc = splitToWords(BigInt(hexToDecimal(y)), n, k);
    return [...x_dsc, ...y_dsc];
  } else {
    const { modulus } = publicKeyDetails;
    return splitToWords(BigInt(hexToDecimal(modulus)), n, k);
  }
}
function getNAndK(sigAlg) {
  if (sigAlg === "rsa_sha256_65537_3072") {
    return { n: n_dsc_3072, k: k_dsc };
  }
  if (sigAlg.startsWith("ecdsa_")) {
    if (sigAlg.endsWith("224")) {
      return { n: 32, k: 7 };
    } else if (sigAlg.endsWith("256")) {
      return { n: n_dsc_ecdsa, k: 4 };
    } else if (sigAlg.endsWith("384")) {
      return { n: n_dsc_ecdsa, k: 6 };
    } else if (sigAlg.endsWith("512")) {
      return { n: n_dsc_ecdsa, k: 8 };
    } else if (sigAlg.endsWith("521")) {
      return { n: 66, k: 8 };
    } else {
      throw new Error("invalid key size");
    }
  }
  if (sigAlg.startsWith("rsapss_")) {
    const keyLength = parseInt(sigAlg.split("_")[3]);
    if (keyLength === 3072) {
      return { n: n_dsc_3072, k: k_dsc_3072 };
    }
    if (keyLength === 4096) {
      return { n: n_dsc_4096, k: k_dsc_4096 };
    }
    return { n: n_dsc, k: k_dsc };
  }
  if (sigAlg === "rsa_sha256_65537_4096" || sigAlg === "rsa_sha512_65537_4096") {
    return { n: n_dsc_4096, k: k_dsc_4096 };
  }
  return { n: n_dsc, k: k_dsc };
}
function getPassportSignatureInfos(passportData) {
  const passportMetadata = passportData.passportMetadata;
  const signatureAlgorithmFullName = getSignatureAlgorithmFullName(
    passportData.dsc_parsed,
    passportMetadata.signatureAlgorithm,
    passportMetadata.signedAttrHashFunction
  );
  const { n, k } = getNAndK(signatureAlgorithmFullName);
  return {
    pubKey: getCertificatePubKey(
      passportData.dsc_parsed,
      passportMetadata.signatureAlgorithm,
      passportMetadata.signedAttrHashFunction
    ),
    signature: getPassportSignature(passportData, n, k),
    signatureAlgorithmFullName
  };
}
function getSignatureAlgorithmFullName(certificateData, signatureAlgorithm, hashAlgorithm) {
  const { publicKeyDetails } = certificateData;
  if (signatureAlgorithm === "ecdsa") {
    return `${signatureAlgorithm}_${hashAlgorithm}_${publicKeyDetails.curve}_${publicKeyDetails.bits}`;
  } else {
    const { exponent } = publicKeyDetails;
    return `${signatureAlgorithm}_${hashAlgorithm}_${exponent}_${publicKeyDetails.bits}`;
  }
}
function pad(hashFunction) {
  return hashFunction === "sha1" || hashFunction === "sha224" || hashFunction === "sha256" ? shaPad : sha384_512Pad;
}
function padWithZeroes(bytes, length) {
  return bytes.concat(new Array(length - bytes.length).fill(0));
}

// src/utils/circuits/generateInputs.ts
function findIndexInTree(tree, commitment) {
  let index = tree.indexOf(commitment);
  if (index === -1) {
    index = tree.indexOf(commitment.toString());
  }
  if (index === -1) {
    throw new Error("This commitment was not found in the tree");
  } else {
  }
  return index;
}
function formatInput(input) {
  if (Array.isArray(input)) {
    return input.map((item) => BigInt(item).toString());
  } else if (input instanceof Uint8Array) {
    return Array.from(input).map((num) => BigInt(num).toString());
  } else if (typeof input === "string" && input.includes(",")) {
    const numbers = input.split(",").map((s) => s.trim()).filter((s) => s !== "" && !isNaN(Number(s))).map(Number);
    try {
      return numbers.map((num) => BigInt(num).toString());
    } catch (e) {
      throw e;
    }
  } else {
    return [BigInt(input).toString()];
  }
}
function generateCircuitInputsDSC(passportData, serializedCscaTree) {
  const passportMetadata = passportData.passportMetadata;
  const cscaParsed = passportData.csca_parsed;
  const dscParsed = passportData.dsc_parsed;
  const raw_dsc = passportData.dsc;
  const cscaTbsBytesPadded = padWithZeroes(cscaParsed.tbsBytes, max_csca_bytes);
  const dscTbsBytes = dscParsed.tbsBytes;
  const [dscTbsBytesPadded, dscTbsBytesLen] = pad(passportMetadata.cscaHashFunction)(
    dscTbsBytes,
    max_dsc_bytes
  );
  const leaf = getLeafCscaTree(cscaParsed);
  const [root, path, siblings] = getCscaTreeInclusionProof(leaf, serializedCscaTree);
  const csca_pubKey_formatted = getCertificatePubKey(
    cscaParsed,
    passportMetadata.cscaSignatureAlgorithm,
    passportMetadata.cscaHashFunction
  );
  const signatureRaw = extractSignatureFromDSC(raw_dsc);
  const signature = formatSignatureDSCCircuit(
    passportMetadata.cscaSignatureAlgorithm,
    passportMetadata.cscaHashFunction,
    cscaParsed,
    signatureRaw
  );
  const [startIndex, keyLength] = findStartPubKeyIndex(
    cscaParsed,
    cscaTbsBytesPadded,
    passportMetadata.cscaSignatureAlgorithm
  );
  return {
    raw_csca: cscaTbsBytesPadded.map((x) => x.toString()),
    raw_csca_actual_length: BigInt(cscaParsed.tbsBytes.length).toString(),
    csca_pubKey_offset: startIndex.toString(),
    csca_pubKey_actual_size: BigInt(keyLength).toString(),
    raw_dsc: Array.from(dscTbsBytesPadded).map((x) => x.toString()),
    raw_dsc_padded_length: BigInt(dscTbsBytesLen).toString(),
    // with the sha padding actually
    csca_pubKey: csca_pubKey_formatted,
    signature,
    merkle_root: root,
    path,
    siblings
  };
}
function generateCircuitInputsOfac(passportData, sparsemerkletree, proofLevel) {
  const { mrz, documentType } = passportData;
  const isPassportType = documentType === "passport" || documentType === "mock_passport";
  const mrz_bytes = formatMrz(mrz);
  const nameSlice = isPassportType ? mrz_bytes.slice(5 + 5, 44 + 5) : mrz_bytes.slice(60 + 5, 90 + 5);
  const dobSlice = isPassportType ? mrz_bytes.slice(57 + 5, 63 + 5) : mrz_bytes.slice(30 + 5, 36 + 5);
  const yobSlice = isPassportType ? mrz_bytes.slice(57 + 5, 59 + 5) : mrz_bytes.slice(30 + 5, 32 + 5);
  const nationalitySlice = isPassportType ? mrz_bytes.slice(54 + 5, 57 + 5) : mrz_bytes.slice(45 + 5, 48 + 5);
  const passNoSlice = isPassportType ? mrz_bytes.slice(44 + 5, 53 + 5) : mrz_bytes.slice(5 + 5, 14 + 5);
  let leafToProve;
  if (proofLevel == 3) {
    if (!isPassportType) {
      throw new Error(
        "Proof level 3 (Passport Number) is only applicable to passport document types."
      );
    }
    leafToProve = getPassportNumberAndNationalityLeaf(passNoSlice, nationalitySlice);
  } else if (proofLevel == 2) {
    leafToProve = getNameDobLeaf(nameSlice, dobSlice);
  } else if (proofLevel == 1) {
    leafToProve = getNameYobLeaf(nameSlice, yobSlice);
  } else {
    throw new Error("Invalid proof level specified for OFAC check.");
  }
  const { root, closestleaf, siblings } = generateSMTProof(sparsemerkletree, leafToProve);
  return {
    dg1: formatInput(mrz_bytes),
    smt_leaf_key: formatInput(closestleaf),
    smt_root: formatInput(root),
    smt_siblings: formatInput(siblings)
  };
}
function generateCircuitInputsRegister(secret, passportData, serializedDscTree) {
  const { mrz, eContent, signedAttr } = passportData;
  const passportMetadata = passportData.passportMetadata;
  const dscParsed = passportData.dsc_parsed;
  const [dscTbsBytesPadded] = pad(dscParsed.hashAlgorithm)(dscParsed.tbsBytes, max_dsc_bytes);
  const { pubKey, signature, signatureAlgorithmFullName } = getPassportSignatureInfos(passportData);
  const mrz_formatted = formatMrz(mrz);
  if (eContent.length > MAX_PADDED_ECONTENT_LEN[signatureAlgorithmFullName]) {
    console.error(
      `eContent too long (${eContent.length} bytes). Max length is ${MAX_PADDED_ECONTENT_LEN[signatureAlgorithmFullName]} bytes.`
    );
    throw new Error(
      `This length of datagroups (${eContent.length} bytes) is currently unsupported. Please contact us so we add support!`
    );
  }
  const [eContentPadded, eContentLen] = pad(passportMetadata.eContentHashFunction)(
    eContent,
    MAX_PADDED_ECONTENT_LEN[passportMetadata.dg1HashFunction]
  );
  const [signedAttrPadded, signedAttrPaddedLen] = pad(passportMetadata.signedAttrHashFunction)(
    signedAttr,
    MAX_PADDED_SIGNED_ATTR_LEN[passportMetadata.eContentHashFunction]
  );
  const dsc_leaf = getLeafDscTree(dscParsed, passportData.csca_parsed);
  const [root, path, siblings, leaf_depth] = getDscTreeInclusionProof(dsc_leaf, serializedDscTree);
  const csca_tree_leaf = getLeafCscaTree(passportData.csca_parsed);
  const [startIndex, keyLength] = findStartPubKeyIndex(
    dscParsed,
    dscTbsBytesPadded,
    dscParsed.signatureAlgorithm
  );
  const inputs = {
    raw_dsc: dscTbsBytesPadded.map((x) => x.toString()),
    raw_dsc_actual_length: [BigInt(dscParsed.tbsBytes.length).toString()],
    dsc_pubKey_offset: startIndex,
    dsc_pubKey_actual_size: [BigInt(keyLength).toString()],
    dg1: mrz_formatted,
    dg1_hash_offset: passportMetadata.dg1HashOffset,
    eContent: eContentPadded,
    eContent_padded_length: eContentLen,
    signed_attr: signedAttrPadded,
    signed_attr_padded_length: signedAttrPaddedLen,
    signed_attr_econtent_hash_offset: passportMetadata.eContentHashOffset,
    pubKey_dsc: pubKey,
    signature_passport: signature,
    merkle_root: [BigInt(root).toString()],
    leaf_depth,
    path,
    siblings,
    csca_tree_leaf,
    secret
  };
  return Object.entries(inputs).map(([key, value]) => ({
    [key]: formatInput(value)
  })).reduce((acc, curr) => ({ ...acc, ...curr }), {});
}
function generateCircuitInputsVCandDisclose(secret, attestation_id, passportData, scope, selector_dg1, selector_older_than, merkletree, majority, passportNo_smt, nameAndDob_smt, nameAndYob_smt, selector_ofac, forbidden_countries_list, user_identifier) {
  const { mrz, eContent, signedAttr, documentType } = passportData;
  const passportMetadata = passportData.passportMetadata;
  const isPassportType = documentType === "passport" || documentType === "mock_passport";
  const formattedMrz = formatMrz(mrz);
  const eContent_shaBytes = hash(
    passportMetadata.eContentHashFunction,
    Array.from(eContent),
    "bytes"
  );
  const eContent_packed_hash = packBytesAndPoseidon(
    eContent_shaBytes.map((byte) => byte & 255)
  );
  const dsc_tree_leaf = getLeafDscTree(passportData.dsc_parsed, passportData.csca_parsed);
  const commitment = generateCommitment(secret, attestation_id, passportData);
  const index = findIndexInTree(merkletree, BigInt(commitment));
  const { siblings, path, leaf_depth } = generateMerkleProof(
    merkletree,
    index,
    COMMITMENT_TREE_DEPTH
  );
  const formattedMajority = majority.length === 1 ? `0${majority}` : majority;
  const majority_ascii = formattedMajority.split("").map((char) => char.charCodeAt(0));
  const defaultSiblings = Array(OFAC_TREE_LEVELS).fill(BigInt(0));
  let passportNoProof = {
    root: BigInt(0),
    closestleaf: BigInt(0),
    siblings: defaultSiblings
  };
  let nameDobProof;
  let nameYobProof;
  const nameSlice = isPassportType ? formattedMrz.slice(10, 49) : formattedMrz.slice(65, 95);
  const dobSlice = isPassportType ? formattedMrz.slice(62, 68) : formattedMrz.slice(35, 41);
  const yobSlice = isPassportType ? formattedMrz.slice(62, 64) : formattedMrz.slice(35, 37);
  const nationalitySlice = isPassportType ? formattedMrz.slice(59, 62) : formattedMrz.slice(50, 53);
  const passNoSlice = isPassportType ? formattedMrz.slice(49, 58) : formattedMrz.slice(10, 19);
  const namedob_leaf = getNameDobLeaf(nameSlice, dobSlice);
  const nameyob_leaf = getNameYobLeaf(nameSlice, yobSlice);
  nameDobProof = generateSMTProof(nameAndDob_smt, namedob_leaf);
  nameYobProof = generateSMTProof(nameAndYob_smt, nameyob_leaf);
  if (isPassportType) {
    if (!passportNo_smt) {
      console.warn("Document type is passport, but passportNo_smt tree was not provided.");
    } else {
      const passportNo_leaf = getPassportNumberAndNationalityLeaf(passNoSlice, nationalitySlice);
      const proofResult = generateSMTProof(passportNo_smt, passportNo_leaf);
      passportNoProof = {
        root: BigInt(proofResult.root),
        closestleaf: BigInt(proofResult.closestleaf),
        siblings: proofResult.siblings
      };
    }
  }
  const baseInputs = {
    secret: formatInput(secret),
    attestation_id: formatInput(attestation_id),
    dg1: formatInput(formattedMrz),
    eContent_shaBytes_packed_hash: formatInput(eContent_packed_hash),
    dsc_tree_leaf: formatInput(dsc_tree_leaf),
    merkle_root: formatInput(merkletree.root),
    leaf_depth: formatInput(leaf_depth),
    path: formatInput(path),
    siblings: formatInput(siblings),
    selector_dg1: formatInput(selector_dg1),
    selector_older_than: formatInput(selector_older_than),
    scope: formatInput(scope),
    current_date: formatInput(getCurrentDateYYMMDD()),
    majority: formatInput(majority_ascii),
    user_identifier: formatInput(user_identifier),
    selector_ofac: formatInput(selector_ofac),
    forbidden_countries_list: formatInput(formatCountriesList(forbidden_countries_list))
  };
  const ofacNameInputs = {
    ofac_namedob_smt_root: formatInput(nameDobProof.root),
    ofac_namedob_smt_leaf_key: formatInput(nameDobProof.closestleaf),
    ofac_namedob_smt_siblings: formatInput(nameDobProof.siblings),
    ofac_nameyob_smt_root: formatInput(nameYobProof.root),
    ofac_nameyob_smt_leaf_key: formatInput(nameYobProof.closestleaf),
    ofac_nameyob_smt_siblings: formatInput(nameYobProof.siblings)
  };
  const finalInputs = {
    ...baseInputs,
    ...ofacNameInputs,
    ...isPassportType && {
      ofac_passportno_smt_root: formatInput(passportNoProof.root),
      ofac_passportno_smt_leaf_key: formatInput(passportNoProof.closestleaf),
      ofac_passportno_smt_siblings: formatInput(passportNoProof.siblings)
    }
  };
  return finalInputs;
}

// src/utils/circuits/circuitsName.ts
function getCircuitNameFromPassportData(passportData, circuitType) {
  if (circuitType === "register") {
    return getRegisterNameFromPassportData(passportData);
  } else {
    return getDSCircuitNameFromPassportData(passportData);
  }
}
function getDSCircuitNameFromPassportData(passportData) {
  console.log("Getting DSC circuit name from passport data...");
  if (!passportData.passportMetadata) {
    console.error("Passport metadata is missing");
    throw new Error("Passport data are not parsed");
  }
  const passportMetadata = passportData.passportMetadata;
  if (!passportMetadata.cscaFound) {
    console.error("CSCA not found in passport metadata");
    throw new Error("CSCA not found");
  }
  const signatureAlgorithm = passportMetadata.cscaSignatureAlgorithm;
  const hashFunction = passportMetadata.cscaHashFunction;
  console.log("CSCA Signature Algorithm:", signatureAlgorithm);
  console.log("CSCA Hash Function:", hashFunction);
  if (signatureAlgorithm === "ecdsa") {
    console.log("Processing ECDSA signature...");
    const curve = passportMetadata.cscaCurveOrExponent;
    console.log("ECDSA curve:", curve);
    const circuitName = `dsc_${hashFunction}_${signatureAlgorithm}_${curve}`;
    console.log("Generated circuit name:", circuitName);
    return circuitName;
  } else if (signatureAlgorithm === "rsa") {
    console.log("Processing RSA signature...");
    const exponent = passportMetadata.cscaCurveOrExponent;
    const bits = passportMetadata.cscaSignatureAlgorithmBits;
    console.log("RSA exponent:", exponent);
    console.log("RSA bits:", bits);
    if (bits <= 4096) {
      const circuitName = `dsc_${hashFunction}_${signatureAlgorithm}_${exponent}_${4096}`;
      console.log("Generated circuit name:", circuitName);
      return circuitName;
    } else {
      console.error("RSA key length exceeds maximum supported length");
      throw new Error(`Unsupported key length: ${bits}`);
    }
  } else if (signatureAlgorithm === "rsapss") {
    console.log("Processing RSA-PSS signature...");
    const exponent = passportMetadata.cscaCurveOrExponent;
    const saltLength = passportMetadata.cscaSaltLength;
    const bits = passportMetadata.cscaSignatureAlgorithmBits;
    console.log("RSA-PSS exponent:", exponent);
    console.log("RSA-PSS salt length:", saltLength);
    console.log("RSA-PSS bits:", bits);
    if (bits <= 4096) {
      const circuitName = `dsc_${hashFunction}_${signatureAlgorithm}_${exponent}_${saltLength}_${bits}`;
      console.log("Generated circuit name:", circuitName);
      return circuitName;
    } else {
      console.error("RSA-PSS key length exceeds maximum supported length");
      throw new Error(`Unsupported key length: ${bits}`);
    }
  } else {
    console.error("Unsupported signature algorithm:", signatureAlgorithm);
    throw new Error("Unsupported signature algorithm");
  }
}
function getRegisterNameFromPassportData(passportData) {
  console.log("Getting register circuit name from passport data...");
  if (!passportData.passportMetadata) {
    console.error("Passport metadata is missing");
    throw new Error("Passport data are not parsed");
  }
  const passportMetadata = passportData.passportMetadata;
  if (!passportMetadata.cscaFound) {
    console.error("CSCA not found in passport metadata");
    throw new Error("CSCA not found");
  }
  const dgHashAlgo = passportMetadata.dg1HashFunction;
  const eContentHashAlgo = passportMetadata.eContentHashFunction;
  const signedAttrHashAlgo = passportMetadata.signedAttrHashFunction;
  const sigAlg = passportMetadata.signatureAlgorithm;
  console.log("DG Hash Algorithm:", dgHashAlgo);
  console.log("eContent Hash Algorithm:", eContentHashAlgo);
  console.log("Signed Attributes Hash Algorithm:", signedAttrHashAlgo);
  console.log("Signature Algorithm:", sigAlg);
  const prefix = passportData.documentType === "id_card" || passportData.documentType === "mock_id_card" ? "register_id" : "register";
  if (sigAlg === "ecdsa") {
    console.log("Processing ECDSA signature...");
    const { curveOrExponent } = passportMetadata;
    console.log("ECDSA curve:", curveOrExponent);
    const circuitName = `${prefix}_${dgHashAlgo}_${eContentHashAlgo}_${signedAttrHashAlgo}_${sigAlg}_${curveOrExponent}`;
    console.log("Generated circuit name:", circuitName);
    return circuitName;
  } else if (sigAlg === "rsa") {
    console.log("Processing RSA signature...");
    const { curveOrExponent, signatureAlgorithmBits } = passportMetadata;
    console.log("RSA exponent:", curveOrExponent);
    console.log("RSA bits:", signatureAlgorithmBits);
    if (signatureAlgorithmBits <= 4096) {
      const circuitName = `${prefix}_${dgHashAlgo}_${eContentHashAlgo}_${signedAttrHashAlgo}_${sigAlg}_${curveOrExponent}_${4096}`;
      console.log("Generated circuit name:", circuitName);
      return circuitName;
    } else {
      console.error("RSA key length exceeds maximum supported length");
      throw new Error(`Unsupported key length: ${signatureAlgorithmBits}`);
    }
  } else if (sigAlg === "rsapss") {
    console.log("Processing RSA-PSS signature...");
    const { curveOrExponent, saltLength, signatureAlgorithmBits } = passportMetadata;
    console.log("RSA-PSS exponent:", curveOrExponent);
    console.log("RSA-PSS salt length:", saltLength);
    console.log("RSA-PSS bits:", signatureAlgorithmBits);
    if (signatureAlgorithmBits <= 4096) {
      const circuitName = `${prefix}_${dgHashAlgo}_${eContentHashAlgo}_${signedAttrHashAlgo}_${sigAlg}_${curveOrExponent}_${saltLength}_${signatureAlgorithmBits}`;
      console.log("Generated circuit name:", circuitName);
      return circuitName;
    } else {
      console.error("RSA-PSS key length exceeds maximum supported length");
      throw new Error(`Unsupported key length: ${signatureAlgorithmBits}`);
    }
  } else {
    console.error("Unsupported signature algorithm:", sigAlg);
    throw new Error("Unsupported signature algorithm");
  }
}
//# sourceMappingURL=index.cjs.map