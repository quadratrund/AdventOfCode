const { readFileSync } = require('fs');

const buffer = readFileSync('input-day14.txt');
const text = buffer.toString('utf8').split('\n').filter(Boolean);
const platform = text.map(line => line.split(''));
//console.log(platform.map(x => x.join('')).join('\n'));

const nextFreeDestinations = platform[0].map(() => 0);

for (let y = 0; y < platform.length; y++) {
  for (let x = 0; x < nextFreeDestinations.length; x++) {
    switch (platform[y][x]) {
      case '#':
        nextFreeDestinations[x] = y + 1;
        break;
      case 'O':
        platform[y][x] = '.';
        platform[nextFreeDestinations[x]][x] = 'O';
        nextFreeDestinations[x]++;
        break;
    }
  }
}

//console.log(platform.map(x => x.join('')).join('\n'));

const load = platform.map((row, i) => (platform.length - i) * row.filter(x => x === 'O').length).reduce((a, b) => a + b);
console.log(load);