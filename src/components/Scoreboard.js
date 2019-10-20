import React from "react";
import "./Scoreboard.css";

const Scoreboard = ({ cpuScore, userScore }) => {
  return (
    <div className="scoreboardGrid whiteColor">
      <div className="scoreboardBorder" />
      <p className="game-text userScoreTitle">User</p>
      <p className="game-text userScore">{userScore}</p>
      <p className="game-text cpuScoreTitle">CPU</p>
      <p className="game-text cpuScore">{cpuScore}</p>
    </div>
  );
};

export default Scoreboard;
