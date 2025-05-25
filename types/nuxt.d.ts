import type { $Fetch } from 'ofetch';

declare module '#app' {
    interface NuxtApp {
        $api: $Fetch
    }
}
declare module 'nuxt/app' {
    interface NuxtApp {
        $api: typeof $fetch;
    }
}

// 加上 Google Identity Services 型別
declare global {
    interface Window {
        google: {
            accounts: {
                id: {
                    initialize: (options: {
                        client_id: string;
                        callback: (response: CredentialResponse) => void;
                    }) => void;
                    renderButton: (element: HTMLElement | null, options: {
                        theme?: 'outline' | 'filled_blue' | 'filled_black';
                        size?: 'small' | 'medium' | 'large';
                        shape?: 'rectangular' | 'pill';
                        width?: number;
                        text?: 'signin_with' | 'signup_with' | 'continue_with';
                        logo_alignment?: 'left' | 'center';
                    }) => void;
                    prompt: () => void;
                };
            };
        };
    }
}

export {};