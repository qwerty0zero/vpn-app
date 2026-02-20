export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
    app:{
        head: {
            title: import.meta.env.VITE_APP_TITLE,
            charset: 'utf-8',
            viewport: 'width=device-width, initial-scale=1',
            link: [
                { rel: 'icon', type: 'image/svg+xml', href: '/icon.svg?v=1' },
                { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },

                { rel: 'manifest', href: '/site.webmanifest' }
            ],
            meta: [
                { name: 'theme-color', content:  import.meta.env.VITE_PRIMARY_COLOR?.trim() }
            ]
        },
    },
    modules: ['@nuxtjs/tailwindcss', '@nuxt/eslint', "@nuxtjs/google-fonts", '@nuxtjs/i18n'],
    runtimeConfig: {
        public: {
            appTitle: import.meta.env.VITE_APP_TITLE,
            primaryColor: import.meta.env.VITE_PRIMARY_COLOR?.trim()
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
    },
    i18n: {
        lazy: true,
        langDir: 'locales',
        defaultLocale: 'ru',
        strategy: 'prefix',
        locales: [
            {
                code: 'ru',
                iso: 'ru-RU',
                name: 'Русский',
                file: 'ru.json'
            },
            {
                code: 'en',
                iso: 'en-US',
                name: 'English',
                file: 'en.json'
            }
        ],
        detectBrowserLanguage: {
            useCookie: true,
            cookieKey: 'i18n_redirected',
            redirectOn: 'root', // редирект только при заходе на главную
        },
    },



})