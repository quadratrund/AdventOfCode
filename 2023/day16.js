const { readFileSync } = require('fs');

const buffer = readFileSync('input-day16.txt');
const text = buffer.toString('utf8');
const grid = text.split('\n').filter(Boolean).map(line => line.split(''));

const directionChanges = {
  '.': {
    d: ['d'],
    l: ['l'],
    r: ['r'],
    u: ['u']
  },
  '/': {
    d: ['l'],
    l: ['d'],
    r: ['u'],
    u: ['r']
  },
  '\\': {
    d: ['r'],
    l: ['u'],
    r: ['d'],
    u: ['l']
  },
  '|': {
    d: ['d'],
    l: ['d', 'u'],
    r: ['d', 'u'],
    u: ['u']
  },
  '-': {
    d: ['l', 'r'],
    l: ['l'],
    r: ['r'],
    u: ['l', 'r']
  }
}

function Step(xOrString, y, direction) {
  if (typeof xOrString === 'string') {
    [this.x, this.y, this.direction] = xOrString.split('|');
  } else {
    this.x = xOrString;
    this.y = y;
    this.direction = direction;
  }
}
Step.prototype.toString = function() {
  return `${this.x}|${this.y}|${this.direction}`;
}
Step.prototype.nextStep = function(direction) {
  switch (direction) {
    case 'd':
      return new Step(this.x, this.y + 1, 'd');
    case 'l':
      return new Step(this.x - 1, this.y, 'l');
    case 'r':
      return new Step(this.x + 1, this.y, 'r');
    case 'u':
      return new Step(this.x, this.y - 1, 'u');
  }
}

const energyInGrid = grid.map(row => row.map(() => false));
const stepHistory = [];

function walk(currentStep, energyInGrid) {
  if (currentStep.x < 0 || currentStep.x === grid[0].length || currentStep.y < 0 || currentStep.y === grid.length || stepHistory.includes(currentStep.toString())) {
    return;
  }
  stepHistory.push(currentStep.toString());
  energyInGrid[currentStep.y][currentStep.x] = true;
  const nextDirections = directionChanges[grid[currentStep.y][currentStep.x]][currentStep.direction];
  const nextSteps = nextDirections.map(direction => currentStep.nextStep(direction));
  for (const nextStep of nextSteps) {
    walk(nextStep, energyInGrid);
  }
}

// Part 1
walk(new Step(0, 0, 'r'), energyInGrid);
const energizedCount = energyInGrid.flat().filter(x => x).length;
console.log(energizedCount);

// Part 2 (very slow, but it works)
const startingSteps = [];
for (let y = 0; y < grid.length; y++) {
  startingSteps.push(
    new Step(0, y, 'r'),
    new Step(grid[0].length - 1, y, 'l')
  );
}
for (let x = 0; x < grid[0].length; x++) {
  startingSteps.push(
    new Step(x, 0, 'd'),
    new Step(x, grid.length - 1, 'u')
  );
}
const counts = startingSteps.map(step => {
  process.stdout.write('.');
  stepHistory.splice(0);
  const energyGrid = grid.map(row => row.map(() => false));
  walk(step, energyGrid);
  return energyGrid.flat().filter(x => x).length;
});
console.log();
//console.log(counts);
console.log(Math.max(...counts));