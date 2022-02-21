/* eslint-disable global-require, unicorn/prefer-module, import/no-extraneous-dependencies */
module.exports = {
  transforms: {
    PKGJSON: require('markdown-magic-package-json'),
    SUBPACKAGELIST: require('markdown-magic-subpackage-list'),
  },
  callback() {
    // console.log('done')
  },
};
