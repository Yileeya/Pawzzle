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
export {};