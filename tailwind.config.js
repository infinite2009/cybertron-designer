const coderXColors = {
  primaryPurple: '#7950ed',
  darkPurple: '#6032ea',
  black80: '#a3a8b8',
  black60: '#80869d',
  black10: '#373d57',
  black5: '#2c3249',
  itemBlack: '#b7bac7',
  primaryBlack: '#15192c',
  white: '#fff',
  red: '#e93c51'
};

module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      spacing: {
        // 1px 这个值貌似不 work，不知道是不是 tailwindcss 的 bug
        1: '1px',
        2: '2px',
        10: '10px',
        20: '20px',
        24: '24px',
        30: '30px',
        40: '40px',
        60: '60px',
        180: '180px',
        210: '210px',
        240: '240px',
        300: '300px',
        375: '375px',
        400: '400px',
        812: '812px'
      },
      colors: {
        'btn-bg': coderXColors.primaryPurple,
        'btn-hover-bg': coderXColors.darkPurple,
        border: coderXColors.black10,
        'panel-bg': coderXColors.black5,
        'panel-hover-bg': coderXColors.black10,
        'main-bg': coderXColors.primaryBlack,
        'item-selected-bg': coderXColors.black10,
        text: coderXColors.black80,
        'text-tips': coderXColors.black60,
        'text-hover': coderXColors.white,
        error: coderXColors.red,
        'menu-icon-hover-bg': coderXColors.primaryPurple
      }
    }
  },
  variants: {
    extend: {},
    container: []
  },
  corePlugins: {
    // ...
    container: false
  },
  plugins: []
};
