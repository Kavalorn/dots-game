const { override, addWebpackAlias } = require('customize-cra');
const path = require('path');

module.exports = override(
  addWebpackAlias({
    '~app': path.resolve(__dirname, 'src/app'),
    '~entities': path.resolve(__dirname, 'src/entities'),
    '~features': path.resolve(__dirname, 'src/features'),
    '~pages': path.resolve(__dirname, 'src/pages'),
    '~shared': path.resolve(__dirname, 'src/shared'),
    '~utils': path.resolve(__dirname, 'src/utils'),
    '~widgets': path.resolve(__dirname, 'src/widgets'),
  })
);