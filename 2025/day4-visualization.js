const input = require('../misc/load-input')().split('\n').filter(Boolean).map(line => line.split(''));
const Vector = require('../misc/vector');

function getAdjacentPositions(paperRoll) {
  const { x, y } = paperRoll;
  const positions = [
    new Vector(x - 1, y - 1),
    new Vector(x,     y - 1),
    new Vector(x + 1, y - 1),
    new Vector(x + 1, y    ),
    new Vector(x + 1, y + 1),
    new Vector(x,     y + 1),
    new Vector(x - 1, y + 1),
    new Vector(x - 1, y    )
  ];
  return positions;
}

/**
 * @param {Vector} paperRoll 
 */
function getAdjacentPaperRollCount(paperRoll) {
  const positions = getAdjacentPositions(paperRoll);
  return positions.filter(position =>
    input[position.y]?.[position.x] === '@'
  ).length;
}

const adjacentPaperRollsMap = [];
const accessiblePaperRoles = [];
for (let y = 0; y < input.length; y++) {
  const adjacentPaperRollsMapRow = [];
  adjacentPaperRollsMap.push(adjacentPaperRollsMapRow);
  for (let x = 0; x < input[y].length; x++) {
    if (input[y][x] === '@') {
      const paperRoll = new Vector(x, y);
      const adjacentPaperRolls = getAdjacentPaperRollCount(paperRoll);
      adjacentPaperRollsMapRow[x] = adjacentPaperRolls;
      if (adjacentPaperRolls < 4) {
        accessiblePaperRoles.push(paperRoll);
      }
    }
  }
}

(async () => {
  console.log('\n' + input.map(row => row.join('')).join('\n'));
  await new Promise(r => setTimeout(r, 1000));
  while(accessiblePaperRoles.length > 0) {
    const paperRollsOfStep = accessiblePaperRoles.splice(0);
    for (const paperRoll of paperRollsOfStep) {
      const positions = getAdjacentPositions(paperRoll);
      for (const position of positions) {
        const adjacentPaperRolls = adjacentPaperRollsMap[position.y]?.[position.x];
        if (adjacentPaperRolls != null) {
          adjacentPaperRollsMap[position.y][position.x] = adjacentPaperRolls - 1;
          if (adjacentPaperRolls === 4) {
            accessiblePaperRoles.push(position);
          }
        }
      }
      input[paperRoll.y][paperRoll.x] = ':';
    }
    console.log('\n' + input.map(row => row.join('')).join('\n'));
    await new Promise(r => setTimeout(r, 50));
  }
})().catch(console.log)
