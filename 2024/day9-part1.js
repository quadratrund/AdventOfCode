const map = require('../load-input')().replaceAll('\n', '').split('').map(Number);
let movedSize = 0;
let lastFileIndex = map.length - 1;
lastFileIndex -= lastFileIndex % 2;
let position = 0;
let checkSum = 0;
for (let [index, size] of map.entries()) {
  if (index % 2) {
    for (let i = 0; i < size; i++) {
      if (lastFileIndex < index) {
        break;
      }
      const lastFileSize = map[lastFileIndex];
      const lastFileId = lastFileIndex / 2;
      checkSum += lastFileId * position;
      movedSize++;
      if (movedSize >= lastFileSize) {
        movedSize = 0;
        lastFileIndex -= 2;
      }
      position++;
    }
    if (lastFileIndex < index) {
      break;
    }
  } else {
    const fileId = index / 2;
    if (index === lastFileIndex) {
      size -= movedSize;
    }
    for (let i = 0; i < size; i++) {
      checkSum += fileId * position
      position++;
    }
  }
}
console.log(checkSum);