const connections = require('../misc/load-input')().split('\n').filter(Boolean).map(line => line.split('-').sort());

/** @type {{[key: string]:Set<string>}} */
const mapping = {};
for (const [a, b] of connections) {
  mapping[a] ??= new Set();
  mapping[b] ??= new Set();
  mapping[a].add(b);
  mapping[b].add(a);
}

/**
 * @param {Set<string>} oldGroups
 */
function findGroupsOfNextSize(oldGroups) {
  /** @type {Set<string>} */
  const newGroups = new Set();
  for (const oldGroup of oldGroups) {
    const computers = oldGroup.split(',');
    const commonConnections = computers
      .map(computer => mapping[computer])
      .reduce((a, b) => a.intersection(b));
    for (const computer of commonConnections) {
      const newGroup = [...computers, computer].sort();
      newGroups.add(newGroup.join(','));
    }
  }
  return newGroups;
}

let groups = new Set(Object.keys(mapping));
while (true) {
  const nextGroups = findGroupsOfNextSize(groups);
  if (nextGroups.size === 0) {
    break;
  }
  groups = nextGroups;
}
console.log(groups);