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

// src/constants/constants.ts
var constants_exports = {};
__export(constants_exports, {
  API_URL: () => API_URL,
  API_URL_STAGING: () => API_URL_STAGING,
  CHAIN_NAME: () => CHAIN_NAME,
  CIRCUIT_CONSTANTS: () => CIRCUIT_CONSTANTS,
  CIRCUIT_TYPES: () => CIRCUIT_TYPES,
  COMMITMENT_TREE_DEPTH: () => COMMITMENT_TREE_DEPTH,
  CSCA_TREE_DEPTH: () => CSCA_TREE_DEPTH,
  CSCA_TREE_URL: () => CSCA_TREE_URL,
  CSCA_TREE_URL_ID_CARD: () => CSCA_TREE_URL_ID_CARD,
  CSCA_TREE_URL_STAGING: () => CSCA_TREE_URL_STAGING,
  CSCA_TREE_URL_STAGING_ID_CARD: () => CSCA_TREE_URL_STAGING_ID_CARD,
  DEFAULT_MAJORITY: () => DEFAULT_MAJORITY,
  DEFAULT_RPC_URL: () => DEFAULT_RPC_URL,
  DEFAULT_USER_ID_TYPE: () => DEFAULT_USER_ID_TYPE,
  DEVELOPMENT_MODE: () => DEVELOPMENT_MODE,
  DSC_TREE_DEPTH: () => DSC_TREE_DEPTH,
  DSC_TREE_URL: () => DSC_TREE_URL,
  DSC_TREE_URL_ID_CARD: () => DSC_TREE_URL_ID_CARD,
  DSC_TREE_URL_STAGING: () => DSC_TREE_URL_STAGING,
  DSC_TREE_URL_STAGING_ID_CARD: () => DSC_TREE_URL_STAGING_ID_CARD,
  DscVerifierId: () => DscVerifierId,
  ECDSA_K_LENGTH_FACTOR: () => ECDSA_K_LENGTH_FACTOR,
  IDENTITY_TREE_URL: () => IDENTITY_TREE_URL,
  IDENTITY_TREE_URL_ID_CARD: () => IDENTITY_TREE_URL_ID_CARD,
  IDENTITY_TREE_URL_STAGING: () => IDENTITY_TREE_URL_STAGING,
  IDENTITY_TREE_URL_STAGING_ID_CARD: () => IDENTITY_TREE_URL_STAGING_ID_CARD,
  ID_CARD_ATTESTATION_ID: () => ID_CARD_ATTESTATION_ID,
  MAX_BYTES_IN_FIELD: () => MAX_BYTES_IN_FIELD,
  MAX_CERT_BYTES: () => MAX_CERT_BYTES,
  MAX_DATAHASHES_LEN: () => MAX_DATAHASHES_LEN,
  MAX_FORBIDDEN_COUNTRIES_LIST_LENGTH: () => MAX_FORBIDDEN_COUNTRIES_LIST_LENGTH,
  MAX_PADDED_ECONTENT_LEN: () => MAX_PADDED_ECONTENT_LEN,
  MAX_PADDED_SIGNED_ATTR_LEN: () => MAX_PADDED_SIGNED_ATTR_LEN,
  MAX_PUBKEY_DSC_BYTES: () => MAX_PUBKEY_DSC_BYTES,
  OFAC_TREE_LEVELS: () => OFAC_TREE_LEVELS,
  PASSPORT_ATTESTATION_ID: () => PASSPORT_ATTESTATION_ID,
  PCR0_MANAGER_ADDRESS: () => PCR0_MANAGER_ADDRESS,
  REDIRECT_URL: () => REDIRECT_URL,
  REGISTER_CONTRACT_ADDRESS: () => REGISTER_CONTRACT_ADDRESS,
  RPC_URL: () => RPC_URL,
  RegisterVerifierId: () => RegisterVerifierId,
  SBT_CONTRACT_ADDRESS: () => SBT_CONTRACT_ADDRESS,
  SignatureAlgorithmIndex: () => SignatureAlgorithmIndex,
  TREE_TRACKER_URL: () => TREE_TRACKER_URL,
  TREE_URL: () => TREE_URL,
  TREE_URL_STAGING: () => TREE_URL_STAGING,
  WS_DB_RELAYER: () => WS_DB_RELAYER,
  WS_DB_RELAYER_STAGING: () => WS_DB_RELAYER_STAGING,
  WS_RPC_URL_VC_AND_DISCLOSE: () => WS_RPC_URL_VC_AND_DISCLOSE,
  attributeToPosition: () => attributeToPosition,
  attributeToPosition_ID: () => attributeToPosition_ID,
  circuitNameFromMode: () => circuitNameFromMode,
  circuitToSelectorMode: () => circuitToSelectorMode,
  contribute_publicKey: () => contribute_publicKey,
  countryCodes: () => countryCodes,
  getCountryCode: () => getCountryCode,
  hashAlgos: () => hashAlgos,
  k_csca: () => k_csca,
  k_dsc: () => k_dsc,
  k_dsc_3072: () => k_dsc_3072,
  k_dsc_4096: () => k_dsc_4096,
  k_dsc_ecdsa: () => k_dsc_ecdsa,
  max_csca_bytes: () => max_csca_bytes,
  max_dsc_bytes: () => max_dsc_bytes,
  n_csca: () => n_csca,
  n_dsc: () => n_dsc,
  n_dsc_3072: () => n_dsc_3072,
  n_dsc_4096: () => n_dsc_4096,
  n_dsc_ecdsa: () => n_dsc_ecdsa,
  revealedDataTypes: () => revealedDataTypes,
  saltLengths: () => saltLengths
});
module.exports = __toCommonJS(constants_exports);
var API_URL = "https://api.self.xyz";
var API_URL_STAGING = "https://api.staging.self.xyz";
var CHAIN_NAME = "celo";
var CIRCUIT_CONSTANTS = {
  REGISTER_NULLIFIER_INDEX: 0,
  REGISTER_COMMITMENT_INDEX: 1,
  REGISTER_MERKLE_ROOT_INDEX: 2,
  DSC_TREE_LEAF_INDEX: 0,
  DSC_CSCA_ROOT_INDEX: 1,
  VC_AND_DISCLOSE_REVEALED_DATA_PACKED_INDEX: 0,
  VC_AND_DISCLOSE_FORBIDDEN_COUNTRIES_LIST_PACKED_INDEX: 3,
  VC_AND_DISCLOSE_NULLIFIER_INDEX: 7,
  VC_AND_DISCLOSE_ATTESTATION_ID_INDEX: 8,
  VC_AND_DISCLOSE_MERKLE_ROOT_INDEX: 9,
  VC_AND_DISCLOSE_CURRENT_DATE_INDEX: 10,
  VC_AND_DISCLOSE_PASSPORT_NO_SMT_ROOT_INDEX: 16,
  VC_AND_DISCLOSE_NAME_DOB_SMT_ROOT_INDEX: 17,
  VC_AND_DISCLOSE_NAME_YOB_SMT_ROOT_INDEX: 18,
  VC_AND_DISCLOSE_SCOPE_INDEX: 19,
  VC_AND_DISCLOSE_USER_IDENTIFIER_INDEX: 20
};
var CIRCUIT_TYPES = ["dsc", "register", "vc_and_disclose"];
var COMMITMENT_TREE_DEPTH = 33;
var CSCA_TREE_DEPTH = 12;
var CSCA_TREE_URL = "https://tree.self.xyz/csca";
var CSCA_TREE_URL_ID_CARD = "https://tree.self.xyz/csca-id";
var CSCA_TREE_URL_STAGING = "https://tree.staging.self.xyz/csca";
var CSCA_TREE_URL_STAGING_ID_CARD = "https://tree.staging.self.xyz/csca-id";
var DEFAULT_MAJORITY = "18";
var DEFAULT_RPC_URL = "https://mainnet.optimism.io";
var DEFAULT_USER_ID_TYPE = "uuid";
var DEVELOPMENT_MODE = true;
var DSC_TREE_DEPTH = 21;
var DSC_TREE_URL = "https://tree.self.xyz/dsc";
var DSC_TREE_URL_ID_CARD = "https://tree.self.xyz/dsc-id";
var DSC_TREE_URL_STAGING = "https://tree.staging.self.xyz/dsc";
var DSC_TREE_URL_STAGING_ID_CARD = "https://tree.staging.self.xyz/dsc-id";
var DscVerifierId = /* @__PURE__ */ ((DscVerifierId2) => {
  DscVerifierId2[DscVerifierId2["dsc_sha1_ecdsa_brainpoolP256r1"] = 0] = "dsc_sha1_ecdsa_brainpoolP256r1";
  DscVerifierId2[DscVerifierId2["dsc_sha1_rsa_65537_4096"] = 1] = "dsc_sha1_rsa_65537_4096";
  DscVerifierId2[DscVerifierId2["dsc_sha256_ecdsa_brainpoolP256r1"] = 2] = "dsc_sha256_ecdsa_brainpoolP256r1";
  DscVerifierId2[DscVerifierId2["dsc_sha256_ecdsa_brainpoolP384r1"] = 3] = "dsc_sha256_ecdsa_brainpoolP384r1";
  DscVerifierId2[DscVerifierId2["dsc_sha256_ecdsa_secp256r1"] = 4] = "dsc_sha256_ecdsa_secp256r1";
  DscVerifierId2[DscVerifierId2["dsc_sha256_ecdsa_secp384r1"] = 5] = "dsc_sha256_ecdsa_secp384r1";
  DscVerifierId2[DscVerifierId2["dsc_sha256_ecdsa_secp521r1"] = 6] = "dsc_sha256_ecdsa_secp521r1";
  DscVerifierId2[DscVerifierId2["dsc_sha256_rsa_65537_4096"] = 7] = "dsc_sha256_rsa_65537_4096";
  DscVerifierId2[DscVerifierId2["dsc_sha256_rsapss_3_32_3072"] = 8] = "dsc_sha256_rsapss_3_32_3072";
  DscVerifierId2[DscVerifierId2["dsc_sha256_rsapss_65537_32_3072"] = 9] = "dsc_sha256_rsapss_65537_32_3072";
  DscVerifierId2[DscVerifierId2["dsc_sha256_rsapss_65537_32_4096"] = 10] = "dsc_sha256_rsapss_65537_32_4096";
  DscVerifierId2[DscVerifierId2["dsc_sha384_ecdsa_brainpoolP384r1"] = 11] = "dsc_sha384_ecdsa_brainpoolP384r1";
  DscVerifierId2[DscVerifierId2["dsc_sha384_ecdsa_brainpoolP512r1"] = 12] = "dsc_sha384_ecdsa_brainpoolP512r1";
  DscVerifierId2[DscVerifierId2["dsc_sha384_ecdsa_secp384r1"] = 13] = "dsc_sha384_ecdsa_secp384r1";
  DscVerifierId2[DscVerifierId2["dsc_sha512_ecdsa_brainpoolP512r1"] = 14] = "dsc_sha512_ecdsa_brainpoolP512r1";
  DscVerifierId2[DscVerifierId2["dsc_sha512_ecdsa_secp521r1"] = 15] = "dsc_sha512_ecdsa_secp521r1";
  DscVerifierId2[DscVerifierId2["dsc_sha512_rsa_65537_4096"] = 16] = "dsc_sha512_rsa_65537_4096";
  DscVerifierId2[DscVerifierId2["dsc_sha512_rsapss_65537_64_4096"] = 17] = "dsc_sha512_rsapss_65537_64_4096";
  DscVerifierId2[DscVerifierId2["dsc_sha256_rsapss_3_32_4096"] = 18] = "dsc_sha256_rsapss_3_32_4096";
  DscVerifierId2[DscVerifierId2["dsc_sha1_ecdsa_secp256r1"] = 19] = "dsc_sha1_ecdsa_secp256r1";
  return DscVerifierId2;
})(DscVerifierId || {});
var ECDSA_K_LENGTH_FACTOR = 2;
var IDENTITY_TREE_URL = "https://tree.self.xyz/identity";
var IDENTITY_TREE_URL_ID_CARD = "https://tree.self.xyz/identity-id";
var IDENTITY_TREE_URL_STAGING = "https://tree.staging.self.xyz/identity";
var IDENTITY_TREE_URL_STAGING_ID_CARD = "https://tree.staging.self.xyz/identity-id";
var ID_CARD_ATTESTATION_ID = "2";
var MAX_BYTES_IN_FIELD = 31;
var MAX_CERT_BYTES = {
  rsa_sha256_65537_4096: 512,
  rsa_sha1_65537_4096: 640,
  rsapss_sha256_65537_2048: 640,
  rsapss_sha256_65537_3072: 640,
  rsapss_sha256_65537_4096: 768,
  rsapss_sha256_3_3072: 768,
  rsapss_sha256_3_4096: 768,
  rsapss_sha384_65537_3072: 768
};
var MAX_DATAHASHES_LEN = 320;
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
var MAX_PUBKEY_DSC_BYTES = 525;
var OFAC_TREE_LEVELS = 64;
var PASSPORT_ATTESTATION_ID = "1";
var PCR0_MANAGER_ADDRESS = "0xE36d4EE5Fd3916e703A46C21Bb3837dB7680C8B8";
var REDIRECT_URL = "https://redirect.self.xyz";
var REGISTER_CONTRACT_ADDRESS = "0x3F346FFdC5d583e4126AF01A02Ac5b9CdB3f1909";
var RPC_URL = "https://forno.celo.org";
var RegisterVerifierId = /* @__PURE__ */ ((RegisterVerifierId2) => {
  RegisterVerifierId2[RegisterVerifierId2["register_sha256_sha256_sha256_rsa_65537_4096"] = 0] = "register_sha256_sha256_sha256_rsa_65537_4096";
  RegisterVerifierId2[RegisterVerifierId2["register_sha256_sha256_sha256_ecdsa_brainpoolP384r1"] = 1] = "register_sha256_sha256_sha256_ecdsa_brainpoolP384r1";
  RegisterVerifierId2[RegisterVerifierId2["register_sha256_sha256_sha256_ecdsa_secp256r1"] = 2] = "register_sha256_sha256_sha256_ecdsa_secp256r1";
  RegisterVerifierId2[RegisterVerifierId2["register_sha256_sha256_sha256_ecdsa_secp384r1"] = 3] = "register_sha256_sha256_sha256_ecdsa_secp384r1";
  RegisterVerifierId2[RegisterVerifierId2["register_sha256_sha256_sha256_rsa_3_4096"] = 4] = "register_sha256_sha256_sha256_rsa_3_4096";
  RegisterVerifierId2[RegisterVerifierId2["register_sha256_sha256_sha256_rsapss_3_32_2048"] = 5] = "register_sha256_sha256_sha256_rsapss_3_32_2048";
  RegisterVerifierId2[RegisterVerifierId2["register_sha256_sha256_sha256_rsapss_65537_32_2048"] = 6] = "register_sha256_sha256_sha256_rsapss_65537_32_2048";
  RegisterVerifierId2[RegisterVerifierId2["register_sha256_sha256_sha256_rsapss_65537_32_3072"] = 7] = "register_sha256_sha256_sha256_rsapss_65537_32_3072";
  RegisterVerifierId2[RegisterVerifierId2["register_sha384_sha384_sha384_ecdsa_brainpoolP384r1"] = 8] = "register_sha384_sha384_sha384_ecdsa_brainpoolP384r1";
  RegisterVerifierId2[RegisterVerifierId2["register_sha384_sha384_sha384_ecdsa_brainpoolP512r1"] = 9] = "register_sha384_sha384_sha384_ecdsa_brainpoolP512r1";
  RegisterVerifierId2[RegisterVerifierId2["register_sha384_sha384_sha384_ecdsa_secp384r1"] = 10] = "register_sha384_sha384_sha384_ecdsa_secp384r1";
  RegisterVerifierId2[RegisterVerifierId2["register_sha512_sha512_sha512_ecdsa_brainpoolP512r1"] = 11] = "register_sha512_sha512_sha512_ecdsa_brainpoolP512r1";
  RegisterVerifierId2[RegisterVerifierId2["register_sha512_sha512_sha512_rsa_65537_4096"] = 12] = "register_sha512_sha512_sha512_rsa_65537_4096";
  RegisterVerifierId2[RegisterVerifierId2["register_sha512_sha512_sha512_rsapss_65537_64_2048"] = 13] = "register_sha512_sha512_sha512_rsapss_65537_64_2048";
  RegisterVerifierId2[RegisterVerifierId2["register_sha1_sha1_sha1_rsa_65537_4096"] = 14] = "register_sha1_sha1_sha1_rsa_65537_4096";
  RegisterVerifierId2[RegisterVerifierId2["register_sha1_sha256_sha256_rsa_65537_4096"] = 15] = "register_sha1_sha256_sha256_rsa_65537_4096";
  RegisterVerifierId2[RegisterVerifierId2["register_sha224_sha224_sha224_ecdsa_brainpoolP224r1"] = 16] = "register_sha224_sha224_sha224_ecdsa_brainpoolP224r1";
  RegisterVerifierId2[RegisterVerifierId2["register_sha256_sha224_sha224_ecdsa_secp224r1"] = 17] = "register_sha256_sha224_sha224_ecdsa_secp224r1";
  RegisterVerifierId2[RegisterVerifierId2["register_sha256_sha256_sha256_ecdsa_brainpoolP256r1"] = 18] = "register_sha256_sha256_sha256_ecdsa_brainpoolP256r1";
  RegisterVerifierId2[RegisterVerifierId2["register_sha1_sha1_sha1_ecdsa_brainpoolP224r1"] = 19] = "register_sha1_sha1_sha1_ecdsa_brainpoolP224r1";
  RegisterVerifierId2[RegisterVerifierId2["register_sha384_sha384_sha384_rsapss_65537_48_2048"] = 20] = "register_sha384_sha384_sha384_rsapss_65537_48_2048";
  RegisterVerifierId2[RegisterVerifierId2["register_sha1_sha1_sha1_ecdsa_secp256r1"] = 21] = "register_sha1_sha1_sha1_ecdsa_secp256r1";
  RegisterVerifierId2[RegisterVerifierId2["register_sha256_sha256_sha256_rsapss_65537_64_2048"] = 22] = "register_sha256_sha256_sha256_rsapss_65537_64_2048";
  RegisterVerifierId2[RegisterVerifierId2["register_sha512_sha512_sha256_rsa_65537_4096"] = 23] = "register_sha512_sha512_sha256_rsa_65537_4096";
  RegisterVerifierId2[RegisterVerifierId2["register_sha512_sha512_sha512_ecdsa_secp521r1"] = 24] = "register_sha512_sha512_sha512_ecdsa_secp521r1";
  RegisterVerifierId2[RegisterVerifierId2["register_id_sha256_sha256_sha256_rsa_65537_4096"] = 25] = "register_id_sha256_sha256_sha256_rsa_65537_4096";
  RegisterVerifierId2[RegisterVerifierId2["register_sha256_sha256_sha224_ecdsa_secp224r1"] = 26] = "register_sha256_sha256_sha224_ecdsa_secp224r1";
  RegisterVerifierId2[RegisterVerifierId2["register_id_sha1_sha1_sha1_ecdsa_brainpoolP224r1"] = 27] = "register_id_sha1_sha1_sha1_ecdsa_brainpoolP224r1";
  RegisterVerifierId2[RegisterVerifierId2["register_id_sha1_sha1_sha1_ecdsa_secp256r1"] = 28] = "register_id_sha1_sha1_sha1_ecdsa_secp256r1";
  RegisterVerifierId2[RegisterVerifierId2["register_id_sha1_sha1_sha1_rsa_65537_4096"] = 29] = "register_id_sha1_sha1_sha1_rsa_65537_4096";
  RegisterVerifierId2[RegisterVerifierId2["register_id_sha1_sha256_sha256_rsa_65537_4096"] = 30] = "register_id_sha1_sha256_sha256_rsa_65537_4096";
  RegisterVerifierId2[RegisterVerifierId2["register_id_sha224_sha224_sha224_ecdsa_brainpoolP224r1"] = 31] = "register_id_sha224_sha224_sha224_ecdsa_brainpoolP224r1";
  RegisterVerifierId2[RegisterVerifierId2["register_id_sha256_sha224_sha224_ecdsa_secp224r1"] = 32] = "register_id_sha256_sha224_sha224_ecdsa_secp224r1";
  RegisterVerifierId2[RegisterVerifierId2["register_id_sha256_sha256_sha224_ecdsa_secp224r1"] = 33] = "register_id_sha256_sha256_sha224_ecdsa_secp224r1";
  RegisterVerifierId2[RegisterVerifierId2["register_id_sha256_sha256_sha256_ecdsa_brainpoolP256r1"] = 34] = "register_id_sha256_sha256_sha256_ecdsa_brainpoolP256r1";
  RegisterVerifierId2[RegisterVerifierId2["register_id_sha256_sha256_sha256_ecdsa_brainpoolP384r1"] = 35] = "register_id_sha256_sha256_sha256_ecdsa_brainpoolP384r1";
  RegisterVerifierId2[RegisterVerifierId2["register_id_sha256_sha256_sha256_ecdsa_secp256r1"] = 36] = "register_id_sha256_sha256_sha256_ecdsa_secp256r1";
  RegisterVerifierId2[RegisterVerifierId2["register_id_sha256_sha256_sha256_ecdsa_secp384r1"] = 37] = "register_id_sha256_sha256_sha256_ecdsa_secp384r1";
  RegisterVerifierId2[RegisterVerifierId2["register_id_sha256_sha256_sha256_rsa_3_4096"] = 38] = "register_id_sha256_sha256_sha256_rsa_3_4096";
  RegisterVerifierId2[RegisterVerifierId2["register_id_sha256_sha256_sha256_rsapss_3_32_2048"] = 39] = "register_id_sha256_sha256_sha256_rsapss_3_32_2048";
  RegisterVerifierId2[RegisterVerifierId2["register_id_sha256_sha256_sha256_rsapss_65537_32_2048"] = 40] = "register_id_sha256_sha256_sha256_rsapss_65537_32_2048";
  RegisterVerifierId2[RegisterVerifierId2["register_id_sha256_sha256_sha256_rsapss_65537_32_3072"] = 41] = "register_id_sha256_sha256_sha256_rsapss_65537_32_3072";
  RegisterVerifierId2[RegisterVerifierId2["register_id_sha256_sha256_sha256_rsapss_65537_64_2048"] = 42] = "register_id_sha256_sha256_sha256_rsapss_65537_64_2048";
  RegisterVerifierId2[RegisterVerifierId2["register_id_sha384_sha384_sha384_ecdsa_brainpoolP384r1"] = 43] = "register_id_sha384_sha384_sha384_ecdsa_brainpoolP384r1";
  RegisterVerifierId2[RegisterVerifierId2["register_id_sha384_sha384_sha384_ecdsa_brainpoolP512r1"] = 44] = "register_id_sha384_sha384_sha384_ecdsa_brainpoolP512r1";
  RegisterVerifierId2[RegisterVerifierId2["register_id_sha384_sha384_sha384_ecdsa_secp384r1"] = 45] = "register_id_sha384_sha384_sha384_ecdsa_secp384r1";
  RegisterVerifierId2[RegisterVerifierId2["register_id_sha384_sha384_sha384_rsapss_65537_48_2048"] = 46] = "register_id_sha384_sha384_sha384_rsapss_65537_48_2048";
  RegisterVerifierId2[RegisterVerifierId2["register_id_sha512_sha512_sha256_rsa_65537_4096"] = 47] = "register_id_sha512_sha512_sha256_rsa_65537_4096";
  RegisterVerifierId2[RegisterVerifierId2["register_id_sha512_sha512_sha512_ecdsa_brainpoolP512r1"] = 48] = "register_id_sha512_sha512_sha512_ecdsa_brainpoolP512r1";
  RegisterVerifierId2[RegisterVerifierId2["register_id_sha512_sha512_sha512_ecdsa_secp521r1"] = 49] = "register_id_sha512_sha512_sha512_ecdsa_secp521r1";
  RegisterVerifierId2[RegisterVerifierId2["register_id_sha512_sha512_sha512_rsa_65537_4096"] = 50] = "register_id_sha512_sha512_sha512_rsa_65537_4096";
  RegisterVerifierId2[RegisterVerifierId2["register_id_sha512_sha512_sha512_rsapss_65537_64_2048"] = 51] = "register_id_sha512_sha512_sha512_rsapss_65537_64_2048";
  return RegisterVerifierId2;
})(RegisterVerifierId || {});
var SBT_CONTRACT_ADDRESS = "0x601Fd54FD11C5E77DE84d877e55B829aff20f0A6";
var SignatureAlgorithmIndex = /* @__PURE__ */ ((SignatureAlgorithmIndex2) => {
  SignatureAlgorithmIndex2[SignatureAlgorithmIndex2["rsa_sha256_65537_2048"] = 1] = "rsa_sha256_65537_2048";
  SignatureAlgorithmIndex2[SignatureAlgorithmIndex2["rsa_sha1_65537_2048"] = 3] = "rsa_sha1_65537_2048";
  SignatureAlgorithmIndex2[SignatureAlgorithmIndex2["rsapss_sha256_65537_2048"] = 4] = "rsapss_sha256_65537_2048";
  SignatureAlgorithmIndex2[SignatureAlgorithmIndex2["ecdsa_sha1_secp256r1_256"] = 7] = "ecdsa_sha1_secp256r1_256";
  SignatureAlgorithmIndex2[SignatureAlgorithmIndex2["ecdsa_sha256_secp256r1_256"] = 8] = "ecdsa_sha256_secp256r1_256";
  SignatureAlgorithmIndex2[SignatureAlgorithmIndex2["ecdsa_sha384_secp384r1_384"] = 9] = "ecdsa_sha384_secp384r1_384";
  SignatureAlgorithmIndex2[SignatureAlgorithmIndex2["rsa_sha256_65537_4096"] = 10] = "rsa_sha256_65537_4096";
  SignatureAlgorithmIndex2[SignatureAlgorithmIndex2["rsa_sha1_65537_4096"] = 11] = "rsa_sha1_65537_4096";
  SignatureAlgorithmIndex2[SignatureAlgorithmIndex2["rsapss_sha256_65537_4096"] = 12] = "rsapss_sha256_65537_4096";
  SignatureAlgorithmIndex2[SignatureAlgorithmIndex2["rsa_sha256_3_2048"] = 13] = "rsa_sha256_3_2048";
  SignatureAlgorithmIndex2[SignatureAlgorithmIndex2["rsa_sha256_65537_3072"] = 14] = "rsa_sha256_65537_3072";
  SignatureAlgorithmIndex2[SignatureAlgorithmIndex2["rsa_sha512_65537_4096"] = 15] = "rsa_sha512_65537_4096";
  SignatureAlgorithmIndex2[SignatureAlgorithmIndex2["rsapss_sha256_3_3072"] = 16] = "rsapss_sha256_3_3072";
  SignatureAlgorithmIndex2[SignatureAlgorithmIndex2["rsapss_sha256_3_4096"] = 17] = "rsapss_sha256_3_4096";
  SignatureAlgorithmIndex2[SignatureAlgorithmIndex2["rsapss_sha384_65537_3072"] = 18] = "rsapss_sha384_65537_3072";
  SignatureAlgorithmIndex2[SignatureAlgorithmIndex2["rsapss_sha256_65537_3072"] = 19] = "rsapss_sha256_65537_3072";
  SignatureAlgorithmIndex2[SignatureAlgorithmIndex2["ecdsa_sha256_brainpoolP256r1_256"] = 21] = "ecdsa_sha256_brainpoolP256r1_256";
  SignatureAlgorithmIndex2[SignatureAlgorithmIndex2["ecdsa_sha384_brainpoolP384r1_384"] = 22] = "ecdsa_sha384_brainpoolP384r1_384";
  SignatureAlgorithmIndex2[SignatureAlgorithmIndex2["ecdsa_sha256_secp384r1_384"] = 23] = "ecdsa_sha256_secp384r1_384";
  SignatureAlgorithmIndex2[SignatureAlgorithmIndex2["ecdsa_sha384_brainpoolP256r1_256"] = 24] = "ecdsa_sha384_brainpoolP256r1_256";
  SignatureAlgorithmIndex2[SignatureAlgorithmIndex2["ecdsa_sha512_brainpoolP256r1_256"] = 25] = "ecdsa_sha512_brainpoolP256r1_256";
  SignatureAlgorithmIndex2[SignatureAlgorithmIndex2["ecdsa_sha512_brainpoolP384r1_384"] = 26] = "ecdsa_sha512_brainpoolP384r1_384";
  SignatureAlgorithmIndex2[SignatureAlgorithmIndex2["ecdsa_sha1_brainpoolP224r1_224"] = 27] = "ecdsa_sha1_brainpoolP224r1_224";
  SignatureAlgorithmIndex2[SignatureAlgorithmIndex2["ecdsa_sha256_brainpoolP224r1_224"] = 28] = "ecdsa_sha256_brainpoolP224r1_224";
  SignatureAlgorithmIndex2[SignatureAlgorithmIndex2["ecdsa_sha512_brainpoolP512r1_512"] = 29] = "ecdsa_sha512_brainpoolP512r1_512";
  SignatureAlgorithmIndex2[SignatureAlgorithmIndex2["ecdsa_sha224_brainpoolP224r1_224"] = 30] = "ecdsa_sha224_brainpoolP224r1_224";
  SignatureAlgorithmIndex2[SignatureAlgorithmIndex2["rsa_sha256_3_4096"] = 32] = "rsa_sha256_3_4096";
  SignatureAlgorithmIndex2[SignatureAlgorithmIndex2["rsa_sha1_3_4096"] = 33] = "rsa_sha1_3_4096";
  SignatureAlgorithmIndex2[SignatureAlgorithmIndex2["rsa_sha384_65537_4096"] = 34] = "rsa_sha384_65537_4096";
  SignatureAlgorithmIndex2[SignatureAlgorithmIndex2["rsapss_sha384_65537_4096"] = 35] = "rsapss_sha384_65537_4096";
  SignatureAlgorithmIndex2[SignatureAlgorithmIndex2["ecdsa_sha1_brainpoolP256r1_256"] = 36] = "ecdsa_sha1_brainpoolP256r1_256";
  SignatureAlgorithmIndex2[SignatureAlgorithmIndex2["ecdsa_sha512_secp521r1_521"] = 41] = "ecdsa_sha512_secp521r1_521";
  return SignatureAlgorithmIndex2;
})(SignatureAlgorithmIndex || {});
var TREE_TRACKER_URL = "https://tree.self.xyz";
var TREE_URL = "https://tree.self.xyz";
var TREE_URL_STAGING = "https://tree.staging.self.xyz";
var WS_DB_RELAYER = "wss://websocket.self.xyz";
var WS_DB_RELAYER_STAGING = "wss://websocket.staging.self.xyz";
var WS_RPC_URL_VC_AND_DISCLOSE = "ws://disclose.proving.self.xyz:8888/";
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
var circuitNameFromMode = {
  prove: "prove",
  prove_onchain: "prove",
  prove_offchain: "prove",
  register: "prove",
  vc_and_disclose: "vc_and_disclose",
  dsc: "dsc"
};
var circuitToSelectorMode = {
  register: [0, 0],
  prove_onchain: [1, 0],
  prove_offchain: [1, 1]
};
var contribute_publicKey = `-----BEGIN RSA PUBLIC KEY-----
MIICCgKCAgEAv/hm7FZZ2KBmaeDHmLoRwuWmCcNKT561RqbsW8ZuYSyPWJUldE9U
Cf0lW3K1H5lsSDkl0Cq84cooL9f6X59Mffb/N24ZKTdL0xdcPwjk4LbcrVm8qubL
0a/4uCNoZZ1my4nxbpLxYtbr8CNmUGvBOVKf8IcjsY6VghIZrO63G6BN/G44su1Z
WcHpboGt9SDQK4enCyKxnCD+PbDYlewSA0n3GRajFfZex1bj1EvrS2hTLv8oNH5e
9H+3TUke0uO6Ttl0bZepoMmPlpAXhJByISqC6SLth4WFIH+G1I/xt9AEM7hOfLMl
KQv/3wlLEgEueRryKAHB2tqkaDKVJyw+tOyWj2iWA+nVgQKAxO4hOw01ljyVbcx6
KboXwnamlZPFIx4tjEaZ+ClXCFqvXhE9LDFK11QsYzJZl0aRVfTNqcurhEt7SK0f
qzOBhID0Nxk4k9sW1uT6ocW1xp1SB2WotORssOKIAOLJM8IbPl6n/DkYNcfvyXI7
4BlUrf6M2DgZMYATabIy94AvopHJOyiRfh4NpQPDntWnShiI1em2MmtXiWFCdVFV
6/QfJTKVixJpVfDh386ALXc97EPWDMWIalUwYoV/eRSMnuV8nZ0+Ctp3Qrtk/JYd
+FWhKbtlPeRjmGVr6mVlvDJ7KqtY5/RqqwfWeXhXezGhQqQ/OoQQCRkCAwEAAQ==
-----END RSA PUBLIC KEY-----`;
var countryCodes = {
  AFG: "Afghanistan",
  ALA: "Aland Islands",
  ALB: "Albania",
  DZA: "Algeria",
  ASM: "American Samoa",
  AND: "Andorra",
  AGO: "Angola",
  AIA: "Anguilla",
  ATA: "Antarctica",
  ATG: "Antigua and Barbuda",
  ARG: "Argentina",
  ARM: "Armenia",
  ABW: "Aruba",
  AUS: "Australia",
  AUT: "Austria",
  AZE: "Azerbaijan",
  BHS: "Bahamas",
  BHR: "Bahrain",
  BGD: "Bangladesh",
  BRB: "Barbados",
  BLR: "Belarus",
  BEL: "Belgium",
  BLZ: "Belize",
  BEN: "Benin",
  BMU: "Bermuda",
  BTN: "Bhutan",
  BOL: "Bolivia (Plurinational State of)",
  BES: "Bonaire, Sint Eustatius and Saba",
  BIH: "Bosnia and Herzegovina",
  BWA: "Botswana",
  BVT: "Bouvet Island",
  BRA: "Brazil",
  IOT: "British Indian Ocean Territory",
  BRN: "Brunei Darussalam",
  BGR: "Bulgaria",
  BFA: "Burkina Faso",
  BDI: "Burundi",
  CPV: "Cabo Verde",
  KHM: "Cambodia",
  CMR: "Cameroon",
  CAN: "Canada",
  CYM: "Cayman Islands",
  CAF: "Central African Republic",
  TCD: "Chad",
  CHL: "Chile",
  CHN: "China",
  CXR: "Christmas Island",
  CCK: "Cocos (Keeling) Islands",
  COL: "Colombia",
  COM: "Comoros",
  COG: "Congo",
  COD: "Congo, Democratic Republic of the",
  COK: "Cook Islands",
  CRI: "Costa Rica",
  CIV: "Cote d'Ivoire",
  HRV: "Croatia",
  CUB: "Cuba",
  CUW: "Curacao",
  CYP: "Cyprus",
  CZE: "Czechia",
  DNK: "Denmark",
  DJI: "Djibouti",
  DMA: "Dominica",
  DOM: "Dominican Republic",
  ECU: "Ecuador",
  EGY: "Egypt",
  SLV: "El Salvador",
  GNQ: "Equatorial Guinea",
  ERI: "Eritrea",
  EST: "Estonia",
  SWZ: "Eswatini",
  ETH: "Ethiopia",
  FLK: "Falkland Islands (Malvinas)",
  FRO: "Faroe Islands",
  FJI: "Fiji",
  FIN: "Finland",
  FRA: "France",
  GUF: "French Guiana",
  PYF: "French Polynesia",
  ATF: "French Southern Territories",
  GAB: "Gabon",
  GMB: "Gambia",
  GEO: "Georgia",
  DEU: "Germany",
  "D<<": "Germany",
  // Bundesrepublik Deutschland uses this in passports instead of DEU
  GHA: "Ghana",
  GIB: "Gibraltar",
  GRC: "Greece",
  GRL: "Greenland",
  GRD: "Grenada",
  GLP: "Guadeloupe",
  GUM: "Guam",
  GTM: "Guatemala",
  GGY: "Guernsey",
  GIN: "Guinea",
  GNB: "Guinea-Bissau",
  GUY: "Guyana",
  HTI: "Haiti",
  HMD: "Heard Island and McDonald Islands",
  VAT: "Holy See",
  HND: "Honduras",
  HKG: "Hong Kong",
  HUN: "Hungary",
  ISL: "Iceland",
  IND: "India",
  IDN: "Indonesia",
  IRN: "Iran (Islamic Republic of)",
  IRQ: "Iraq",
  IRL: "Ireland",
  IMN: "Isle of Man",
  ISR: "Israel",
  ITA: "Italy",
  JAM: "Jamaica",
  JPN: "Japan",
  JEY: "Jersey",
  JOR: "Jordan",
  KAZ: "Kazakhstan",
  KEN: "Kenya",
  KIR: "Kiribati",
  PRK: "Korea (Democratic People's Republic of)",
  KOR: "Korea, Republic of",
  KWT: "Kuwait",
  KGZ: "Kyrgyzstan",
  LAO: "Lao People's Democratic Republic",
  LVA: "Latvia",
  LBN: "Lebanon",
  LSO: "Lesotho",
  LBR: "Liberia",
  LBY: "Libya",
  LIE: "Liechtenstein",
  LTU: "Lithuania",
  LUX: "Luxembourg",
  MAC: "Macao",
  MDG: "Madagascar",
  MWI: "Malawi",
  MYS: "Malaysia",
  MDV: "Maldives",
  MLI: "Mali",
  MLT: "Malta",
  MHL: "Marshall Islands",
  MTQ: "Martinique",
  MRT: "Mauritania",
  MUS: "Mauritius",
  MYT: "Mayotte",
  MEX: "Mexico",
  FSM: "Micronesia (Federated States of)",
  MDA: "Moldova, Republic of",
  MCO: "Monaco",
  MNG: "Mongolia",
  MNE: "Montenegro",
  MSR: "Montserrat",
  MAR: "Morocco",
  MOZ: "Mozambique",
  MMR: "Myanmar",
  NAM: "Namibia",
  NRU: "Nauru",
  NPL: "Nepal",
  NLD: "Netherlands",
  NCL: "New Caledonia",
  NZL: "New Zealand",
  NIC: "Nicaragua",
  NER: "Niger",
  NGA: "Nigeria",
  NIU: "Niue",
  NFK: "Norfolk Island",
  MKD: "North Macedonia",
  MNP: "Northern Mariana Islands",
  NOR: "Norway",
  OMN: "Oman",
  PAK: "Pakistan",
  PLW: "Palau",
  PSE: "Palestine, State of",
  PAN: "Panama",
  PNG: "Papua New Guinea",
  PRY: "Paraguay",
  PER: "Peru",
  PHL: "Philippines",
  PCN: "Pitcairn",
  POL: "Poland",
  PRT: "Portugal",
  PRI: "Puerto Rico",
  QAT: "Qatar",
  REU: "Reunion",
  ROU: "Romania",
  RUS: "Russian Federation",
  RWA: "Rwanda",
  BLM: "Saint Barthelemy",
  SHN: "Saint Helena, Ascension and Tristan da Cunha",
  KNA: "Saint Kitts and Nevis",
  LCA: "Saint Lucia",
  MAF: "Saint Martin (French part)",
  SPM: "Saint Pierre and Miquelon",
  VCT: "Saint Vincent and the Grenadines",
  WSM: "Samoa",
  SMR: "San Marino",
  STP: "Sao Tome and Principe",
  SAU: "Saudi Arabia",
  SEN: "Senegal",
  SRB: "Serbia",
  SYC: "Seychelles",
  SLE: "Sierra Leone",
  SGP: "Singapore",
  SXM: "Sint Maarten (Dutch part)",
  SVK: "Slovakia",
  SVN: "Slovenia",
  SLB: "Solomon Islands",
  SOM: "Somalia",
  ZAF: "South Africa",
  SGS: "South Georgia and the South Sandwich Islands",
  SSD: "South Sudan",
  ESP: "Spain",
  LKA: "Sri Lanka",
  SDN: "Sudan",
  SUR: "Suriname",
  SJM: "Svalbard and Jan Mayen",
  SWE: "Sweden",
  CHE: "Switzerland",
  SYR: "Syrian Arab Republic",
  TWN: "Taiwan, Province of China",
  TJK: "Tajikistan",
  TZA: "Tanzania, United Republic of",
  THA: "Thailand",
  TLS: "Timor-Leste",
  TGO: "Togo",
  TKL: "Tokelau",
  TON: "Tonga",
  TTO: "Trinidad and Tobago",
  TUN: "Tunisia",
  TUR: "Turkey",
  TKM: "Turkmenistan",
  TCA: "Turks and Caicos Islands",
  TUV: "Tuvalu",
  UGA: "Uganda",
  UKR: "Ukraine",
  ARE: "United Arab Emirates",
  GBR: "United Kingdom of Great Britain and Northern Ireland",
  USA: "United States of America",
  UMI: "United States Minor Outlying Islands",
  URY: "Uruguay",
  UZB: "Uzbekistan",
  VUT: "Vanuatu",
  VEN: "Venezuela (Bolivarian Republic of)",
  VNM: "Viet Nam",
  VGB: "Virgin Islands (British)",
  VIR: "Virgin Islands (U.S.)",
  WLF: "Wallis and Futuna",
  ESH: "Western Sahara",
  YEM: "Yemen",
  ZMB: "Zambia",
  ZWE: "Zimbabwe"
};
function getCountryCode(countryName) {
  const entries = Object.entries(countryCodes);
  const found = entries.find(([_, name]) => name.toLowerCase() === countryName.toLowerCase());
  return found ? found[0] : "undefined";
}
var hashAlgos = ["sha512", "sha384", "sha256", "sha224", "sha1"];
var k_csca = 35;
var k_dsc = 35;
var k_dsc_3072 = 35;
var k_dsc_4096 = 35;
var k_dsc_ecdsa = 4;
var max_csca_bytes = 1792;
var max_dsc_bytes = 1792;
var n_csca = 120;
var n_dsc = 120;
var n_dsc_3072 = 120;
var n_dsc_4096 = 120;
var n_dsc_ecdsa = 64;
var revealedDataTypes = {
  issuing_state: 0,
  name: 1,
  passport_number: 2,
  nationality: 3,
  date_of_birth: 4,
  gender: 5,
  expiry_date: 6,
  older_than: 7,
  passport_no_ofac: 8,
  name_and_dob_ofac: 9,
  name_and_yob_ofac: 10
};
var saltLengths = [64, 48, 32];
//# sourceMappingURL=constants.cjs.map