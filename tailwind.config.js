/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],

  presets: [require('nativewind/preset')],

  theme: {
    extend: {
      colors: {
        oaa: {
          background: '#070B10',
          surface: '#0D131A',
          elevated: '#121B24',

          primary: '#20A9FF',
          bright: '#4CC4FF',
          dark: '#0A6FA8',

          text: '#F4F8FB',
          secondary: '#8EA0AE',
          muted: '#596A76',

          border: '#20303D',
          active: '#1F9CE5',

          success: '#46C78A',
          warning: '#E8B84B',
          danger: '#EF6464',
        },
      },
    },
  },

  plugins: [],
};