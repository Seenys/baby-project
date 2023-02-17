// React
import { FC, useState } from "react";
// Styles & Icons
import { CgCloseO } from "react-icons/Cg";

const Modal: FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <div className="w-screen h-screen top-0 left-0 fixed  text-slate-900 flex flex-col">
      <div className="flex items-center justify-between border-b border-solid border-blue1 p-4">
        <h1 className="text-2xl font-bold">Modal</h1>
        <button type="button">
          <CgCloseO className="text-2xl" />
        </button>
      </div>
      <div className="p-4 flex flex-col gap-3">
        <h2>LogOut</h2>
      </div>
    </div>
  );
};

export default Modal;
