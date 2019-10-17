const addScores = (userScores = 0, cpuScores = 0) => {
  const scores = JSON.parse(localStorage.getItem("scores")) || {
    userScores,
    cpuScores
  };

  localStorage.setItem("scores", JSON.stringify(scores));
};

const getScores = (userScores = 0, cpuScores = 0) =>
  JSON.parse(localStorage.getItem("scores")) || { userScores, cpuScores };

export default {addScores, getScores};
