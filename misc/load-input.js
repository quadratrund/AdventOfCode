const { readFileSync } = require('fs');
const { basename } = require('path');
const { argv } = require('process');

module.exports = (suffix) => {
  const day = basename(argv[1]).match(/\d+/)[0];
  return readFileSync('input-day' + day + (suffix ?? '') + '.txt').toString('utf8');
};