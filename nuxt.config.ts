export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
    app:{
        head: {
            title: process.env.VITE_APP_TITLE,
            charset: 'utf-8',
            viewport: 'width=device-width, initial-scale=1',
            link: [
                { rel: 'icon', type: 'image/svg+xml', href: '/icon.svg?v=1' },
                { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },

                { rel: 'manifest', href: '/site.webmanifest' }
            ],
            meta: [
                { name: 'theme-color', content:  process.env.VITE_PRIMARY_COLOR?.trim() }
            ]
        },
    },
    modules: [
        '@nuxtjs/tailwindcss',
        '@nuxt/eslint',
        "@nuxtjs/google-fonts"],
    runtimeConfig: {
        public: {
            appTitle: process.env.VITE_APP_TITLE,
            primaryColor: process.env.VITE_PRIMARY_COLOR?.trim()
        }
    },
    css: ['~/assets/css/main.css'],

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
