import React from "react";

const Scoreboard = ({ cpuScore, userScore }) => {
  return (
    <div className="row whiteColor justify-content-center">
      <div className="col-3 p-0 border-right border-light d-flex flex-column justify-content-center align-items-center">
        <p>User</p>
        <p>{userScore}</p>
      </div>
      <div className="col-3 p-0 border-left border-light d-flex flex-column justify-content-center align-items-center">
        <p>CPU</p>
        <p>{cpuScore}</p>
      </div>
    </div>
  );
};

export default Scoreboard;
