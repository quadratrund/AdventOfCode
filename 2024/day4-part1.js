const input = require('../load-input')().split('\n').filter(Boolean);
const xPos = input.flatMap((line, y) => line.split('').map((char, x) => ({char, x})).filter(({char}) => char === 'X').map(({x}) => ({ x, y })));

/**
 * @param {{x:number,y:number}} a 
 * @param {{x:number,y:number}} b 
 */
function addPoints(a, b) {
  return {
    x: a.x + b.x,
    y: a.y + b.y
  };
}

/**
 * @param {{x:number,y:number}} pos 
 * @param {{x:number,y:number}} direction 
 */
function checkXmas(pos, direction) {
  const a = addPoints(pos, direction);
  const b = addPoints(a, direction);
  const c = addPoints(b, direction);
  const A = input[a.y]?.[a.x];
  const B = input[b.y]?.[b.x];
  const C = input[c.y]?.[c.x];
  return A === 'M' && B === 'A' && C === 'S';
}

const directions = [
  { x: -1, y: -1 },
  { x: -1, y:  0 },
  { x:  0, y: -1 },
  { x:  1, y:  1 },
  { x:  1, y:  0 },
  { x:  0, y:  1 },
  { x: -1, y:  1 },
  { x:  1, y: -1 }
]

/**
 * @param {{x:number,y:number}} pos 
 */
function countXmas(pos) {
  return directions.filter(direction => checkXmas(pos, direction)).length;
}

const xmasCount = xPos.map(countXmas).reduce((a, b) => a + b);
console.log(xmasCount);