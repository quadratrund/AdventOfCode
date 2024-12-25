const input = require('../misc/load-input')().split('\n\n').map(section => section.split('\n').filter(Boolean))
const locks = input
  .filter(section => section[0] === '#####')
  .map(section => section[0].split('').map((_, index) => section.slice(1).findIndex(row => row[index] === '.')));
const keys = input
  .filter(section => section[0] === '.....')
  .map(section => section[0].split('').map((_, index) => section.slice(0, 6).reverse().findIndex(row => row[index] === '.')));

function keyFitsInLock(lock, key) {
  return lock.every((value, index) => value + key[index] <= 5);
}

const fittingCombinationCount = locks.map(lock => keys.filter(key => keyFitsInLock(lock, key)).length).reduce((a, b) => a + b);
console.log(fittingCombinationCount);