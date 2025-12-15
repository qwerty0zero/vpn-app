// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
    modules: ['@nuxtjs/tailwindcss',
        '@nuxt/eslint'],
    runtimeConfig: {
        public: {
            appTitle: process.env.VITE_APP_TITLE,
            primaryColor: process.env.VITE_PRIMARY_COLOR
        }
    },
  devtools: { enabled: true }
})
