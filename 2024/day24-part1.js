const input = require('../misc/load-input')().split('\n\n');
const initialValues = Object.fromEntries(input[0].split('\n').map(line => line.split(': ')).map(([key, value]) => [key, Boolean(Number(value))]));
const gateRegex = /^(\S+) (AND|X?OR) (\S+) -> (\S+)$/
const gates = Object.fromEntries(input[1].split('\n').filter(Boolean).map(line => line.match(gateRegex)).map(matches => [matches[4], { left: matches[1], operator: matches[2], right: matches[3] }]));

const wireValues = structuredClone(initialValues);
function getWireValue(name) {
  if (wireValues[name] != null) {
    return wireValues[name];
  }
  const gate = gates[name];
  const left = getWireValue(gate.left);
  const right = getWireValue(gate.right);
  let result;
  switch (gate.operator) {
    case 'AND':
      result = left && right;
      break;
    case 'OR':
      result = left || right;
      break;
    case 'XOR':
      result = left !== right;
      break;
  }
  wireValues[name] = result;
  return result;
}

const outputNames = Object.keys(gates).filter(name => name[0] === 'z').sort();
const outputValue = outputNames.map(getWireValue).map((x, i) => BigInt(x) << BigInt(i)).reduce((a, b) => a + b);
console.log(outputValue);