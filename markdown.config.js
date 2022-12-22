/* eslint-disable global-require, unicorn/prefer-module, import/no-extraneous-dependencies */
module.exports = {
  transforms: {
    PKG_JSON: require('markdown-magic-package-json'),
    SUBPACKAGE_LIST: require('markdown-magic-subpackage-list'),
  },
};
