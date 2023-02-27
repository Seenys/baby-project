// React
import React, { FC, useEffect, useState } from "react";
// Hooks
import { useForm } from "react-hook-form";
import useFetchData from "@/hooks/useFetchData";
import { useGiftStore, setIsSelected } from "@/stores/giftStore";
// Types
import { Gift, Gifts } from "@/types/firebase";
// Icons
import { BsBookmarkCheck, BsFillBookmarkHeartFill } from "react-icons/bs";
import { FcCheckmark } from "react-icons/fc";
import { HiClipboardCheck } from "react-icons/hi";
// functions
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { Toast } from "@/alerts/toast";
import { db } from "@/firebase";
//others
import Swal from "sweetalert2";
import uniqid from "uniqid";

interface Props {
  uid: any;
}

interface FormInvite {
  Name: string;
  Gift: Gifts;
}

interface Diapers {
  name: string;
  quantity: number;
  id?: string | any;
}

interface dbDiapers {
  [key: string]: Diapers;
}

const colors = [
  "#34d399",
  "#3b82f6",
  "#22d3ee",
  "#67e8f9",
  "#2dd4bf",
  "#B9F3E4",
  "#7FE9DE",
];

const GiftSelectorTemplate: FC<Props> = ({ uid }) => {
  const { dbDiapers, dbGift, loading, error } = useFetchData(uid);

  const [giftArray, setGiftArray] = useState<Gifts>({});
  const [hasDiapers, setHasDiapers] = useState<Diapers>({
    name: "",
    quantity: 0,
    id: "",
  });

  const isSelected = useGiftStore(setIsSelected);
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

  useEffect(() => {
    if (!dbDiapers) return;
    diapersManager(dbDiapers);
  }, [dbDiapers]);

  const handleSelect = async (id: string) => {
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

  const onSubmit = handleSubmit(({ Name }) => {
    let selectedGiftsQuantity = {};
    let confirmedObject: string[] = [];

    Object.keys(giftArray).map((item) => {
      const { id, selected, quantity, gift } = giftArray[item];
      if (!selected) return;
      confirmedObject = [...confirmedObject, gift];

      selectedGiftsQuantity = {
        ...selectedGiftsQuantity,
        [id]: {
          ...giftArray[item],
          selected: false,
          quantity: quantity - 1,
        },
      };
    });

    const inviteObject = {
      id: uniqid(),
      Name,
      Gift: confirmedObject,
    };
    const { Gift } = inviteObject;
    if (Gift.length === 0 || Name === "") return;

    firebaseAdd(inviteObject, selectedGiftsQuantity);
  });

  const firebaseAdd = async (selectedData: any, quantityData: any) => {
    const docRef = collection(db, "Users");
    await setDoc(
      doc(docRef, uid),
      {
        GiftList: {
          ...quantityData,
        },
        diapers: {
          ...dbDiapers,
          [hasDiapers.id]: {
            ...hasDiapers,
            quantity: hasDiapers.quantity - 1,
          },
        },
        selectedGifts: {
          [selectedData.id]: {
            ...selectedData,
          },
        },
      },
      { merge: true }
    );
    Swal.fire({
      icon: "success",
      title: "Success",
      text: `Your gifts have been added.`,
    });
    isSelected(true);
  };

  const diapersManager = (data: dbDiapers) => {
    if (Object.keys(data).length === 0) return;
    const {
      etapa_1: { name: eta1Name, quantity: eta1Qua },
      etapa_2: { name: eta2Name, quantity: eta2Qua },
      etapa_3: { name: eta3Name, quantity: eta3Qua },
    } = data;
    const diapersArray = [
      { name: eta1Name, quantity: eta1Qua, id: "etapa_1" },
      { name: eta2Name, quantity: eta2Qua, id: "etapa_2" },
      { name: eta3Name, quantity: eta3Qua, id: "etapa_3" },
    ];
    const diapers = diapersArray.find((diaper) => diaper.quantity > 0);
    if (!diapers) return;
    setHasDiapers(diapers);
  };

  return (
    <>
      <div className="flex-1 flex flex-col h-screen  items-center text-xs sm:text-sm">
        <div className="flex lg:flex-row items-center flex-col-reverse w-full h-full">
          <div className="lg:w-3/5 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap gap-4 w-auto h-fit items-center">
            {!loading &&
              Object.keys(giftArray).map((gift) => {
                const {
                  id,
                  gift: giftName,
                  selected,
                  quantity,
                } = giftArray[gift];
                return quantity > 0 ? (
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
                ) : null;
              })}
          </div>
          <div className="lg:w-2/5 w-full outline-none lg:sticky lg:top-24  self-start">
            <div className="flex lg:flex-row flex-col items-center justify-center w-auto border border-solid border-blue1 m-4 p-4">
              <div className=" w-auto flex items-center justify-center">
                <BsFillBookmarkHeartFill className="text-7xl text-red-400 self-start justify-center" />
              </div>
              <h1 className="text-center font-extrabold text-xl">
                Encontramos en internet, unas opciones de regalo que puedes
                elegir. <br />
                ¡¡ No Olvides los pañales ‼
              </h1>
            </div>
            <div className="border w-auto border-solid border-blue1 m-4 p-4">
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
              <h1 className="text-2xl">Diapers</h1>
              <div className="flex flex-col  sm:gap-5">
                {hasDiapers && (
                  <div className="flex justify-center gap gap-2 items-center m-2">
                    <HiClipboardCheck className="text-xl text-pink" />
                    <h1 className="flex flex-1">X10 - {hasDiapers.name}</h1>
                  </div>
                )}
                <div className="flex justify-center gap gap-2 items-center m-2">
                  <HiClipboardCheck className="text-xl text-pink" />
                  <h1 className="flex flex-1">Pañitos Humedos</h1>
                </div>
              </div>

              <form
                onSubmit={onSubmit}
                className="flex flex-col gap-3 sm:gap-5 mt-6 "
              >
                <label>Name:</label>
                <div className="flex flex-col gap gap-4 ">
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
                    Send
                  </button>
                </div>
              </form>
            </div>
            <div className="border border-solid border-blue1 m-4 p-4">
              <h1 className="text-2xl m-4">colors</h1>
              <div className="flex flex-row  sm:gap-5   gap gap-4 item-center justify-center">
                <div className={`w-16 h-16 rounded-lg bg-color0`}></div>
                <div className={`w-16 h-16 rounded-lg bg-color1`}></div>
                <div className={`w-16 h-16 rounded-lg bg-color2`}></div>
                <div className={`w-16 h-16 rounded-lg bg-color3`}></div>
                <div className={`w-16 h-16 rounded-lg bg-color4`}></div>
                <div className={`w-16 h-16 rounded-lg bg-color5`}></div>
                <div className={`w-16 h-16 rounded-lg bg-color6`}></div>
                <div className={`w-16 h-16 rounded-lg bg-color7`}></div>
                <div className={`w-16 h-16 rounded-lg bg-pink`}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GiftSelectorTemplate;
