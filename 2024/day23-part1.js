const connections = require('../misc/load-input')().split('\n').filter(Boolean).map(line => line.split('-'));
/** @type {{[key: string]:string[]}} */
const mapping = {};
for (const [a, b] of connections) {
  mapping[a] ??= [];
  mapping[b] ??= [];
  mapping[a].push(b);
  mapping[b].push(a);
}
const groups = new Set();
for (const a in mapping) {
  const connectedComputersA = mapping[a];
  for (const [index, b] of connectedComputersA.entries()) {
    const connectedComputersB = new Set(mapping[b]);
    for (const c of connectedComputersA.slice(index + 1)) {
      if (connectedComputersB.has(c)) {
        const group = [a, b, c];
        if (group.some(x => x.startsWith('t'))) {
          group.sort();
          groups.add(group.join(','));
        }
      }
    }
  }
}
console.log(groups.size);
