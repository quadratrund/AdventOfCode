const originalMap = require('../misc/load-input')().split('\n').filter(Boolean);
const yStart = originalMap.findIndex(row => row.includes('^'));
const xStart = originalMap[yStart].indexOf('^');

function patrol(map) {
  const visitedA = new Set();
  const visitedB = new Set();
  let currPos = { x: xStart, y: yStart, d: 0 };
  while (map[currPos.y]?.[currPos.x]) {
    visitedA.add(currPos.x + '|' + currPos.y);
    if (visitedB.has(currPos.x + '|' + currPos.y + '|' + currPos.d)) {
      return null;
    }
    visitedB.add(currPos.x + '|' + currPos.y + '|' + currPos.d);

    let nextPos = { x: NaN, y: NaN, d: NaN };
    switch (currPos.d) {
      case 0:
        nextPos = { x: currPos.x, y: currPos.y - 1, d: currPos.d };
        break;
      case 1:
        nextPos = { x: currPos.x + 1, y: currPos.y, d: currPos.d };
        break;
      case 2:
        nextPos = { x: currPos.x, y: currPos.y + 1, d: currPos.d };
        break;
      case 3:
        nextPos = { x: currPos.x - 1, y: currPos.y, d: currPos.d };
        break;
    }
    if (map[nextPos.y]?.[nextPos.x] === '#') {
      currPos.d++;
      currPos.d %= 4;
    } else {
      currPos = nextPos;
    }
  }
  return visitedA;
}

const visitedPart1 = patrol(originalMap);
console.log(visitedPart1.size);

// -----

visitedPart1.delete(xStart + '|' + yStart);
const placesToCheck = Array.from(visitedPart1).map(x => x.split('|').map(Number)).map(([x, y]) => ({x, y}));
const possiblePlaces = placesToCheck.filter(place => {
  const map = Array.from(originalMap);
  map[place.y] = map[place.y].slice(0, place.x) + '#' + map[place.y].slice(place.x + 1);
  const visited = patrol(map);
  return visited == null;
});
console.log(possiblePlaces.length);