import React, { useRef, useEffect } from "react";
import styles from "./Modal.module.scss";
import CloseIcon from "../Icons/CloseIcon";

interface ModalProps {
  label: string;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ label, isOpen, onClose, children }) => {
  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen, onClose]);

  return isOpen ? (
    <div className={styles.overlay}>
      <div
        ref={modalRef}
        className={styles.modal}
      >
        <div className={styles.header}>
          <span className={styles.label}>{label}</span>
          <button
            className={styles.close}
            onClick={onClose}
          >
            <CloseIcon
              height={20}
              width={20}
            />
          </button>
        </div>
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  ) : null;
};

export default Modal;
