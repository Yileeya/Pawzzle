// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: {enabled: true},
  css: ['~/assets/css/base.scss'],
  modules: [
    '@nuxt/eslint', 'nuxt-quasar-ui', 'nuxt-icons', 'nuxt-aos',
    [
      '@pinia/nuxt',
      { autoImports: ['defineStore', 'storeToRefs'] }
    ]
  ],
  runtimeConfig:{
    public:{
      apiUrl: process.env.NUXT_API_BASE_URL
    }
  },
  quasar: {
    plugins: [
      'Dialog',
      'Loading'
    ]
  },
  vite: { //https://github.com/gitFoxCode/nuxt-icons/issues/56#issuecomment-2457905778
    plugins: [
      {
        name: 'vite-plugin-glob-transform',
        transform(code: string, id: string) {
          if (id.includes('nuxt-icons')) {
            return code.replace(/as:\s*['"]raw['"]/g, 'query: "?raw", import: "default"');
          }
          return code;
        }
      }
    ],
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/css/breakpoints.scss" as *;'
        }
      }
    }
  }
});