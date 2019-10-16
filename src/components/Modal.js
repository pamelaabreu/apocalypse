import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const BootstrapModal = ({ show, onHide }) => {
  return (
    <Modal
      centered
      backdrop="static"
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      show={show}
    >
      <Modal.Body>
        <h4>Centered Modal</h4>
        <Button onClick={onHide}>Start New Game</Button>
      </Modal.Body>
    </Modal>
  );
};

export default BootstrapModal;
