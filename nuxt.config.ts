// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: false },
  css: ['@/assets/css/base.scss'],
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
      'Loading',
      'Notify'
    ],
    config: {
      dark: false,
      brand:{
        primary: '#f9d673',
        secondary: '#998e86',
        negative: '#8B0000'
      },
      notify: {
        position: 'top',
        type: 'positive',
        timeout: 1000
      }
    }
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
  },
  app:{
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'Pawzzle Studio',
      meta: [
        { 'name': 'description', 'content': 'Pawzzle Studio提供專業的美容服務，讓您的毛孩子展現最美的一面，成為家庭中最閃亮的一部分。' },
        { 'property': 'og:title', 'content': 'Pawzzle Studio' },
        { 'property': 'og:description', 'content': 'Pawzzle Studio提供專業的美容服務，讓您的毛孩子展現最美的一面，成為家庭中最閃亮的一部分。' },
        { 'property': 'og:image', 'content': '/images/banner1.jpg' }
        // {"property": "og:url", "content": "https://nuxtjs.org"}
      ],
      link: [
        { rel: 'icon', href: '/favicon.ico' }
      ]
    },
    pageTransition:{
      name: 'slide-left',
      mode: 'out-in'
    }
  },
  features:{ //https://github.com/nuxt/nuxt/discussions/15915#discussioncomment-9772787
    inlineStyles: false
  }
});