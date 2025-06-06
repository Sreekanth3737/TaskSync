import React from "react";
import styles from "./Modal.module.scss";
import Button from "../../atoms/Button/Button";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  size?: "small" | "medium" | "large" | "auto" | string; // string for custom width
}

const sizeToClass = (size?: string) => {
  if (!size || size === "medium") return styles.medium;
  if (size === "small") return styles.small;
  if (size === "large") return styles.large;
  if (size === "auto") return styles.auto;
  return ""; // fallback for custom width
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, size }) => {
  if (!isOpen) return null;
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={`${styles.modal} ${sizeToClass(size)}`}
        style={
          size && !["small", "medium", "large", "auto"].includes(size)
            ? { width: size }
            : {}
        }
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.closeButton}>
          <Button
            text="×"
            onClick={onClose}
            variant="primary"
            size="small"
            type="button"
          />
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
