const { candidates } = require('./data/candidates-data.js');

const calculateScore = function(value1, value2) {
  if (value1 === value2) {
    return 2;
  } else if (value1 + 1 === value2 || value1 - 1 === value2) {
    return 1;
  }

  return 0;
};

const calculateBestMatch = function(quizSubmissions) {
  let bestMatch = candidates[0];
  let bestMatchScore = 0;

  candidates.forEach(candidate => {
    let candidateScore = 0;

    candidate.forEach((questionGroup, g) => {
      questionGroup.forEach((question, q) => {
        if (question.name.startsWith('question')) {
          const submission = quizSubmissions[g][q];
          const candidateValue = parseInt(question.value);
          const submissionValue = parseInt(submission.value);

          candidateScore =
            candidateScore + calculateScore(candidateValue, submissionValue);
        }
      });
    });

    if (candidateScore >= bestMatchScore) {
      bestMatch = candidate;
      bestMatchScore = candidateScore;
    }
  });

  return bestMatch;
};

module.exports = {
  calculateBestMatch,
  calculateScore
};
