const map = require('../load-input')().replaceAll('\n', '').split('').map((x, i) =>
  i % 2
  ? { type: 'free', size: Number(x) }
  : { type: 'file', size: Number(x), id: i / 2 }
);
for (let i = map.length - 1; i >= 0; i--) {
  const file = map[i];
  if (file.type === 'file') {
    const freeIndex = map.slice(0, i).findIndex(info => info.type === 'free' && info.size >= file.size);
    if (freeIndex !== -1) {
      map[i - 1].size += file.size;
      const thingAfterFile = map[i + 1];
      if (thingAfterFile?.type === 'free') {
        map[i - 1].size += thingAfterFile.size;
        map.splice(i, 2);
      } else {
        map.splice(i, 1);
      }
      map[freeIndex].size -= file.size;
      map.splice(freeIndex, 0, file);
    }
  }
}

let position = 0;
let checkSum = 0;
for (const info of map) {
  if (info.type === 'free') {
    position += info.size;
  } else {
    for (let i = 0; i < info.size; i++) {
      checkSum += info.id * position
      position++;
    }
  }
}
console.log(checkSum);