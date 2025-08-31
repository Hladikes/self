import { PassportData } from '@selfxyz/common/utils/types';
import { PassportData as PassportData$1, DocumentCategory } from '@selfxyz/common';
import * as react_jsx_runtime from 'react/jsx-runtime';
import * as react from 'react';
import { PropsWithChildren } from 'react';

/**
 * Callbacks fired for specific passport validation failures.
 */
interface PassportValidationCallbacks {
    /** No passport data was supplied. */
    onPassportDataNull?: () => void;
    /** Passport data lacked required metadata. */
    onPassportMetadataNull?: (data: PassportData) => void;
    /** DG1 hash function was missing from metadata. */
    onDg1HashFunctionNull?: (data: PassportData) => void;
    /** EContent hash function was missing from metadata. */
    onEContentHashFunctionNull?: (data: PassportData) => void;
    /** Signed attribute hash function was missing from metadata. */
    onSignedAttrHashFunctionNull?: (data: PassportData) => void;
    /** Calculated DG1 hash didn't match the supplied value. */
    onDg1HashMismatch?: (data: PassportData) => void;
    /** An unsupported hash algorithm was supplied in metadata. */
    onUnsupportedHashAlgorithm?: (field: 'dg1' | 'eContent' | 'signedAttr', value: string, data: PassportData) => void;
    /** DG1 hash missing or empty; nothing to validate against. */
    onDg1HashMissing?: (data: PassportData) => void;
}
/**
 * Validates passport data by ensuring required metadata and hash values match.
 * Invokes per-error callbacks when validation fails.
 *
 * @param passportData - Parsed passport data to validate.
 * @param callbacks - Optional hooks for tracking validation errors.
 * @returns Whether the passport data passed all validation checks.
 */
declare function isPassportDataValid(passportData: PassportData | undefined, callbacks?: PassportValidationCallbacks): boolean;

interface Config {
    endpoints?: {
        api?: string;
        teeWs?: string;
        artifactsCdn?: string;
    };
    timeouts?: {
        httpMs?: number;
        wsMs?: number;
        scanMs?: number;
        proofMs?: number;
    };
    features?: Record<string, boolean>;
    tlsPinning?: {
        enabled: boolean;
        pins?: string[];
    };
}
interface CryptoAdapter {
    hash(input: Uint8Array, algo?: 'sha256'): Promise<Uint8Array>;
    sign(data: Uint8Array, keyRef: string): Promise<Uint8Array>;
}
interface HttpAdapter {
    fetch(input: RequestInfo, init?: RequestInit): Promise<Response>;
}
interface MRZInfo {
    passportNumber: string;
    dateOfBirth: string;
    dateOfExpiry: string;
    surname: string;
    givenNames: string;
    sex: string;
    nationality: string;
    issuingCountry: string;
    documentType: string;
    validation: MRZValidation;
}
interface ClockAdapter {
    now(): number;
    sleep(ms: number, signal?: AbortSignal): Promise<void>;
}
interface MRZValidation {
    format: boolean;
    passportNumberChecksum: boolean;
    dateOfBirthChecksum: boolean;
    dateOfExpiryChecksum: boolean;
    compositeChecksum: boolean;
    overall: boolean;
}
type LogLevel = 'debug' | 'info' | 'warn' | 'error';
interface Progress {
    step: string;
    percent?: number;
}
interface Adapters {
    storage: StorageAdapter;
    scanner: ScannerAdapter;
    crypto: CryptoAdapter;
    network: NetworkAdapter;
    clock: ClockAdapter;
    logger: LoggerAdapter;
}
interface ProofHandle {
    id: string;
    status: 'pending' | 'completed' | 'failed';
    result: () => Promise<{
        ok: boolean;
        reason?: string;
    }>;
    cancel: () => void;
}
interface LoggerAdapter {
    log(level: LogLevel, message: string, fields?: Record<string, unknown>): void;
}
interface ProofRequest {
    type: 'register' | 'dsc' | 'disclose';
    payload: unknown;
}
interface NetworkAdapter {
    http: HttpAdapter;
    ws: WsAdapter;
}
interface RegistrationInput {
    docId?: string;
    scan: ScanResult;
}
interface RegistrationStatus {
    registered: boolean;
    reason?: string;
}
interface SDKEventMap {
    progress: Progress;
    state: string;
    error: Error;
}
type SDKEvent = keyof SDKEventMap;
type ScanMode = 'mrz' | 'nfc' | 'qr';
interface ScanOpts {
    mode: ScanMode;
}
type ScanResult = {
    mode: 'mrz';
    passportNumber: string;
    dateOfBirth: string;
    dateOfExpiry: string;
    issuingCountry?: string;
    mrzInfo?: MRZInfo;
} | {
    mode: 'nfc';
    raw: unknown;
} | {
    mode: 'qr';
    data: string;
};
interface ScannerAdapter {
    scan(opts: ScanOpts & {
        signal?: AbortSignal;
    }): Promise<ScanResult>;
}
interface SelfClient {
    scanDocument(opts: ScanOpts & {
        signal?: AbortSignal;
    }): Promise<ScanResult>;
    validateDocument(input: ValidationInput): Promise<ValidationResult>;
    checkRegistration(input: RegistrationInput): Promise<RegistrationStatus>;
    registerDocument(input: RegistrationInput): Promise<RegistrationStatus>;
    generateProof(req: ProofRequest, opts?: {
        signal?: AbortSignal;
        onProgress?: (p: Progress) => void;
        timeoutMs?: number;
    }): Promise<ProofHandle>;
    extractMRZInfo(mrz: string): MRZInfo;
    on<E extends SDKEvent>(event: E, cb: (payload: SDKEventMap[E]) => void): Unsubscribe;
    emit<E extends SDKEvent>(event: E, payload: SDKEventMap[E]): void;
}
type Unsubscribe = () => void;
interface StorageAdapter {
    get(key: string): Promise<string | null>;
    set(key: string, value: string): Promise<void>;
    remove(key: string): Promise<void>;
}
interface ValidationInput {
    scan: ScanResult;
}
interface ValidationResult {
    ok: boolean;
    reason?: string;
}
interface WsAdapter {
    connect(url: string, opts?: {
        signal?: AbortSignal;
        headers?: Record<string, string>;
    }): WsConn;
}
interface WsConn {
    send: (data: string | ArrayBufferView | ArrayBuffer) => void;
    close: () => void;
    onMessage: (cb: (data: any) => void) => void;
    onError: (cb: (e: any) => void) => void;
    onClose: (cb: () => void) => void;
}

interface DG1 {
    mrz: string;
}
interface DG2 {
    image: Uint8Array;
}
interface ParsedNFCResponse {
    dg1?: DG1;
    dg2?: DG2;
}
/**
 * Parse raw NFC chip bytes into DG1/DG2 structures.
 */
declare function parseNFCResponse(bytes: Uint8Array): ParsedNFCResponse;

/**
 * Options for NFC scanning.
 * Reserved for future use; currently no options are accepted.
 */
type NFCScanOptions = Record<string, never>;

/**
 * Scan NFC chip on a passport or ID card.
 * @param _opts NFC scanning options (currently unused)
 * @returns Promise resolving to scan result
 */
declare function scanNFC(_opts: NFCScanOptions): Promise<ScanResult>;

/**
 * Document metadata - must NOT contain plaintext MRZ/PII
 * All sensitive payloads belong only in DocumentData.data (typed as PassportData)
 * or in encrypted storage referenced by the opaque token
 */
interface DocumentMetadata {
    id: string;
    documentType: string;
    documentCategory: DocumentCategory;
    encryptedBlobRef?: string;
    mock: boolean;
    isRegistered?: boolean;
}
interface DocumentData {
    data: PassportData$1;
    metadata: DocumentMetadata;
}
interface ExternalAdapter {
    getSecret: () => Promise<string>;
    getAllDocuments: () => Promise<{
        [documentId: string]: DocumentData;
    }>;
    setDocument: (doc: DocumentData, documentId: string) => Promise<boolean>;
    onOnboardingSuccess: () => void;
    onOnboardingFailure: (error: Error) => void;
    onDisclosureSuccess: () => void;
    onDisclosureFailure: (error: Error) => void;
}
interface ScreenProps {
    onSuccess: () => void;
    onFailure: (error: Error) => void;
}
interface PassportCameraProps {
    onMRZDetected: (mrzData: MRZInfo) => void;
}

/**
 * Extract and validate MRZ information from a machine-readable zone string
 * Supports TD3 format (passports) with comprehensive validation
 */
declare function extractMRZInfo(mrzString: string): MRZInfo;
/**
 * Format ISO date string (YYYY-MM-DD) to YYMMDD format
 * Handles timezone variations and validates input
 */
declare function formatDateToYYMMDD(inputDate: string): string;

/**
 * Options for MRZ scanning.
 * Reserved for future use; currently no options are accepted.
 */
type MRZScanOptions = Record<string, never>;

/**
 * Scan MRZ (Machine Readable Zone) on a passport or ID card.
 * @param _opts MRZ scanning options (currently unused)
 * @returns Promise resolving to scan result
 */
declare function scanMRZ(_opts: MRZScanOptions): Promise<ScanResult>;

/**
 * Options for QR proof scanning.
 * Reserved for future use; currently no options are accepted.
 */
type QRProofOptions = Record<string, never>;
/**
 * Scan QR code containing proof data.
 * @param _opts QR proof scanning options (currently unused)
 * @returns Promise resolving to scan result
 */
declare function scanQRProof(_opts: QRProofOptions): Promise<ScanResult>;

interface ErrorOptions {
    cause?: unknown;
}
type SdkErrorCategory = 'scanner' | 'network' | 'protocol' | 'proof' | 'crypto' | 'validation' | 'config' | 'init' | 'liveness';
/**
 * Base class for all SDK errors.
 */
declare class SdkError extends Error {
    readonly code: string;
    readonly category: SdkErrorCategory;
    readonly retryable: boolean;
    cause?: Error;
    constructor(message: string, code: string, category: SdkErrorCategory, retryable?: boolean, options?: ErrorOptions);
}
/**
 * Helper to create an SDK error for an adapter that has not been provided.
 *
 * @param name - human-readable adapter name.
 * @returns configured {@link SdkError} instance.
 */
declare function notImplemented(name: string): SdkError;
/**
 * Convenience factory for {@link SdkError}.
 *
 * @param message - error description.
 * @param code - unique error code.
 * @param category - high level error category.
 * @param retryable - whether the operation may be retried.
 * @returns configured {@link SdkError} instance.
 */
declare function sdkError(message: string, code: string, category: SdkErrorCategory, retryable?: boolean): SdkError;

declare const SCANNER_ERROR_CODES: {
    readonly UNAVAILABLE: "SELF_ERR_SCANNER_UNAVAILABLE";
    readonly NFC_NOT_SUPPORTED: "SELF_ERR_NFC_NOT_SUPPORTED";
    readonly INVALID_MODE: "SELF_ERR_SCANNER_MODE";
};

/**
 * React context holding a {@link SelfClient} instance.
 *
 * The context is intentionally initialised with `null` so that consumers
 * outside of a {@link SelfClientProvider} can be detected and an informative
 * error can be thrown.
 */
declare const SelfClientContext: react.Context<SelfClient | null>;
/**
 * Props for {@link SelfClientProvider}.
 *
 * @public
 */
interface SelfClientProviderProps {
    /** SDK configuration options. */
    config: Config;
    /**
     * Partial set of adapter implementations. Any missing optional adapters will
     * be replaced with default no-op implementations.
     */
    adapters?: Partial<Adapters>;
}

/**
 * Provides a memoised {@link SelfClient} instance to all descendant components
 * via {@link SelfClientContext}.
 *
 * Consumers should ensure that `config` and `adapters` are referentially stable
 * (e.g. wrapped in `useMemo`) to avoid recreating the client on every render.
 */
declare function SelfClientProvider({ config, adapters, children }: PropsWithChildren<SelfClientProviderProps>): react_jsx_runtime.JSX.Element;
/**
 * Retrieves the current {@link SelfClient} from context.
 *
 * @throws If used outside of a {@link SelfClientProvider}.
 */
declare function useSelfClient(): SelfClient;

/**
 * Creates a fully configured {@link SelfClient} instance.
 *
 * The function validates that all required adapters are supplied and merges the
 * provided configuration with sensible defaults. Missing optional adapters are
 * filled with benign no-op implementations.
 */
declare function createSelfClient({ config, adapters }: {
    config: Config;
    adapters: Partial<Adapters>;
}): SelfClient;

declare const defaultConfig: Required<Config>;

declare function mergeConfig(base: Required<Config>, override: Config): Required<Config>;

declare const webScannerShim: ScannerAdapter;

export { isPassportDataValid as $, type Adapters as A, type SdkErrorCategory as B, type Config as C, type DocumentData as D, type ExternalAdapter as E, SCANNER_ERROR_CODES as F, notImplemented as G, type HttpAdapter as H, sdkError as I, SelfClientContext as J, SelfClientProvider as K, type LogLevel as L, type MRZInfo as M, type NetworkAdapter as N, useSelfClient as O, type PassportCameraProps as P, type QRProofOptions as Q, type RegistrationInput as R, SdkError as S, createSelfClient as T, type Unsubscribe as U, type ValidationInput as V, type WsAdapter as W, defaultConfig as X, extractMRZInfo as Y, formatDateToYYMMDD as Z, scanMRZ as _, type ScreenProps as a, mergeConfig as a0, parseNFCResponse as a1, scanNFC as a2, scanQRProof as a3, webScannerShim as a4, type ClockAdapter as b, type CryptoAdapter as c, type LoggerAdapter as d, type MRZValidation as e, type Progress as f, type ProofHandle as g, type ProofRequest as h, type RegistrationStatus as i, type SDKEvent as j, type SDKEventMap as k, type ScanMode as l, type ScanOpts as m, type ScanResult as n, type ScannerAdapter as o, type SelfClient as p, type StorageAdapter as q, type ValidationResult as r, type WsConn as s, type DG1 as t, type DG2 as u, type NFCScanOptions as v, type ParsedNFCResponse as w, type DocumentMetadata as x, type MRZScanOptions as y, type PassportValidationCallbacks as z };
