// React
import React, { FC, useEffect, useState } from "react";
// Hooks
import { useForm } from "react-hook-form";
import useFetchData from "@/hooks/useFetchData";
// Types
import { Gift, Gifts } from "@/types/firebase";
// Icons
import { BsBookmarkCheck } from "react-icons/bs";
import { FcCheckmark } from "react-icons/fc";
import Swal from "sweetalert2";
import { Toast } from "@/alerts/toast";
import InfiniteScroll from "react-infinite-scroller";

interface Props {
  uid: string | string[];
}

interface FormInvite {
  Name: string;
  Gift: Gifts;
}
const initialState: Gift = {
  gift: "",
  selected: false,
  quantity: 0,
  id: "",
};

const GiftSelectorTemplate: FC<Props> = ({ uid }) => {
  const { dbGift, loading, error } = useFetchData(uid);
  const [giftArray, setGiftArray] = useState<Gifts>({});
  const [newObject, setNewObject] = useState<Gifts>({});

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInvite>();

  useEffect(() => {
    if (!dbGift) return;
    setGiftArray(dbGift);
  }, [dbGift]);

  const handleSelect = (id: string) => {
    const gift = giftArray[id];
    const { selected } = gift;
    setGiftArray({
      ...giftArray,
      [id]: {
        ...gift,
        selected: !selected,
      },
    });
    Toast.fire({
      icon: `${selected ? "error" : "success"}`,
      title: `${selected ? "Removed" : "Added"} ${gift.gift}`,
    });
  };

  const handleFetch = async () => dbGift;

  const onSubmit = handleSubmit(({ Name }) => {
    let selectedGifts = {};

    Object.keys(giftArray).map((item) => {
      const { id, selected } = giftArray[item];
      if (!selected) return;
      selectedGifts = {
        ...selectedGifts,
        [id]: {
          ...giftArray[item],
        },
      };
    });

    const inviteObject = {
      Name,
      Gift: { ...selectedGifts },
    };
    const { Gift } = inviteObject;
    if (Object.values(Gift).length === 0 || Name === "") return;

    console.log(inviteObject);
  });

  return (
    <>
      <div className="flex-1 flex flex-col h-screen  items-center text-xs sm:text-sm">
        <h1>GiftSelectorTemplate</h1>
        <div className="flex lg:flex-row items-center flex-col-reverse w-full h-full">
          <div className="lg:w-3/5 w-auto h-fit items-center">
            {!loading && (
              <InfiniteScroll
                pageStart={0}
                loadMore={handleFetch}
                loader={
                  <div className="loader" key={0}>
                    Loading ...
                  </div>
                }
                useWindow={false}
                className="grid gap-x-8 gap-y-4 lg:grid-cols-3 grid-cols-2 m-4"
              >
                {Object.keys(giftArray).map((gift) => {
                  const { id, gift: giftName, selected } = giftArray[gift];
                  return (
                    <div
                      key={gift}
                      onClick={() => handleSelect(gift)}
                      className={`w-full cursor-pointer outline-none border border-solid rounded-lg  justify-center items-center duration-300 hover:bg-slate-700 ${
                        selected ? "border-green-400" : "border-blue1"
                      }`}
                    >
                      <div className="flex flex-shrink p-4 h-full w-full justify-center items-center">
                        <h1 className="flex-1">{giftName}</h1>
                        {selected && (
                          <BsBookmarkCheck className="text-2xl text-green-400" />
                        )}
                      </div>
                    </div>
                  );
                })}
              </InfiniteScroll>
            )}
          </div>
          <div className="lg:w-2/5 w-auto outline-none border border-solid border-blue1 m-4 p-4">
            <h1 className="text-2xl">Gifts</h1>
            <div className="flex flex-col  sm:gap-5">
              {Object.keys(giftArray).map((item) => {
                const { gift: giftName, selected } = giftArray[item];
                return (
                  selected && (
                    <div
                      key={item}
                      className="flex justify-center gap gap-2 items-center m-2"
                    >
                      <FcCheckmark className="text-xl text-green-400" />
                      <h1 className="flex flex-1">{giftName}</h1>
                    </div>
                  )
                );
              })}
            </div>

            <form onSubmit={onSubmit} className="flex flex-col gap-3 sm:gap-5">
              <label>Name:</label>
              <div className="flex flex-col gap gap-4">
                <input
                  {...register("Name")}
                  type="text"
                  required
                  placeholder="Please enter your name"
                  className="flex-1 outline-none border border-solid border-blue1 rounded-lg p-2 text-slate-900"
                />
                <span className="text-red-500 text-sm">
                  {errors.Name?.message}
                </span>
                <button
                  type="submit"
                  className="outline-none border border-solid border-blue1 rounded-lg p-2"
                >
                  Enviar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default GiftSelectorTemplate;
