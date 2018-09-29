const { candidates } = require('./data/candidates-data.js');

const selectNear = (candidatePoints, clientInputValue) => {
  let flag = false;
  if (candidatePoints + 1 === clientInputValue) flag = true;
  if (candidatePoints - 1 === clientInputValue) flag = true;
  return flag;
};

const points = (candidatePoints, clientInputValue) => {
  if (candidatePoints === clientInputValue) {
    return 2;
  }
  if (selectNear(candidatePoints, clientInputValue)) {
    return 1;
  }
  return 0;
};

const calculateBestMatch = (quizSubmissions) => {
  // 一人目はどれだけ点数が低くてもマッチさせる
  let match = candidates[0];
  let score = 0;
  // 点数計算３重ネストリストを要素の数だけ回す
  // 人
  candidates.forEach((candidate) => {
    let candidateScore = 0;
    // オブジェクトを内包した配列
    candidate.forEach((quizData, first) => {
      // オブジェクト
      quizData.forEach((quiz, second) => {
        if (quiz.name.startsWith('question')) {
          const reqObj = quizSubmissions[first][second];
          const candidatePoints = parseInt(quiz.value);
          const clientInputValue = parseInt(reqObj.value);
          candidateScore += points(candidatePoints, clientInputValue);
        }
      });
    });
    if (candidateScore >= score) {
      match = candidate;
      score = candidateScore;
    }
  });
  return match;
};

module.exports = {
  calculateBestMatch,
  points,
  selectNear,
};
