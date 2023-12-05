const { readFileSync } = require('fs');

const buffer = readFileSync('input-day5.txt');
const text = buffer.toString('utf8');
const sectionsRaw = text.split('\n\n');
const seeds = sectionsRaw.shift().split(' ').slice(1).map(Number);
const seedRanges = Array(seeds.length / 2).fill(null).map((_, i) => seeds.slice(i * 2, i * 2 + 2)).map(([start, len]) => ({start, len}));
console.log(seedRanges);
const sections = sectionsRaw.map(s => s
  .split('\n')
  .slice(1)
  .map(l => l.split(' ').map(Number))
  .map(([dst, src, len]) => ({ dst, src, len }))
  .sort((a, b) => b.src - a.src)
);
//console.log(sections);
let currentRanges = seedRanges;
for (const section of sections) {
  currentRanges = currentRanges.flatMap(r => {
    const maps = section.filter(m => m.src < r.start + r.len && m.src + m.len > r.start);
    const resultRanges = [];
    while (r.len > 0) {
      const lowestMap = maps.pop();
      if (!lowestMap) {
        resultRanges.push(r);
        break;
      } else {
        if (lowestMap.src > r.start) {
          resultRanges.push({ start: r.start, length: lowestMap.src - r.start });
        }
        const mapEndExclusive = lowestMap.src + lowestMap.len;
        const translatedStart = r.start - lowestMap.src + lowestMap.dst;
        if (mapEndExclusive >= r.start + r.len) {
          resultRanges.push({ start: translatedStart, len: r.len });
          break;
        } else {
          const len = mapEndExclusive - r.start;
          resultRanges.push({ start: translatedStart, len });
          r = { start: r.start + len, len: r.len - len };
        }
      }
    }
    return resultRanges;
  })
  console.log(currentRanges);
}
const minLocation = Math.min(...currentRanges.map(x => x.start));
console.log(minLocation);