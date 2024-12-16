const map = require('../misc/load-input')().split('\n').filter(Boolean).map(line => line.split('').map(Number));
const scores = new Map();
const ratings = new Map();

/**
 * @param {number} x 
 * @param {number} y 
 * @returns {Set<string>}
 */
function getReachableHills(x, y) {
  const key = x + '|' + y;
  if (scores.has(key)) {
    return scores.get(key);
  }
  const hills = new Set(); 
  const height = map[y][x];
  if (height === 9) {
    hills.add(key);
  } else {
    const nextFields = [
      [ x - 1, y ],
      [ x + 1, y ],
      [ x, y - 1 ],
      [ x, y + 1 ]
    ];
    for (const [x2, y2] of nextFields) {
      if (map[y2]?.[x2] === height + 1) {
        const hills2 = getReachableHills(x2, y2);
        hills2.forEach(key2 => hills.add(key2));
      }
    }
  }
  scores.set(key, hills);
  return hills;
}

/**
 * @param {number} x 
 * @param {number} y 
 * @returns {number}
 */
function getRating(x, y) {
  const key = x + '|' + y;
  if (ratings.has(key)) {
    return ratings.get(key);
  }
  let rating = 0;
  const height = map[y][x];
  if (height === 9) {
    rating = 1;
  } else {
    const nextFields = [
      [ x - 1, y ],
      [ x + 1, y ],
      [ x, y - 1 ],
      [ x, y + 1 ]
    ];
    for (const [x2, y2] of nextFields) {
      if (map[y2]?.[x2] === height + 1) {
        rating += getRating(x2, y2);
      }
    }
  }
  ratings.set(key, rating);
  return rating;
}

const trailheads = map.flatMap((row, y) => row.map((height, x) => height === 0 ? { x, y } : null)).filter(Boolean);

const scoreSum = trailheads.map(({ x, y }) => getReachableHills(x, y).size).reduce((a, b) => a + b);
console.log(scoreSum);

const ratingSum = trailheads.map(({ x, y }) => getRating(x, y)).reduce((a, b) => a + b);
console.log(ratingSum);