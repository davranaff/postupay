import React from "react";
import styles from "./modal.module.css";

const Modal = ({ open, onClose, children }) => {
    if (!open) return null;

    return (
        <div className={styles.modalBackdrop} onClick={onClose}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};

export default Modal;
