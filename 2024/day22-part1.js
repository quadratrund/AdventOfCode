const initialSecretNumbers = require('../misc/load-input')().split('\n').filter(Boolean).map(BigInt);

function generateNextSecretNumber(previous) {
  function mixAndPrune(a, b) {
    return (a ^ b) % 16777216n; 
  }

  let temp = mixAndPrune(previous, previous * 64n);
  temp = mixAndPrune(temp, temp / 32n);
  return mixAndPrune(temp, temp * 2048n);
}

const newSecretNumbers = initialSecretNumbers.map(value => {
  for (let i = 2000; i > 0; i--) {
    value = generateNextSecretNumber(value);
  }
  return value;
});
const sum = newSecretNumbers.reduce((a, b) => a + b);
console.log(sum);