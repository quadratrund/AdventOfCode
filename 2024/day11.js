const initialStones = require('../load-input')().replaceAll('\n', '').split(' ');

function interateStone(stone) {
  if (stone === '0') {
    return ['1'];
  } else if (stone.length % 2 === 0) {
    const halfLength = stone.length / 2;
    return [stone.substring(0, halfLength), stone.substring(halfLength)].map(Number).map(String);
  } else {
    return [String(Number(stone) * 2024)];
  }
}

let stones = initialStones;
for (let i = 0; i < 25; i++) {
  stones = stones.flatMap(interateStone);
}
console.log(stones.length);

// -----

function addStone(pile, stone, count) {
  pile[stone] ??= 0;
  pile[stone] += count;
}

function interateAllStones(stones) {
  const newStones = {};
  for (const [stone, count] of Object.entries(stones)) {
    for (const iteratedStone of interateStone(stone)) {
      addStone(newStones, iteratedStone, count);
    }
  }
  return newStones;
}

let pile = {};
for (const stone of initialStones) {
  addStone(pile, stone, 1);
}

for (let i = 0; i < 75; i++) {
  pile = interateAllStones(pile);
}
const stoneCount = Object.values(pile).reduce((a, b) => a + b);
console.log(stoneCount);