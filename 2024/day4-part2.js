const { readFileSync } = require('fs');

const buffer = readFileSync('input-day4.txt');
const input = buffer.toString('utf8').split('\n').filter(Boolean);
const aPos = input.flatMap((line, y) => line.split('').map((char, x) => ({char, x})).filter(({char}) => char === 'A').map(({x}) => ({ x, y })));

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
 * @param {{x:number,y:number}} point
 */
function negPoint(point) {
  return {
    x: -point.x,
    y: -point.y
  };
}

/**
 * @param {{x:number,y:number}} pos 
 * @param {{x:number,y:number}} direction 
 */
function checkMas(pos, direction) {
  const pa = addPoints(pos, direction);
  const pb = addPoints(pos, negPoint(direction));
  const a = input[pa.y]?.[pa.x];
  const b = input[pb.y]?.[pb.x];
  return a !== b && 'MS'.includes(a) && 'MS'.includes(b);
}

/**
 * @param {{x:number,y:number}} pos 
 */
function checkXmas(pos) {
  return checkMas(pos, { x: 1, y: 1 }) && checkMas(pos, { x: 1, y: -1 });
}

const xmasCount = aPos.filter(checkXmas).length;
console.log(xmasCount);