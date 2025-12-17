export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
    modules: [
        '@nuxtjs/tailwindcss',
        '@nuxt/eslint',
        "@nuxtjs/google-fonts"],
    runtimeConfig: {
        public: {
            appTitle: process.env.VITE_APP_TITLE,
            primaryColor: process.env.VITE_PRIMARY_COLOR
        }
    },
  devtools: { enabled: true },
    googleFonts: {
        families: {
            Manrope: [100, 200, 300, 400, 500, 600, 700, 800, 900]
        },
        display: "swap",
        preconnect: true,
        preload: true
    }
})
