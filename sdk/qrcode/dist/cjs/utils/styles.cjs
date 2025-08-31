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

// utils/styles.ts
var styles_exports = {};
__export(styles_exports, {
  containerStyle: () => containerStyle,
  ledContainerStyle: () => ledContainerStyle,
  qrContainerStyle: () => qrContainerStyle
});
module.exports = __toCommonJS(styles_exports);
var containerStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%"
};
var ledContainerStyle = {
  marginBottom: "4px"
};
var qrContainerStyle = (size) => ({
  width: `${size}px`,
  height: `${size}px`,
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
});
//# sourceMappingURL=styles.cjs.map