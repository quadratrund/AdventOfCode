const input = require('../misc/load-input')().split('\n').filter(Boolean).map(line => line.split(': ')[1]);
let registerA = Number(input[0]);
let registerB = Number(input[1]);
let registerC = Number(input[2]);
const program = input[3].split(',').map(Number);

function parseComboOperand(operand) {
  switch (operand) {
    case 4:
      return 'A';
    case 5:
      return 'B';
    case 6:
      return 'C';
    default:
      return operand;
  }
}

function opName(op) {
  switch(op) {
    case 0: return 'adv';
    case 1: return 'bxl';
    case 2: return 'bst';
    case 3: return 'jnz';
    case 4: return 'bxc';
    case 5: return 'out';
    case 6: return 'bdv';
    case 7: return 'cdv';
  }
}

console.log(registerA, registerB, registerC, program);

for (let instructionPointer = 0; instructionPointer < program.length; instructionPointer += 2) {
  const operand = program[instructionPointer + 1];
  let parsedOperand;
  switch(program[instructionPointer]) {
    case 0: // adv
    case 5: // out
    case 6: // bdv
    case 7: // cdv
      parsedOperand = parseComboOperand(operand);
      break;
    case 1: // bxl
    case 3: // jnz
      parsedOperand = operand;
      break;
    case 2: // bst
      parsedOperand = parseComboOperand(operand);
      break;
    case 4: // bxc
      parsedOperand = '';
      break;
  }
  let long;
  switch(program[instructionPointer]) {
    case 0: // adv
      long = `A = A >> ${parsedOperand})`;
      break;
    case 1: // bxl
      long = `B = B XOR ${parsedOperand}`;
      break;
    case 2: // bst
      long = `B = ${parsedOperand} % 8`;
      break;
    case 3: // jnz
      long = '';
      break;
    case 4: // bxc
      long = ' B = B XOR C';
      break;
    case 5: // out
      long = `print(${parsedOperand} % 8)`;
      break;
    case 6: // bdv
      long = `B = A >> ${parsedOperand})`;
      break;
    case 7: // cdv
      long = `C = A >> ${parsedOperand})`;
      break;
  }
  console.log(`${String(instructionPointer + 100).substring(1)} ${opName(program[instructionPointer])} ${parsedOperand} ${long}`);
}