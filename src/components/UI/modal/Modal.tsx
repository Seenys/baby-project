// React
import { FC, useEffect, useState } from "react";
import ReactDOM from "react-dom";

//hooks
import { useAuth } from "@/context/AuthContext";

// Styles & Icons
import { CgCloseO } from "react-icons/Cg";

//interface
interface ModalProps {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const Modal: FC<ModalProps> = ({ setOpenModal }) => {
  const [_document, setDocument] = useState<null | Document>(null);

  const { logOut } = useAuth();

  useEffect(() => {
    setDocument(document);
  }, []);

  if (!_document) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-white text-slate-900 text-lg sm:text-xl flex flex-col">
      <div className="flex items-center justify-between border-b border-solid border-blue1 p-4">
        <h1 className="text-3xl font-extrabold sm:text-5xl select-none">
          Modal
        </h1>
        <button type="button">
          <CgCloseO
            onClick={() => setOpenModal(false)}
            className="text-3xl duration-300 cursor-pointer hover:rotate-90 sm:text-3xl"
          />
        </button>
      </div>
      <div className="p-4 flex flex-col gap-3">
        <h2
          onClick={() => {
            logOut();
            setOpenModal(false);
          }}
          className="select-none duration-300 hover:pl-2 cursor-pointer "
        >
          LogOut
        </h2>
      </div>
    </div>,
    _document.getElementById("portal")!
  );
};

export default Modal;
