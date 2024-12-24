const input = require('../misc/load-input')().split('\n\n');
const gateRegex = /^(\S+) (AND|X?OR) (\S+) -> (\S+)$/
const gates = input[1].split('\n').filter(Boolean).map(line => line.match(gateRegex)).map(matches => ({ left: matches[1], operator: matches[2], right: matches[3], output: matches[4] }));

function renameGate(gate, newName) {
  for (const otherGate of gates) {
    if (otherGate.left === gate.output) {
      otherGate.left = newName;
    }
    if (otherGate.right === gate.output) {
      otherGate.right = newName;
    }
  }
  gate.output = newName;
}

for (const gate of gates) {
  renameGate(gate, gate.operator + '_' + gate.output);
}

console.log('digraph aaa {');
for (const gate of gates) {
  console.log(gate.left + ' -> ' + gate.output);
  console.log(gate.right + ' -> ' + gate.output);
}
console.log('}');

// node day24-part2a.js | dot -Tpng -oday24.png /dev/stdin