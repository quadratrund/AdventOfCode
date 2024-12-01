const { readFileSync } = require('fs');

const buffer = readFileSync('input-day20.txt');
const text = buffer.toString('utf8');
const workflowText = text.split('\n\n')[0].split('\n');

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

const parts = { x: [1, 4000], m: [1, 4000], a: [1, 4000], s: [1, 4000] }

function evaluateRules(parts, rules) {
  const remainingParts = structuredClone(parts);
  const results = [];
  for (const rule of rules) {
    const value = remainingParts[rule.property];
    switch (rule.operator) {
      case '<':
        if (value[1] < rule.value) {
          return rule.next;
        }
        break;
      case '>':
        if (value > rule.value) {
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

// Part 2
console.log(workFlowList.length);
let rCount = 0
let simplified;
do {
  simplified = false;
  const trivialWorkflows = [];
  for (const workFlow of workFlowList) {
    const rules = workFlow[1];
    while (rules.length > 1 && rules[rules.length - 2].next === rules[rules.length - 1].next) {
      rules.splice(rules.length - 2, 1);
      simplified = true;
      rCount++;
    }
    /*
    for (let i = 1; i < rules.length - 1; i++) {
      const rule = rules[i];
      for (const otherRule of rules.slice(0, i)) {
        if (rule.property === otherRule.property) {
          if (rule.operator === otherRule.operator) {
            if ((rule.operator === '<' && otherRule.value >= rule.value) || (rule.operator === '>' && otherRule.value <= rule.value)) {
              rules.splice(i, 1);
              rCount++;
              break;
            }
          } else if (rule.operator === '<' && rule.value <){
            console.log(rule, otherRule);
          }
        }
      }
    }
    for (let i = 0; i < rules.length - 2; i++) {
      const ruleA = rules[i];
      const ruleB = rules[i + 1];
      if (ruleA.next === ruleB.next && ruleA.operator === ruleB.operator && ruleA.property === ruleB.property) {

      }
    }
    */
    if (rules.length === 1) {
      trivialWorkflows.push(workFlow);
      simplified = true;
      rCount++;
    }
  }
  const trivialWorkflowsDict = Object.fromEntries(trivialWorkflows);
  for (const workFlow of workFlowList) {
    const rules = workFlow[1];
    for (const rule of rules) {
      while (trivialWorkflowsDict[rule.next]) {
        rule.next = trivialWorkflowsDict[rule.next][0].next;
      }
    }
  }
  for (const workFlow of trivialWorkflows) {
    delete workFlows[workFlow[0]];
    workFlowList.splice(workFlowList.indexOf(workFlow), 1);
  }
} while (simplified)

console.log(rCount);
console.log(workFlowList.length);