const map = require('../load-input')().split('\n').filter(Boolean).map(line => line.split(''));
let nextId = 1;
const regionAreas = {};
const regionPerimeters = {};
const regionPlots = {};
const regionMap = [];
let prevRow = [];
let prevRegionRow = [];
for (const [y, row] of map.entries()) {
  const regionRow = [];
  regionMap.push(regionRow);
  for (const [x, plot] of row.entries()) {
    const leftConnected = plot === row[x - 1];
    const topConnected = plot === prevRow[x];
    const regionId = leftConnected
      ? regionRow[x - 1]
      : (topConnected ? prevRegionRow[x] : nextId++);
    regionRow.push(regionId);
    if (!leftConnected && !topConnected) {
      regionAreas[regionId] = 1;
      regionPerimeters[regionId] = 2;
      regionPlots[regionId] = [{x,y}];
    } else {
      regionPlots[regionId].push({x,y});
      regionAreas[regionId]++;
      if (!leftConnected || !topConnected) {
        regionPerimeters[regionId]++;
      }
      const otherRegionId = prevRegionRow[x];
      if (leftConnected && topConnected && regionId !== otherRegionId) {
        const otherRegionPlots = regionPlots[otherRegionId];
        regionAreas[regionId] += regionAreas[otherRegionId];
        regionPerimeters[regionId] += regionPerimeters[otherRegionId];
        regionPlots[regionId].push(...otherRegionPlots);
        delete regionAreas[otherRegionId];
        delete regionPerimeters[otherRegionId];
        delete regionPlots[otherRegionId];
        for (const plot of otherRegionPlots) {
          regionMap[plot.y][plot.x] = regionId;
        }
      }
    }
  }
  prevRow = row;
  prevRegionRow = regionRow;
}
let price = 0;
for (const regionId in regionAreas) {
  price += regionAreas[regionId] * regionPerimeters[regionId] * 2;
}
console.log(price);