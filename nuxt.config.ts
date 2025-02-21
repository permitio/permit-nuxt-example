import Aura from '@primevue/themes/aura';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@pinia/nuxt', '@nuxtjs/tailwindcss', '@primevue/nuxt-module'],
  css: ['~/assets/main.css', 'primeicons/primeicons.css'],
  primevue: {
    autoImport: true,
    options: { ripple: true, theme: { preset: Aura } }
  },
  build: { transpile: ['permitio'] },
  runtimeConfig: {
    permitToken: process.env.PERMIT_TOKEN,
    permitPdp: process.env.PERMIT_PDP
  }
});
