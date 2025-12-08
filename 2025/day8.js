const Vector = require('../misc/vector3d');
const input = require('../misc/load-input')().split('\n').filter(Boolean).map(line => line.split(',').map(Number)).map(line => new Vector(...line));
const connections = input
  .flatMap((boxA, indexA) =>
    input.slice(0, indexA).map((boxB, indexB) => ({ indexA, indexB, quareOfDistance: boxA.subtract(boxB).getSquareOfLength()}))
  )
  .sort((a, b) => a.quareOfDistance - b.quareOfDistance);

/** @type {{ [box: number]: Set<number> }} */
const networks = {};

function getNetworkOfBox(box) {
  return networks[box] ??= new Set([box]);
}

/** @type {{ boxA: number, boxB: number }} */
let latestConnectionConnectingNetworks;

function connectNetworks(boxA, boxB) {
  const networkA = getNetworkOfBox(boxA);
  if (networkA.has(boxB)) {
    return;
  }
  const networkB = getNetworkOfBox(boxB);
  for (const box of networkB) {
    networkA.add(box);
    networks[box] = networkA;
  }
  latestConnectionConnectingNetworks = { boxA, boxB };
}

for (const connection of connections.slice(0, 1000)) {
  connectNetworks(connection.indexA, connection.indexB);
}

const networkSizes = Array.from(new Set(Object.values(networks))).map(network => network.size).sort((a, b) => b - a);
const product1 = networkSizes[0] * networkSizes[1] * networkSizes[2];
console.log(product1);

// -----

for (const connection of connections.slice(1000)) {
  connectNetworks(connection.indexA, connection.indexB);
}

const product2 = input[latestConnectionConnectingNetworks.boxA].x * input[latestConnectionConnectingNetworks.boxB].x;
console.log(product2);