const initialSecretNumbers = require('../misc/load-input')().split('\n').filter(Boolean).map(BigInt);

function generateNextSecretNumber(previous) {
  function mixAndPrune(a, b) {
    return (a ^ b) % 16777216n; 
  }

  let temp = mixAndPrune(previous, previous * 64n);
  temp = mixAndPrune(temp, temp / 32n);
  return mixAndPrune(temp, temp * 2048n);
}

function* generatePrices(secretNumber) {
  let value = secretNumber;
  yield value % 10n;
  for (let i = 2000; i > 0; i--) {
    value = generateNextSecretNumber(value);
    yield value % 10n;
  }
}

function generatePriceChanges(prices) {
  return prices
    .slice(1)
    .map((price, index) => String(price - prices[index]))
    .map(change => change.length === 1 ? '+' + change : change)
    .join('');
}

const priceLists = initialSecretNumbers.map(secretNumber => Array.from(generatePrices(secretNumber)));
const changeLists = priceLists.map(prices => generatePriceChanges(prices));

function calcBananaCount(searchSequence) {
  return changeLists
    .map((changes, monkey) => [changes.indexOf(searchSequence), monkey])
    .filter(([index]) => index !== -1)
    .map(([index, monkey]) => priceLists[monkey][index / 2 + 4])
    .reduce((a, b) => a + b);
}

const testedSequences = new Set();
const bananaCounts = [];
for(const changes of changeLists) {
  for (let i = 0; i < 3992; i += 2) {
    const searchSequence = changes.substring(i, i + 8);
    if (testedSequences.has(searchSequence)) continue;
    testedSequences.add(searchSequence);
    bananaCounts.push(Number(calcBananaCount(searchSequence)));
  }
  console.log(testedSequences.size + ' sequences tested');
}

const maxBananas = Math.max(...bananaCounts);
console.log(maxBananas);