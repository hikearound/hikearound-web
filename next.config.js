const withCSS = require('@zeit/next-css');
const withSourceMaps = require('@zeit/next-source-maps')();

module.exports = withCSS(withSourceMaps());
