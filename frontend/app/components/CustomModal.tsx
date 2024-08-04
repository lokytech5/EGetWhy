import React from "react";

interface Props {
  title: string;
  message: string;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const CustomModal = ({ title, message, isOpen, onClose, onConfirm }: Props) => {
  return (
    <dialog id="my_modal_3" className={`modal ${isOpen ? "modal-open" : ""}`}>
      <div className="modal-box">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={onClose}
          >
            ✕
          </button>
        </form>
        <h3 className="font-bold text-lg">{title}</h3>
        <p className="py-4">{message}</p>
        <div className="modal-action">
          <button className="btn" onClick={onConfirm}>
            OK
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default CustomModal;
