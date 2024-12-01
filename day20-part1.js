const { readFileSync } = require('fs');

const buffer = readFileSync('input-day20.txt');
const text = buffer.toString('utf8');
const [workflowText, partsText] = text.split('\n\n').map(part => part.split('\n').filter(Boolean));

const workFlowList = workflowText.map(line => {
  const [name, ruleBlockText] = line.split(/\{|\}/);
  const rulesTexts = ruleBlockText.split(',');
  const rules = rulesTexts.map(x => {
    if (x.includes(':')) {
      const splitRule = x.split(/(?<=<|>)|(?=<|>)|:/);
      return {
        property: splitRule[0],
        operator: splitRule[1],
        value: Number(splitRule[2]),
        next: splitRule[3]
      };
    } else {
      return {
        operator: null,
        next: x
      };
    }
  });
  return [name, rules];
});
const workFlows = Object.fromEntries(workFlowList);
const firstWorkflowName = 'in';
console.log(workFlows);

const parts = partsText.map(line => Object.fromEntries(line.replace(/\{|\}/g, '').split(',').map(x => x.split('=')).map(([a, b]) => [a, Number(b)])));
console.log(parts);

function evaluateRules(part, rules) {
  for (const rule of rules) {
    switch (rule.operator) {
      case '<':
        if (part[rule.property] < rule.value) {
          return rule.next;
        }
        break;
      case '>':
        if (part[rule.property] > rule.value) {
          return rule.next;
        }
        break;
      default:
        return rule.next;
    }
  }
}

function runWorkflow(part, workflowName) {
  const rules = workFlows[workflowName];
  const next = evaluateRules(part, rules);
  switch (next) {
    case 'A':
      return true;
    case 'R':
      return false;
    default:
      return runWorkflow(part, next);
  }
}

const acceptedParts = parts.filter(part => runWorkflow(part, firstWorkflowName));
console.log(acceptedParts);
const sum = acceptedParts.flatMap(part => Object.values(part)).reduce((a, b) => a + b);
console.log(sum);
