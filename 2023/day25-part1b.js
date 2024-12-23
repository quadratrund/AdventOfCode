const input = require('../misc/load-input')().split('\n').filter(Boolean).map(line => line.split(': ')).map(([a, b]) => [a, b.split(' ')]);
const connections = input.flatMap(([a, b]) => b.map(c => [a, c]));
const connectionsToRemove = [['xvh', 'dhn'], ['lxt', 'lsv'], ['qmr', 'ptj']];
const filteredConnections = connections.filter(conn => connectionsToRemove.every(rem => !conn.includes(rem[0]) || !conn.includes(rem[1])));
const groups = {};
const groupSet = new Set();
for (const [a, b] of filteredConnections) {
  const A = groups[a];
  const B = groups[b];
  if (A && !B) {
    A.add(b);
    groups[b] = A;
  } else if (!A && B) {
    B.add(a);
    groups[a] = B;
  } else if (!A && !B) {
    groupSet.add(groups[a] = groups[b] = new Set([a, b]));
  } else if (A !== B) {
    B.forEach(x => {
      A.add(x);
      groups[x] = A;
    });
    groupSet.delete(B);
  }
}
const groupSizes = Array.from(groupSet).map(x => x.size);
console.log(groupSizes[0] * groupSizes[1]);