const input = require('../misc/load-input')().split('\n').filter(Boolean).map(line => line.split(': ')).map(([a, b]) => [a, b.split(' ')]);
const connections = input.flatMap(([a, b]) => b.map(c => [a, c]));
const renderedConnections = connections.map(([a, b]) => a + ' -- ' + b)
const graph = 'graph aaa {\n' + renderedConnections.join('\n') + '\n}';
console.log(graph);

// node day25-part1a.js | neato -Tpng -oday25.png /dev/stdin