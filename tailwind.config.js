/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: '#ffffff',
      purple: '#3f3cbb',
      midnight: '#121063',
      metal: '#565584',
      tahiti: '#3ab7bf',
      silver: '#ecebff',
      'bubble-gum': '#ff77e9',
      bermuda: '#78dcca',
      uicolor: '#082213',
      uiaccent: '#244930',
      black: '#000000',
      fontcolor: '#e5e5e5'
    },
    extend: {
      aspectRatio: {
        '8/7': '8 / 7',
        half: '2 / 1',
        battleWindow: '223 / 103',
        gradientLine: '148 / 6'
      },
      padding: {
        '7/8': '87.5%'
      },
      fontFamily: {
        megaten: ['Megaten20XX', 'sans-serif']
      },
      flexBasis: {
        '223/256': '223/256',
        '17/256': '17 / 256',
        '1/10': '10%'
      },
      height: {
        108: '108px',
        '46c': '46%',
        '51hc': '51.5%'
      },
      width: {
        '17/256': '6.64%',
        '16/256': '6.4%',
        '8/256': '3.125%'
      },
      gridTemplateColumns: {
        '8-fr-8': '3.125% 1fr 3.125%',
        '20c-fr': '20% 1fr'
      },
      gridTemplateRows: {
        '20c-70c-fr': '20.9% 72.72% 1fr'
      }
    }
  },
  plugins: []
}
