import React from "react";

const Scoreboard = ({cpuScore, userScore}) => {
    return <div>
        <p>User: {userScore}</p>
        <p>Secret Keeper: {cpuScore}</p>
    </div>
};

export default Scoreboard;