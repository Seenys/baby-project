//React
import React, { useState } from "react";

// icons and images
import { AiOutlineSmile } from "react-icons/ai";

// hoks
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/router";

type Props = {};

const Header = (props: Props) => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const { logOut } = useAuth();
  const Router = useRouter();

  const handlerLogOut = async () => {
    try {
      await logOut();
      Router.push("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="sticky top-0 w-full left-0 flex bg-inherit items-center justify-between p-4 border-b border-solid border-white">
      <h1 className="text-3xl select-none sm:text-6xl">Baby</h1>
      <button type="button" onClick={() => handlerLogOut()}>
        <AiOutlineSmile className="text-3xl duration-300 cursor-pointer hover:opacity-40 sm:text-6xl" />
      </button>
    </div>
  );
};

export default Header;
