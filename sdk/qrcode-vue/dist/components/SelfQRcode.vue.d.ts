import { SelfApp } from '@selfxyz/common';
interface Props {
    selfApp: SelfApp;
    onSuccess: () => void;
    onError: (data: {
        error_code?: string;
        reason?: string;
    }) => void;
    type?: 'websocket' | 'deeplink';
    websocketUrl?: string;
    size?: number;
    darkMode?: boolean;
}
declare const _default: import('vue').DefineComponent<Props, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<Props> & Readonly<{}>, {
    type: "websocket" | "deeplink";
    websocketUrl: string;
    size: number;
    darkMode: boolean;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
export default _default;
