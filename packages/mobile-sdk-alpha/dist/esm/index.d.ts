import { S as SdkError, a as ScreenProps, E as ExternalAdapter, D as DocumentData, P as PassportCameraProps, C as Config, A as Adapters } from './shims-Dytd_Bvp.js';
export { b as ClockAdapter, c as CryptoAdapter, t as DG1, u as DG2, x as DocumentMetadata, H as HttpAdapter, L as LogLevel, d as LoggerAdapter, M as MRZInfo, y as MRZScanOptions, e as MRZValidation, v as NFCScanOptions, N as NetworkAdapter, w as ParsedNFCResponse, z as PassportValidationCallbacks, f as Progress, g as ProofHandle, h as ProofRequest, Q as QRProofOptions, R as RegistrationInput, i as RegistrationStatus, F as SCANNER_ERROR_CODES, j as SDKEvent, k as SDKEventMap, l as ScanMode, m as ScanOpts, n as ScanResult, o as ScannerAdapter, B as SdkErrorCategory, p as SelfClient, J as SelfClientContext, K as SelfClientProvider, q as StorageAdapter, U as Unsubscribe, V as ValidationInput, r as ValidationResult, W as WsAdapter, s as WsConn, T as createSelfClient, X as defaultConfig, Y as extractMRZInfo, Z as formatDateToYYMMDD, $ as isPassportDataValid, a0 as mergeConfig, G as notImplemented, a1 as parseNFCResponse, _ as scanMRZ, a2 as scanNFC, a3 as scanQRProof, I as sdkError, O as useSelfClient, a4 as webScannerShim } from './shims-Dytd_Bvp.js';
import * as react_jsx_runtime from 'react/jsx-runtime';
import * as react from 'react';
import { ComponentType, ReactNode } from 'react';
import '@selfxyz/common/utils/types';
import '@selfxyz/common';

/**
 * Error thrown when the SDK fails to initialize correctly.
 *
 * @param message - description of the initialization failure.
 * @param options - optional underlying error details.
 */
declare class InitError extends SdkError {
    constructor(message: string, options?: {
        cause?: unknown;
    });
}

/**
 * Error thrown when liveness checks detect an issue.
 *
 * @param message - description of the liveness failure.
 * @param options - optional underlying error details.
 */
declare class LivenessError extends SdkError {
    constructor(message: string, options?: {
        cause?: unknown;
    });
}

/**
 * Error thrown when an MRZ string fails validation or parsing.
 *
 * @param message - description of the MRZ parsing failure.
 * @param options - optional underlying error details.
 */
declare class MrzParseError extends SdkError {
    constructor(message: string, options?: {
        cause?: unknown;
    });
}

/**
 * Error thrown when NFC data cannot be parsed.
 *
 * @param message - description of the parsing failure.
 * @param options - optional underlying error details.
 */
declare class NfcParseError extends SdkError {
    constructor(message: string, options?: {
        cause?: unknown;
    });
}

declare const NFCScannerScreen: ({ onSuccess, onFailure }: ScreenProps) => react_jsx_runtime.JSX.Element;

interface OnboardingFlowProps {
    external: ExternalAdapter;
    setDocument: (doc: DocumentData, documentId: string) => Promise<boolean>;
    PassportCamera?: ComponentType<PassportCameraProps>;
    NFCScanner?: ComponentType<ScreenProps>;
}
declare const OnboardingFlow: ({ external, setDocument, PassportCamera, NFCScanner }: OnboardingFlowProps) => react_jsx_runtime.JSX.Element;

declare const PassportCameraScreen: ({ onMRZDetected }: PassportCameraProps) => react_jsx_runtime.JSX.Element;

declare const QRCodeScreen: ({ onSuccess, onFailure }: ScreenProps) => react_jsx_runtime.JSX.Element;

interface SelfMobileSdkProps {
    config: Config;
    adapters?: Partial<Adapters>;
    children?: ReactNode;
}
declare const SelfMobileSdk: ({ config, adapters, children }: SelfMobileSdkProps) => react_jsx_runtime.JSX.Element;

declare const useDocumentManager: (external: ExternalAdapter) => {
    documents: {
        [documentId: string]: DocumentData;
    };
    isLoading: boolean;
    hasRegisteredDocuments: () => boolean;
    setDocuments: react.Dispatch<react.SetStateAction<{
        [documentId: string]: DocumentData;
    }>>;
};

export { Adapters, Config, DocumentData, ExternalAdapter, InitError, LivenessError, MrzParseError, NFCScannerScreen, NfcParseError, OnboardingFlow, PassportCameraProps, PassportCameraScreen, QRCodeScreen, ScreenProps, SdkError, SelfMobileSdk, useDocumentManager };
