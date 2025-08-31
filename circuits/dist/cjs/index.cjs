var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  CIRCUITS_VERSION: () => CIRCUITS_VERSION,
  SUPPORTED_SIGNATURE_ALGORITHMS: () => SUPPORTED_SIGNATURE_ALGORITHMS
});
module.exports = __toCommonJS(src_exports);
var CIRCUITS_VERSION = "0.0.1";
var SUPPORTED_SIGNATURE_ALGORITHMS = [
  "rsa_sha256_65537_2048",
  "rsa_sha256_65537_3072",
  "rsa_sha256_65537_4096",
  "rsa_sha1_65537_2048",
  "rsa_sha512_65537_4096",
  "rsapss_sha256_65537_32_3072",
  "rsapss_sha256_65537_32_4096",
  "rsapss_sha256_3_32_3072",
  "rsapss_sha384_65537_48_3072",
  "rsapss_sha512_65537_64_4096"
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CIRCUITS_VERSION,
  SUPPORTED_SIGNATURE_ALGORITHMS
});
//# sourceMappingURL=index.cjs.map