/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: '#0F172A',
        blue: '#1D4ED8',
        silver: '#E5E7EB',
        dark: '#111827',
      },
      fontFamily: {
        heading: ['"Montserrat"', '"Inter Tight"', 'Inter', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 10px 30px -12px rgba(15, 23, 42, 0.35)',
        soft: '0 8px 24px -10px rgba(0, 0, 0, 0.15)',
      },
      backgroundImage: {
        'hero-gradient': 'radial-gradient(circle at 20% 20%, rgba(29, 78, 216, 0.12), transparent 32%), radial-gradient(circle at 80% 0%, rgba(15, 23, 42, 0.18), transparent 28%), linear-gradient(135deg, rgba(15, 23, 42, 0.92), rgba(15, 23, 42, 0.9))',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
