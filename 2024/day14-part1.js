const regex = /^p=(-?\d+),(-?\d+) v=(-?\d+),(-?\d+)$/;
const robots = require('../misc/load-input')().split('\n')
  .filter(Boolean)
  .map(line => line.match(regex).map(Number))
  .map(([ , px, py, vx, vy ]) => ({ px, py, vx, vy }));

const areaHeight = 103;
const areaWidth = 101;
const time = 100;

const movedRobots = robots.map(({ px, py, vx, vy }) => ({
  x: (px + time * vx) % areaWidth,
  y: (py + time * vy) % areaHeight
})).map(({x,y}) => ({
  x: x < 0 ? x + areaWidth : x,
  y: y < 0 ? y + areaHeight : y
}));

const quadrants = {
  TL: 0,
  TR: 0,
  BL: 0,
  BR: 0
};
for (const robot of movedRobots) {
  if (robot.x < Math.floor(areaWidth / 2)) {
    if (robot.y < Math.floor(areaHeight / 2)) {
      quadrants.TL++;
    } else if (robot.y >= Math.ceil(areaHeight / 2)) {
      quadrants.BL++;
    }
  } else if (robot.x >= Math.ceil(areaWidth / 2)) {
    if (robot.y < Math.floor(areaHeight / 2)) {
      quadrants.TR++;
    } else if (robot.y >= Math.ceil(areaHeight / 2)) {
      quadrants.BR++;
    }
  }
}
const safetyFactor = quadrants.TL * quadrants.TR * quadrants.BL * quadrants.BR;
console.log(safetyFactor);