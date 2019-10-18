import React from "react";

const Scoreboard = ({ cpuScore, userScore }) => {
  return (
    <div className="row whiteColor justify-content-center">
      <div className="col-3 p-0 border-right border-light d-flex flex-column justify-content-center align-items-center">
        <p className="game-text">User</p>
        <p className="game-text">{userScore}</p>
      </div>
      <div className="col-3 p-0 border-left border-light d-flex flex-column justify-content-center align-items-center">
        <p className="game-text">CPU</p>
        <p className="game-text">{cpuScore}</p>
      </div>
    </div>
  );
};

export default Scoreboard;
