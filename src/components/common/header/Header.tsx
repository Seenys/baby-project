//React
import React, { useState, useEffect } from "react";

// icons and images
import { AiOutlineSmile } from "react-icons/ai";

// hoks
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/router";

// components
import Modal from "@/components/UI/modal/Modal";

type Props = {};

const Header = (props: Props) => {
  const [openModal, setOpenModal] = useState<boolean>(false);

  return (
    <>
      {openModal && <Modal setOpenModal={setOpenModal} />}
      <div className="sticky top-0 w-full left-0 flex bg-inherit items-center justify-between p-4 border-b border-solid border-white">
        <h1 className="text-3xl select-none sm:text-6xl">Baby</h1>
        <button type="button" onClick={() => setOpenModal(true)}>
          <AiOutlineSmile className="text-3xl duration-300 cursor-pointer hover:opacity-40 sm:text-6xl" />
        </button>
      </div>
    </>
  );
};

export default Header;
