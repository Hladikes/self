import { C as Config, A as Adapters, E as ExternalAdapter, P as PassportCameraProps, a as ScreenProps } from './shims-Dytd_Bvp.js';
export { b as ClockAdapter, c as CryptoAdapter, t as DG1, u as DG2, H as HttpAdapter, L as LogLevel, d as LoggerAdapter, M as MRZInfo, y as MRZScanOptions, e as MRZValidation, v as NFCScanOptions, N as NetworkAdapter, w as ParsedNFCResponse, z as PassportValidationCallbacks, f as Progress, g as ProofHandle, h as ProofRequest, Q as QRProofOptions, R as RegistrationInput, i as RegistrationStatus, F as SCANNER_ERROR_CODES, j as SDKEvent, k as SDKEventMap, l as ScanMode, m as ScanOpts, n as ScanResult, o as ScannerAdapter, B as SdkErrorCategory, p as SelfClient, J as SelfClientContext, K as SelfClientProvider, q as StorageAdapter, U as Unsubscribe, V as ValidationInput, r as ValidationResult, W as WsAdapter, s as WsConn, T as createSelfClient, X as defaultConfig, Y as extractMRZInfo, Z as formatDateToYYMMDD, $ as isPassportDataValid, a0 as mergeConfig, G as notImplemented, a1 as parseNFCResponse, _ as scanMRZ, a2 as scanNFC, a3 as scanQRProof, I as sdkError, O as useSelfClient, a4 as webScannerShim } from './shims-Dytd_Bvp.js';
import * as react_jsx_runtime from 'react/jsx-runtime';
import { ReactNode, ComponentType } from 'react';
import '@selfxyz/common/utils/types';
import '@selfxyz/common';

interface SelfMobileSdkProps {
    config: Config;
    adapters?: Partial<Adapters>;
    external: ExternalAdapter;
    children?: ReactNode;
    customScreens?: {
        PassportCamera?: ComponentType<PassportCameraProps>;
        NFCScanner?: ComponentType<ScreenProps>;
        QRScanner?: ReactNode;
    };
}
declare const SelfMobileSdk: ({ config, adapters, external, children, customScreens }: SelfMobileSdkProps) => react_jsx_runtime.JSX.Element;

export { Adapters, Config, SelfMobileSdk as SelfMobileSdkHighLevel };
