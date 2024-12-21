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
 * @param {{[label: string]: Vector}} keypad 
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

const complexities = codes.map(code1 => {
  const code2 = codeToMovements(numericKeypad, code1);
  const code3 = codeToMovements(directionalKeypad, code2);
  const code4 = codeToMovements(directionalKeypad, code3);
  const length = code4.length;
  const numericPart = Number(code1.substring(0, 3));
  const complexity = length * numericPart;
  console.log([code1, code2, code3, code4])
  console.log(length, numericPart, complexity);
  return complexity;
});
const sum = complexities.reduce((a, b) => a + b);
console.log(sum);