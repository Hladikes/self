// src/constants/constants.ts
var OFAC_TREE_LEVELS = 64;

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

// src/utils/trees.ts
import countries from "i18n-iso-countries";
import en from "i18n-iso-countries/langs/en.json";
import { poseidon2, poseidon3, poseidon6, poseidon10, poseidon12, poseidon13 } from "poseidon-lite";
import { IMT } from "@openpassport/zk-kit-imt";
import { LeanIMT } from "@openpassport/zk-kit-lean-imt";
import { SMT } from "@openpassport/zk-kit-smt";
countries.registerLocale(en);
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
function getDobLeaf(dobMrz, i) {
  if (dobMrz.length !== 6) {
    return BigInt(0);
  }
  try {
    return poseidon6(dobMrz);
  } catch (err) {
    console.error("Error in getDobLeaf:", err, "Index:", i, "DOB MRZ:", dobMrz);
    return BigInt(0);
  }
}
function generateSmallKey(input) {
  return input % (BigInt(1) << BigInt(OFAC_TREE_LEVELS));
}
function getYearLeaf(yearArr) {
  if (yearArr.length !== 2) {
    return BigInt(0);
  }
  try {
    return poseidon2(yearArr);
  } catch (err) {
    return BigInt(0);
  }
}
function getNameDobLeaf(nameMrz, dobMrz, i) {
  return generateSmallKey(poseidon2([getDobLeaf(dobMrz), getNameLeaf(nameMrz)]));
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
        middleChunks.push(poseidon13(chunk));
      }
    } else if (nameMrz.length == 30) {
      chunks.push(nameMrz.slice(0, 10), nameMrz.slice(10, 20), nameMrz.slice(20, 30));
      for (const chunk of chunks) {
        if (chunk.length !== 10)
          throw new Error(`Invalid chunk length for Poseidon10: ${chunk.length}`);
        middleChunks.push(poseidon10(chunk));
      }
    } else {
      throw new Error(`Unsupported name MRZ length: ${nameMrz.length}`);
    }
    if (middleChunks.length !== 3)
      throw new Error(`Invalid number of middle chunks: ${middleChunks.length}`);
    return poseidon3(middleChunks);
  } catch (err) {
    console.error("Error in getNameLeaf:", err, "Index:", i, "MRZ Length:", nameMrz.length);
    return BigInt(0);
  }
}
function getNameYobLeaf(nameMrz, yobMrz, i) {
  return generateSmallKey(poseidon2([getYearLeaf(yobMrz), getNameLeaf(nameMrz)]));
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
    const fullHash = poseidon12(passport.concat(nationality));
    return generateSmallKey(fullHash);
  } catch (err) {
    console.log("err : passport", err, i, passport);
  }
}

// src/utils/circuits/generateInputs.ts
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
export {
  generateCircuitInputsOfac
};
//# sourceMappingURL=ofacInputs.js.map