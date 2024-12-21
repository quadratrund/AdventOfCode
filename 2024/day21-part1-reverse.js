const Vector = require('../misc/vector');

const numericKeypad = [
  '789'.split(''),
  '456'.split(''),
  '123'.split(''),
  [ null, '0', 'A']
];
numericKeypad.start = new Vector(2, 3);

const directionalKeypad = [
  [ null, '^', 'A'],
  [  '<', 'v', '>']
];
directionalKeypad.start = new Vector(2, 0);

const directions = {
  '^': Vector.north,
  'v': Vector.south,
  '>': Vector.east,
  '<': Vector.west
};

/**
 * @param {string[][] & { start: Vector }} keypad 
 * @param {string} movements 
 */
function movementsToCode(keypad, movements) {
  let output = '';
  let position = keypad.start;
  for (const button of movements.split('')) {
    if (button === 'A') {
      output += keypad[position.y][position.x];
    } else {
      position = position.add(directions[button]);
    }
  }
  return output;
}

const code4 = '<v<A>>^AvA^A<vA<AA>>^AAvA<^A>AAvA^A<vA>^AA<A>A<v<A>A>^AAAvA<^A>A';
console.log(code4);
const code3 = movementsToCode(directionalKeypad, code4);
console.log(code3);
const code2 = movementsToCode(directionalKeypad, code3);
console.log(code2);
const code1 = movementsToCode(numericKeypad, code2);
console.log(code1);