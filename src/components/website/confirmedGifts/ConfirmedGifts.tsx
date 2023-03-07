//React
import React, { useEffect, useState } from "react";
// Hooks
import { useAuth } from "@/context/AuthContext";
import useFetchData from "@/hooks/useFetchData";

const ConfirmedGifts = () => {
  const { loading, error, dbConfirmed } = useFetchData();
  const [stateGifts, setStateGifts] = useState<any>();

  useEffect(() => {
    if (!dbConfirmed) return;
    setStateGifts(dbConfirmed);
  }, [dbConfirmed]);

  return loading ? (
    <div>loading</div>
  ) : (
    <div>
      <h1 className=" text-lg text-center">Confirmed Gifts</h1>
      {stateGifts &&
        Object.keys(stateGifts).map((gift: any) => {
          const { Name, Gift: giftList } = stateGifts[gift];
          return (
            <div
              key={gift}
              className="flex flex-1 flex-row w-auto border borde-b border-blue2 gap gap-4 m-4 rounded-sm justify-center items-center"
            >
              <div className="flex w-1/2 justify-center items-center">
                <p>{Name}</p>
              </div>
              <div className="grid gap-x-8 gap-y-4 lg:grid-cols-4 grid-cols-2 m-4 w-1/2 justify-center items-center">
                {giftList.map((gift: any) => {
                  return (
                    <div
                      key={gift}
                      className="w-full cursor-pointer outline-none border border-solid rounded-lg  justify-center items-center duration-300 hover:bg-slate-700 border-blue2 gap gap-4 "
                    >
                      <div className="flex flex-shrink p-4 h-full w-full justify-center items-center">
                        <p>{gift}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default ConfirmedGifts;
