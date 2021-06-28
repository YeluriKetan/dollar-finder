import React from "react";
import "./modal.css";

function Modal({ closeModal, modalContent, classname }) {
  React.useEffect(() => {
    setTimeout(() => {
      closeModal();
    }, 2000);
  });
  console.log(classname);
  return (
    <div className={classname}>
      <p>{modalContent}</p>
    </div>
  );
}

export default Modal;
