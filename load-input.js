const { readFileSync } = require('fs');
const { basename } = require('path');
const { argv } = require('process');

module.exports = () => {
  const day = basename(argv[1]).match(/\d+/)[0];
  return readFileSync('input-day' + day + '.txt').toString('utf8');
};