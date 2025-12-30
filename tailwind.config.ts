
export default {
  content: [
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './app.vue',
  ],
  theme: {
    extend: {
      colors: {
        primary: 'rgb(var(--color-primary))',
        bg_dark: 'var(--color-app-bg)',
        bg_gray: 'var(--color-bg-gray)',
        red: 'var(--color-red)',
        blue: 'var(--color-blue)',
        green: 'var(--color-green)',
        orange: 'var(--color-orange)',
        yellow: 'var(--color-yellow)',
      },
      boxShadow: {
        'custom-light': '0 0 8px rgba(255 255 255 / 25%)',
        'custom-primary': '0 0 8px rgba(var(--color-primary) / 0.5)',
      },
      borderColor: {
        'primary-alpha': 'rgba(var(--color-primary) / 0.5)'
      },
    },
    borderRadius: {
      none: '0',
      sm: '0.125rem',
      DEFAULT: '0.25rem',
      md: '0.375rem',
      lg: '0.5rem',
      xl: 'var(--radius-xl)',
      '2xl': '1rem',
      '3xl': 'var(--radius-3xl)',
      full: '9999px',
    },
  },
};