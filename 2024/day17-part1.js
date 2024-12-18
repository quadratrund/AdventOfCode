const input = require('../misc/load-input')().split('\n').filter(Boolean).map(line => line.split(': ')[1]);
let A = Number(input[0]);
let B = Number(input[1]);
let C = Number(input[2]);
const program = input[3].split(',').map(Number);

console.log(program.join(','));

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

function runProgram(registerA, registerB, registerC) {
  function parseComboOperand(operand) {
    switch (operand) {
      case 4:
        return registerA;
      case 5:
        return registerB;
      case 6:
        return registerC;
      default:
        return operand;
    }
  }

  //console.log(registerA, registerB, registerC, program);

  const output = [];
  for (let instructionPointer = 0; instructionPointer < program.length; instructionPointer += 2) {
    const operand = program[instructionPointer + 1];
    //console.log(`A=${registerA} B=${registerB} C=${registerB} OP=${opName(program[instructionPointer])} LO=${operand} CO=${parseComboOperand(operand)}`);
    switch(program[instructionPointer]) {
      case 0: // adv
        registerA = Math.floor(registerA / Math.pow(2, parseComboOperand(operand)));
        break;
      case 1: // bxl
        registerB ^= operand;
        break;
      case 2: // bst
        registerB = parseComboOperand(operand) % 8;
        break;
      case 3: // jnz
        if (registerA !== 0) {
          instructionPointer = operand - 2;
        }
        break;
      case 4: // bxc
        registerB ^= registerC;
        break;
      case 5: // out
        output.push(parseComboOperand(operand) % 8);
        break;
      case 6: // bdv
        registerB = Math.floor(registerA / Math.pow(2, parseComboOperand(operand)));
        break;
      case 7: // cdv
        registerC = Math.floor(registerA / Math.pow(2, parseComboOperand(operand)));
        break;
    }
  }
  //console.log(`A=${registerA} B=${registerB} C=${registerB}`);
  return output;
}
const output = runProgram(A, B, C);
console.log(output.join(','));
