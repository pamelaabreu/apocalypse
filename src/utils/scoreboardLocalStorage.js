const addScores = (userScore, cpuScore) =>
  localStorage.setItem("scores", JSON.stringify({ userScore, cpuScore }));

const getScores = () =>
  JSON.parse(localStorage.getItem("scores")) || { userScore: 0, cpuScore: 0 };

export { addScores, getScores };
