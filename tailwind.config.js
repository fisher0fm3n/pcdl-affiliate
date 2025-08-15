// /* eslint-disable global-require */
// const withMT = require('@material-tailwind/react/utils/withMT');
// const colors = require('tailwindcss/colors');

// module.exports = withMT({
//     darkMode: 'class',
//   content: ['./src/**/*.{html,js}', './node_modules/tw-elements/dist/js/**/*.js'],
//     theme: {
//       colors: {
//         ...colors,
//       },
//     maxWidth: {
//       '8xl': '90rem',
//       'slider-title': '15rem',
//       // eslint-disable-next-line quote-props
//       'none': 'none',
//     },
//     maxHeight: {
//       series: '26rem',
//     },
//     extend: {
//       dropShadow: {
//         '3xl': '0 35px 35px rgba(0, 0, 0, 0.25)',
//       },
//       height: {
//         'r-70': '70rem',
//         'r-60': '60rem',
//         'r-44': '44rem',
//         'r-36': '36rem',
//       },
//       width: {
//         'r-70': '70rem',
//         'r-60': '60rem',
//         'r-44': '44rem',
//         'r-36': '36rem',
//       },
//     },
//   },

//   plugins: [
//       require('tw-elements/dist/plugin'),
//       require('@tailwindcss/forms'),
//   ],
// });

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    maxWidth: {
      '8xl': '90rem',
      'slider-title': '15rem',
      // eslint-disable-next-line quote-props
      none: 'none',
    },
    maxHeight: {
      series: '26rem',
    },
    extend: {
      dropShadow: {
        '3xl': '0 35px 35px rgba(0, 0, 0, 0.25)',
      },
      height: {
        'r-70': '70rem',
        'r-60': '60rem',
        'r-44': '44rem',
        'r-36': '36rem',
      },
      width: {
        'r-70': '70rem',
        'r-60': '60rem',
        'r-44': '44rem',
        'r-36': '36rem',
      },
    },
  },
  plugins: [],
}
