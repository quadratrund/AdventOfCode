const regex = /^p=(-?\d+),(-?\d+) v=(-?\d+),(-?\d+)$/;
const robots = require('../load-input')().split('\n')
  .filter(Boolean)
  .map(line => line.match(regex).map(Number))
  .map(([ , px, py, vx, vy ]) => ({ px, py, vx, vy }));

const areaHeight = 103;
const areaWidth = 101;
const time = 100000;

const lonelyStats = [];
let movedRobots = robots;
for (let i = 0; i < time; i++) {
  const picture = Array(areaHeight)
    .fill(null)
    .map(() => Array(areaWidth).fill(0));
  for (const robot of movedRobots) {
    picture[robot.py][robot.px]++;
  }
  const robotsInGroups = movedRobots.filter(({ px, py }) =>
    picture[py - 1]?.[px] && picture[py + 1]?.[px] && picture[py]?.[px - 1] && picture[py]?.[px + 1]
  );
  for (const { px, py } of robotsInGroups) {
    picture[py][px] = 'X';
  }
  lonelyStats.push(robotsInGroups.length);
  if (robotsInGroups.length > 10) {
    const pictureStr = picture
      .map(row => row.map(x => x === 0 ? '.' : x).join(''))
      .join('\n');
    console.log(pictureStr);
    console.log(robotsInGroups.length);
    console.log(i);
    break;
  }
  movedRobots = movedRobots.map(({ px, py, vx, vy }) => {
    px += vx;
    px %= areaWidth;
    if (px < 0) px += areaWidth;
    py += vy;
    py %= areaHeight;
    if (py < 0) py += areaHeight;
    return { px, py, vx, vy };
  });
}