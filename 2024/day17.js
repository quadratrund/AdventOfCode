const input = require('../misc/load-input')().split('\n').filter(Boolean).map(line => line.split(': ')[1]);
let A = BigInt(input[0]);
let B = BigInt(input[1]);
let C = BigInt(input[2]);
const program = input[3].split(',').map(BigInt);

function runProgram(registerA, registerB, registerC) {
  function parseComboOperand(operand) {
    switch (operand) {
      case 4n:
        return registerA;
      case 5n:
        return registerB;
      case 6n:
        return registerC;
      default:
        return operand;
    }
  }

  const output = [];
  for (let instructionPointer = 0; instructionPointer < program.length; instructionPointer += 2) {
    const operand = program[instructionPointer + 1];
    switch(program[instructionPointer]) {
      case 0n: // adv
        registerA = registerA >> parseComboOperand(operand);
        break;
      case 1n: // bxl
        registerB ^= operand;
        break;
      case 2n: // bst
        registerB = parseComboOperand(operand) % 8n;
        break;
      case 3n: // jnz
        if (registerA !== 0n) {
          instructionPointer = Number(operand) - 2;
        }
        break;
      case 4n: // bxc
        registerB ^= registerC;
        break;
      case 5n: // out
        output.push(parseComboOperand(operand) % 8n);
        break;
      case 6n: // bdv
        registerB = registerA >> parseComboOperand(operand);
        break;
      case 7n: // cdv
        registerC = registerA >> parseComboOperand(operand);
        break;
    }
  }
  return output;
}
const output = runProgram(A, B, C);
console.log(output.join(','));

// -----

const expectedOutput = program.join('');
const initValues = [0n];
let inputValue;
while (initValues.length <= program.length) {
  inputValue = 0n;
  initValues.forEach(v => {
    inputValue <<= 3n;
    inputValue += v
  });
  const programOutput = runProgram(inputValue, B, C).join('');
  if (expectedOutput.substring(expectedOutput.length - initValues.length) === programOutput) {
    initValues.push(0n);
  } else {
    while (initValues[initValues.length - 1] === 7n) {
      initValues.pop();
    }
    if (initValues.length === 0) {
      break;
    }
    initValues[initValues.length - 1]++;
  }
}
console.log(inputValue);