const Vector = require('../misc/vector');
const codes = require('../misc/load-input')().split('\n').filter(Boolean);

const numericKeypad = {
  0: new Vector(1, 3),
  1: new Vector(0, 2),
  2: new Vector(1, 2),
  3: new Vector(2, 2),
  4: new Vector(0, 1),
  5: new Vector(1, 1),
  6: new Vector(2, 1),
  7: new Vector(0, 0),
  8: new Vector(1, 0),
  9: new Vector(2, 0),
  A: new Vector(2, 3),
  gap: new Vector(0, 3)
};

const directionalKeypad = {
  '^': new Vector(1, 0),
  '<': new Vector(0, 1),
  'v': new Vector(1, 1),
  '>': new Vector(2, 1),
  'A': new Vector(2, 0),
  gap: new Vector(0, 0)
}

/**
 * @param {Record<string, Vector>} keypad 
 * @param {string} code 
 */
function codeToMovements(keypad, code) {
  const buttons = code.split('').map(label => keypad[label]);
  let output = '';
  let currentButton = keypad.A;
  for (const button of buttons) {
    const diff = button.subtract(currentButton);
    if (
      (keypad.gap.x === currentButton.x || keypad.gap.x === button.x)
      && (keypad.gap.y === currentButton.y || keypad.gap.y === button.y)
    ) {
      for (let i = diff.x; i > 0; i--) {
        output += '>';
      }
      for (let i = diff.y; i > 0; i--) {
        output += 'v';
      }
      for (let i = diff.y; i < 0; i++) {
        output += '^';
      }
      for (let i = diff.x; i < 0; i++) {
        output += '<';
      }
    } else {
      // less movements for later robots
      for (let i = diff.x; i < 0; i++) {
        output += '<';
      }
      for (let i = diff.y; i > 0; i--) {
        output += 'v';
      }
      for (let i = diff.y; i < 0; i++) {
        output += '^';
      }
      for (let i = diff.x; i > 0; i--) {
        output += '>';
      }
    }
    output += 'A';
    currentButton = button;
  }
  return output;
}

/** @type {Record<string, Record<string, number>>} */
const cache = {};
/**
 * @param {Record<string, Vector>} keypad
 * @param {string} part
 */
function codePartToSplitMovements(keypad, part) {
  if (cache[part]) {
    return cache[part];
  }
  const movements = codeToMovements(keypad, part);
  const splitMovements = splitCode(movements);
  cache[part] = splitMovements;
  return splitMovements;
}

/**
 * @param {Record<string, number>} splitCode
 */
function splitCodeToMovements(splitCode) {
  /** @type {Record<string, number>} */
  const combinedMovements = {};
  for (const [part1, count1] of Object.entries(splitCode)) {
    const partMovements = codePartToSplitMovements(directionalKeypad, part1);
    for (const [part2, count2] of Object.entries(partMovements)) {
      combinedMovements[part2] ??= 0;
      combinedMovements[part2] += count1 * count2;
    }
  }
  return combinedMovements;
}

/**
 * 
 * @param {string} code
 * @returns {Record<string, number>}
 */
function splitCode(code) {
  const parts = code.split(/(?<=A)/);
  const splittedCode = {};
  for (const part of parts) {
    splittedCode[part] ??= 0;
    splittedCode[part]++;
  }
  return splittedCode;
}

function calcSplitCodeLength(code) {
  return Object.entries(code).map(([part, length]) => part.length * length).reduce((a, b) => a + b);
}

const complexitiesPart2 = codes.map(code1 => {
  let code2 = codePartToSplitMovements(numericKeypad, code1);
  for (let i = 25; i > 0; i--) {
    code2 = splitCodeToMovements(code2);
  }
  const length = calcSplitCodeLength(code2);
  const numericPart = Number(code1.substring(0, 3));
  const complexity = length * numericPart;
  return complexity;
});
const sumPart2 = complexitiesPart2.reduce((a, b) => a + b);
console.log(sumPart2);