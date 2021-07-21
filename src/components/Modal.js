import React from "react";
import "./modal.css";

function Modal({ closeModal, modalContent, classname }) {
  React.useEffect(() => {
    setTimeout(() => {
      closeModal();
    }, 2000);
  });
  return (
    <div className={"general-modal " + classname}>
      <p>{modalContent}</p>
    </div>
  );
}

export default Modal;
