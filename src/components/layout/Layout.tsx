import { ChildrenProps } from "@/types/layout";
import { FC } from "react";
import { Footer, Header } from "../common";

const Layout: FC<ChildrenProps> = ({ children }) => {
  return (
    <div className=" flex flex-col min-h-screen relative bg-slate-900 text-white">
      <Header />
      <main className="flex-1 flex-col flex p-4">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
