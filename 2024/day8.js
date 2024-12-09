const map = require('../load-input')().split('\n').filter(Boolean);
const allAntennas = {};
for (const [y, row] of map.entries()) {
  for (const [x, frequency] of row.split('').entries()) {
    if (frequency !== '.') {
      allAntennas[frequency] ??= [];
      allAntennas[frequency].push({ x, y });
    }
  }
}
const height = map.length;
const width = map[0].length;
const antinodes = new Set();
function addAntinode(antinode) {
  const isOnMap = antinode.x >= 0 && antinode.x < width && antinode.y >= 0 && antinode.y < height;
  if (isOnMap) {
    antinodes.add(antinode.x + '|' + antinode.y);
  }
  return isOnMap;
}
for (const antennas of Object.values(allAntennas)) {
  for (const [indexA, antennaA] of antennas.entries()) {
    for (const antennaB of antennas.slice(indexA + 1)) {
      const antinodeA = {
        x: antennaA.x * 2 - antennaB.x,
        y: antennaA.y * 2 - antennaB.y
      }
      const antinodeB = {
        x: antennaB.x * 2 - antennaA.x,
        y: antennaB.y * 2 - antennaA.y
      }
      addAntinode(antinodeA);
      addAntinode(antinodeB);
    }
  }
}
console.log(antinodes.size);

// -----

function addVectors(a, b) {
  return {
    x: a.x + b.x,
    y: a.y + b.y
  };
}
for (const antennas of Object.values(allAntennas)) {
  for (const [indexA, antennaA] of antennas.entries()) {
    for (const antennaB of antennas.slice(indexA + 1)) {
      addAntinode(antennaA);
      const vector = {
        x: antennaA.x - antennaB.x,
        y: antennaA.y - antennaB.y
      }
      for (let antinode = antennaA; addAntinode(antinode); antinode = addVectors(antinode, vector));
      vector.x *= -1;
      vector.y *= -1;
      for (let antinode = antennaB; addAntinode(antinode); antinode = addVectors(antinode, vector));
    }
  }
}
console.log(antinodes.size);