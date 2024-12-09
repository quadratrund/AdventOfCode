const reports = require('../load-input')().split('\n').filter(Boolean).map(report => report.split(/\s+/).map(Number));

/**
 * @param {number[]} report
 */
function reportIsSafe1(report) {
  const diffs = report.slice(1).map((level, index) => level - report[index]);
  return diffs.map(Math.abs).every(diff => diff <= 3)
    && (
      diffs.every(diff => diff > 0) || diffs.every(diff => diff < 0)
    );
}

const safeReports1 = reports.filter(reportIsSafe1);
console.log(safeReports1.length);

// ----
/**
 * @param {number[]} report
 */
function reportIsSafe2(report) {
  return report.some((_, index) => reportIsSafe1([...report.slice(0, index), ...report.slice(index + 1)]));
}
const safeReports2 = reports.filter(reportIsSafe2);
console.log(safeReports2.length);