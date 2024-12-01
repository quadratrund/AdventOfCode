const { readFileSync } = require('fs');

const buffer = readFileSync('input-day14.txt');
const text = buffer.toString('utf8').split('\n').filter(Boolean);
const platform = text.map(line => line.split(''));
//console.log(platform.map(x => x.join('')).join('\n'));
//console.log();

const history = [];

for (let i = 0; i < 1000000000; i++) {
  const nextFreeDestinationsByX = platform[0].map(() => 0);
  const nextFreeDestinationsByY = platform.map(() => 0);

  // north
  nextFreeDestinationsByX.fill(0);
  for (let y = 0; y < platform.length; y++) {
    for (let x = 0; x < nextFreeDestinationsByX.length; x++) {
      switch (platform[y][x]) {
        case '#':
          nextFreeDestinationsByX[x] = y + 1;
          break;
        case 'O':
          platform[y][x] = '.';
          platform[nextFreeDestinationsByX[x]][x] = 'O';
          nextFreeDestinationsByX[x]++;
          break;
      }
    }
  }

  // west
  for (let y = 0; y < platform.length; y++) {
    for (let x = 0; x < nextFreeDestinationsByX.length; x++) {
      switch (platform[y][x]) {
        case '#':
          nextFreeDestinationsByY[y] = x + 1;
          break;
        case 'O':
          platform[y][x] = '.';
          platform[y][nextFreeDestinationsByY[y]] = 'O';
          nextFreeDestinationsByY[y]++;
          break;
      }
    }
  }

  // south
  platform.reverse();
  nextFreeDestinationsByX.fill(0);
  for (let y = 0; y < platform.length; y++) {
    for (let x = 0; x < nextFreeDestinationsByX.length; x++) {
      switch (platform[y][x]) {
        case '#':
          nextFreeDestinationsByX[x] = y + 1;
          break;
        case 'O':
          platform[y][x] = '.';
          platform[nextFreeDestinationsByX[x]][x] = 'O';
          nextFreeDestinationsByX[x]++;
          break;
      }
    }
  }
  platform.reverse();

  // east
  nextFreeDestinationsByY.fill(nextFreeDestinationsByX.length - 1);
  for (let y = 0; y < platform.length; y++) {
    for (let x = nextFreeDestinationsByX.length - 1; x >= 0; x--) {
      switch (platform[y][x]) {
        case '#':
          nextFreeDestinationsByY[y] = x - 1;
          break;
        case 'O':
          platform[y][x] = '.';
          platform[y][nextFreeDestinationsByY[y]] = 'O';
          nextFreeDestinationsByY[y]--;
          break;
      }
    }
  }

  const snapshot = platform.map(x => x.join('')).join('\n');
  const startOfRepeatingHistory = history.indexOf(snapshot);
  if (startOfRepeatingHistory !== -1) {
    const repeatLength = history.length - startOfRepeatingHistory;
    const projectedIndex = (1000000000 - startOfRepeatingHistory - 1) % repeatLength + startOfRepeatingHistory;
    //console.log(i, startOfRepeatingHistory, snapshot, repeatLength, projectedIndex);
    //console.log();
    const historicPlatform = history[projectedIndex].split('\n').map(line => line.split(''));
    //console.log(historicPlatform.map(x => x.join('')).join('\n'));
    const load = historicPlatform.map((row, i) => (historicPlatform.length - i) * row.filter(x => x === 'O').length).reduce((a, b) => a + b);
    console.log(load);
    break;
  }
  history.push(snapshot);
}
