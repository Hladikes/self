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

// utils/utils.ts
var utils_exports = {};
__export(utils_exports, {
  QRcodeSteps: () => QRcodeSteps
});
module.exports = __toCommonJS(utils_exports);
var QRcodeSteps = {
  DISCONNECTED: 0,
  WAITING_FOR_MOBILE: 1,
  MOBILE_CONNECTED: 2,
  PROOF_GENERATION_STARTED: 3,
  PROOF_GENERATION_FAILED: 4,
  PROOF_GENERATED: 5,
  PROOF_VERIFIED: 6
};
//# sourceMappingURL=utils.cjs.map