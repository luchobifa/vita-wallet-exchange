import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import Icon from "./Icon/Icon";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  title: string;
  description: string;
};

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  imageUrl,
  title,
  description,
}) => {
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden"; // Bloquear scroll del fondo
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "auto"; // Restaurar scroll
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="fixed inset-0 bg-black opacity-80 cursor-pointer"
        onClick={onClose}
      />
      <div className="bg-white w-fit h-fit rounded-lg py-20 px-32 relative mx-4">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 hover:opacity-70 transition-opacity cursor-pointer"
        >
          <Icon type="close-icon" />
        </button>

        <img
          src={imageUrl}
          alt={title}
          className="w-full h-48 object-cover rounded-t-lg"
        />
        <h2 className="text-subtitle text-blue-1 mt-8">{title}</h2>
        <p className="text-body mt-4">{description}</p>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
