const { candidates } = require('./data/candidates-data.js');

const selectNear = (candidatePoints, clientInputValue) => {
  return (candidatePoints + 1 === clientInputValue) || (candidatePoints - 1 === clientInputValue);
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
  let match = candidates[0];
  let score = 0;
  candidates.forEach((candidate) => {
    let candidateScore = 0;
    candidate.forEach((quizData, first) => {
      quizData.forEach((quiz, second) => {
        if (quiz.name.startsWith('question')) {
          const reqObj = quizSubmissions[first][second];
          const candidatePoints = parseInt(quiz.value, 10);
          const clientInputValue = parseInt(reqObj.value, 10);
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
