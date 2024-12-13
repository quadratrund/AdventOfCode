const map = require('../load-input')().split('\n').filter(Boolean).map(line => line.split(''));
let nextId = 1;
const regionAreas = {};
const regionSideCounts = {};
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
    const rightConnected = plot === row[x + 1];
    const bottomConnected = plot === map[y + 1]?.[x];
    const regionId = leftConnected
      ? regionRow[x - 1].regionId
      : (topConnected ? prevRegionRow[x].regionId : nextId++);
    regionRow.push({regionId, leftConnected, topConnected, rightConnected, bottomConnected});
    if (!leftConnected && !topConnected) {
      regionAreas[regionId] = 1;
      regionSideCounts[regionId] = 2 + !rightConnected + !bottomConnected;
      regionPlots[regionId] = [{x,y}];
    } else {
      regionPlots[regionId].push({x,y});
      regionAreas[regionId]++;
      if (!topConnected && (!leftConnected || regionRow[x - 1].topConnected)) {
        regionSideCounts[regionId]++;
      }
      if (!bottomConnected && (!leftConnected || regionRow[x - 1].bottomConnected)) {
        regionSideCounts[regionId]++;
      }
      if (!leftConnected && (!topConnected || prevRegionRow[x].leftConnected)) {
        regionSideCounts[regionId]++;
      }
      if (!rightConnected && (!topConnected || prevRegionRow[x].rightConnected)) {
        regionSideCounts[regionId]++;
      }
      const otherRegionId = prevRegionRow[x]?.regionId;
      if (leftConnected && topConnected && regionId !== otherRegionId) {
        const otherRegionPlots = regionPlots[otherRegionId];
        regionAreas[regionId] += regionAreas[otherRegionId];
        regionSideCounts[regionId] += regionSideCounts[otherRegionId];
        regionPlots[regionId].push(...otherRegionPlots);
        delete regionAreas[otherRegionId];
        delete regionSideCounts[otherRegionId];
        delete regionPlots[otherRegionId];
        for (const plot of otherRegionPlots) {
          regionMap[plot.y][plot.x].regionId = regionId;
        }
      }
    }
  }
  prevRow = row;
  prevRegionRow = regionRow;
}
let price = 0;
for (const regionId in regionAreas) {
  price += regionAreas[regionId] * regionSideCounts[regionId];
}
console.log(price);