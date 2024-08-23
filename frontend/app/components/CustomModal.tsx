import React, { ReactNode } from "react";

interface Props {
  title: string;
  message?: string;
  content?: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const CustomModal = ({ title, message, content, isOpen, onClose, onConfirm }: Props) => {
  return (
    <dialog id="my_modal_3" className={`modal ${isOpen ? "modal-open" : ""}`}>
      <div className="modal-box bg-[#1c2b3a] text-white rounded-lg shadow-lg p-6 max-w-lg mx-auto">        
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
        {content && <div className="py-4">{content}</div>}
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
