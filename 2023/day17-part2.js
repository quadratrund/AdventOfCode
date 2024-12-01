const { readFileSync } = require('fs');

const buffer = readFileSync('input-day17.txt');
const text = buffer.toString('utf8').split('\n').filter(Boolean);
const grid = text.map(line => line.split('').map(Number));

const distanceGrid = grid.map(row => row.map(() => Object.fromEntries(['d', 'l', 'r', 'u'].map(direction => [direction, Array(4)]))));

const currentSteps = [{ x: 0, y: 0, direction: 'r', straightCounter: 0, lastDistance: 0}]

function getAllowedDirections(step) {
  const allowedDirections = [];
  if (step.straightCounter >= 4) {
    if (step.direction === 'l' || step.direction === 'r') {
      allowedDirections.push('d', 'u');
    }
    if (step.direction === 'd' || step.direction === 'u') {
      allowedDirections.push('l', 'r');
    }
  }
  if (step.straightCounter < 10) {
    allowedDirections.push(step.direction);
  }
  const dIndex = allowedDirections.indexOf('d');
  if (dIndex !== -1 && (step.y >= grid.length - 4 || step.x === grid[0].length - 1)) {
    allowedDirections.splice(dIndex, 1);
  }
  const lIndex = allowedDirections.indexOf('l');
  if (lIndex !== -1 && step.x < 4) {
    allowedDirections.splice(lIndex, 1);
  }
  const rIndex = allowedDirections.indexOf('r');
  if (rIndex !== -1 && (step.x >= grid[0].length - 4 || step.y === grid.length - 1)) {
    allowedDirections.splice(rIndex, 1);
  }
  const uIndex = allowedDirections.indexOf('u');
  if (uIndex !== -1 && step.y < 4) {
    allowedDirections.splice(uIndex, 1);
  }
  return allowedDirections;
}

function getNextXY(x, y, direction) {
  switch (direction) {
    case 'd':
      return { x, y: y + 1 };
    case 'l':
      return { x: x - 1, y };
    case 'r':
      return { x: x + 1, y };
    case 'u':
      return { x, y: y - 1 };
  }
}

while (currentSteps.every(step => step.x !== grid[0].length - 1 || step.y !== grid.length - 1)) {
  currentSteps.sort((a, b) => a.lastDistance - b.lastDistance);
  const step = currentSteps.shift();
  const allowedDirections = getAllowedDirections(step);
  const nextSteps = allowedDirections
    .map(direction => {
      const { x, y } = getNextXY(step.x, step.y, direction);
      const newDistance = grid[y][x];
      return {
      x,
      y,
      direction,
      straightCounter: direction === step.direction ? step.straightCounter + 1 : 1,
      lastDistance: step.lastDistance + newDistance
      };
    })
    .filter(nextStep => {
      const distances = distanceGrid[nextStep.y][nextStep.x][nextStep.direction];
      if (distances[nextStep.straightCounter] != null) {
        return false;
      }
      if (nextStep.straightCounter > 4) {
        for (let i = nextStep.straightCounter; i < 10 && distances[i] == null; i++) {
          distances[nextStep.straightCounter] = nextStep.lastDistance;
        }
      }
      return true;
    });
  for (const nextStep of nextSteps) {
    const index = currentSteps.findIndex(otherStep => nextStep.x === otherStep.x && nextStep.y === otherStep.y && nextStep.direction === otherStep.direction);
    if (index === -1) {
      currentSteps.push(nextStep);
    } else {
      const otherStep = currentSteps[index];
      if (otherStep.lastDistance >= nextStep.lastDistance && otherStep.straightCounter >= nextStep.straightCounter) {
        currentSteps.splice(index, 1, nextStep);
      } else if (otherStep.lastDistance > nextStep.lastDistance || otherStep.straightCounter > nextStep.straightCounter) {
        currentSteps.push(nextStep);
      }
    }
  }
}

console.log(distanceGrid[grid.length - 1][grid[0].length - 1]);