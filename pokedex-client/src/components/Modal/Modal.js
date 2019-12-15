import React, { useRef, useEffect } from "react";
import "./Modal.css";
import useOnClickOutside from "../../hooks/useOnClickOutside";
import ReactDOM from "react-dom";

const modalRoot = document.getElementById("modal-root");

function ModalContent(props) {
  const modalContentRef = useRef();
  useOnClickOutside(modalContentRef, props.closeModal);
  return (
    <div className="modal">
      <div ref={modalContentRef} className="modal-content">
        {props.children}
      </div>
    </div>
  );
}

function Modal(props) {
  const element = useRef(document.createElement("div"));
  useEffect(() => {
    const currentElement = element.current;
    modalRoot.appendChild(currentElement);
    return () => modalRoot.removeChild(currentElement);
  }, []);
  return ReactDOM.createPortal(
    <ModalContent {...props}>{props.children}</ModalContent>,
    element.current
  );
}

export { Modal };
