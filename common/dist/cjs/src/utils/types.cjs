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

// src/utils/types.ts
var types_exports = {};
__export(types_exports, {
  castCSCAProof: () => castCSCAProof
});
module.exports = __toCommonJS(types_exports);
function castCSCAProof(proof) {
  return {
    proof: {
      a: proof.proof.pi_a.slice(0, 2),
      b: [proof.proof.pi_b[0].slice(0, 2), proof.proof.pi_b[1].slice(0, 2)],
      c: proof.proof.pi_c.slice(0, 2)
    },
    pub_signals: proof.pub_signals
  };
}
//# sourceMappingURL=types.cjs.map