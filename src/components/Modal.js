import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const StartNewGameModal = ({ show, userWon, onHide, secretWord }) => {
  const winLoseMessage = userWon
    ? "Ya Win!"
    : `Ya Lose! The correct word was ${secretWord}.`;
  return (
    <Modal
      centered
      backdrop="static"
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      show={show}
    >
      <Modal.Body>
        <h4>{winLoseMessage}</h4>
        <Button onClick={onHide}>Start New Game?</Button>
      </Modal.Body>
    </Modal>
  );
};

export default StartNewGameModal;
