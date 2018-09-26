const { calculateBestMatch, points } = require('./compatibility-calculator');
const { candidates } = require('./data/candidates-data.js');
// your test code here

function expects(expectation, actual, message = 'テスト') {
  if (expectation !== actual){
    throw `${message}:期待値と実際の値が一致しない。expectation: ${expectation}, actual: ${actual}`;
  }
  console.log(`${message}:成功した。`);
}

function expectBestMatch(expectation, actual, message = 'テスト') {
  const strExpectation = JSON.stringify(expectation);
  const strActual = JSON.stringify(actual);
  if (strExpectation !== strActual){
    throw `${message}:期待値と実際の値が一致しない。expectation: ${strExpectation}, actual: ${strActual}`;
  }
  console.log(`${message}:成功した。`);
}


expects(points(1, 1), 2, 'return 2');
expects(points(2, 1), 1, 'return 1');
expects(points(1, 2), 1, 'return 1');
expects(points(4, 0), 0, 'return 0');
expects(points(1, 3), 0, 'return 0');


expectBestMatch(calculateBestMatch(candidates[0])).toEqual(candidates[0]);
expectBestMatch(calculateBestMatch(candidates[1])).toEqual(candidates[1]);
expectBestMatch(calculateBestMatch(candidates[2])).toEqual(candidates[2]);
expectBestMatch(calculateBestMatch(candidates[3])).toEqual(candidates[3]);

console.log('全て成功した。');
