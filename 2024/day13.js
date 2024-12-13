const regex = /Button A: X\+(\d+), Y\+(\d+)\nButton B: X\+(\d+), Y\+(\d+)\nPrize: X=(\d+), Y=(\d+)/;
const machines = require('../load-input')().split('\n\n')
  .map(section => section.match(regex))
  .map(section => section.map(Number))
  .map(([ , ax, ay, bx, by, x, y ]) => ({ ax, ay, bx, by, x, y }));

function calcTokens() {
  const pushes = machines.map(({ ax, ay, bx, by, x, y }) => {
    const b = (y - x * ay / ax) / (by - bx * ay / ax);
    const a = (x - b * bx) / ax;
    return { a, b, ax, ay, bx, by, x, y };
  });
  /*
  x = a * ax + b * bx
  y = a * ay + b * by

  a = (x - b * bx) / ax
  y = (x - b * bx) / ax * ay + b * by
  y = x * ay / ax - b * bx * ay / ax + b * by
  y - x * ay / ax = b * (by - bx * ay / ax)
  b = (y - x * ay / ax) / (by - bx * ay / ax)
  */

  const validPushes = pushes.map(({ a, b, ax, ay, bx, by, x, y }) => ({
    a: Math.round(a),
    b: Math.round(b),
    ax, ay, bx, by, x, y
  })).filter(({ a, b, ax, ay, bx, by, x, y }) =>
    x === a * ax + b * bx
    && y === a * ay + b * by
  );
  const tokens = validPushes.map(({ a, b }) => 3 * a + b).reduce((a, b) => a + b);
  console.log(tokens);
}

// Part 1
calcTokens();

// Part 2
for (const machine of machines) {
  machine.x += 10000000000000;
  machine.y += 10000000000000;
}
calcTokens();