import React from "react";
import "./Modal.css";

// Components
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Scoreboard from "../Scoreboard/Scoreboard";

const StartNewGameModal = ({
  show,
  userWon,
  onHide,
  secretWord,
  cpuScore,
  userScore
}) => {
  const winLoseMessage = userWon
    ? "Ya Win!"
    : `Ya Lose! The correct word was ${secretWord}.`;
  const winLoseBackground = userWon ? " win-background " : " lose-background ";

  return (
    <Modal
      centered
      backdrop="static"
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      show={show}
    >
      <Modal.Body
        className={
          "d-flex flex-column justify-content-center" + winLoseBackground
        }
      >
        {/* <-- Win/Lose Message --> */}
        <div className="d-flex justify-content-center align-items-center">
          <h4 className="whiteColor game-text-lg m-5">{winLoseMessage}</h4>
        </div>

        {/* <-- Scoreboard--> */}
        <div>
          <Scoreboard cpuScore={cpuScore} userScore={userScore} />
        </div>

        {/* <-- Start New Game --> */}
        <div className="d-flex justify-content-center align-items-center m-5">
          <Button variant="outline-light" onClick={onHide}>
            Start New Game?
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default StartNewGameModal;
