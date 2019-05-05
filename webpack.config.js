const path = require('path');

module.exports = {
  mode: 'production',
  plugins: [
  ],
  entry: {
    app: './src/app.js',
    page_0: './src/pages/page_0.js',
    page_1: './src/pages/page_1.js',
    page_2: './src/pages/page_2.js',
    page_3: './src/pages/page_3.js',
    page_8: './src/pages/page_8.js',
    page_9: './src/pages/page_9.js',
    page_10: './src/pages/page_10.js',
    page_12: './src/pages/page_12.js',
    page_13: './src/pages/page_13.js',
    page_15: './src/pages/page_15.js',
    page_17: './src/pages/page_17.js',
    page_18: './src/pages/page_18.js',
    page_19: './src/pages/page_19.js',
    page_20: './src/pages/page_20.js',
    page_21: './src/pages/page_21.js',
    page_22: './src/pages/page_22.js',
    page_23: './src/pages/page_23.js',
    page_24: './src/pages/page_24.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist', 'js')
  }
};
