import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const BootstrapModal = ({ show, userWon, onHide }) => {
    const winLoseMessage = userWon ? "Ya Win! Start New Game?" : "Ya Lose! Start New Game?"
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
        <Button onClick={onHide}>Start New Game</Button>
      </Modal.Body>
    </Modal>
  );
};

export default BootstrapModal;
