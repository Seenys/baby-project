// REACT
import React from "react";
// NEXT
import { useRouter } from "next/router";
// COMPONENTS
import GiftSelectorTemplate from "@/components/website/giftSelector/template/GiftSelectorTemplate";
// STORE
import { setIsSelected, getIsSelected, useGiftStore } from "@/stores/giftStore";

const GiftSelector = () => {
  const isSelected = useGiftStore(getIsSelected);
  const selectAnother = useGiftStore(setIsSelected);
  const router = useRouter();
  const { uid } = router.query;
  return uid && !isSelected ? (
    <GiftSelectorTemplate uid={uid} />
  ) : (
    <>
      <div className="flex flex-1 flex-col justify-center items-center text-center w-full h-fit">
        <h1 className="text-6xl">Thanks for the gift</h1>
        <h2 className="text-4xl">See you soon</h2>
        <h3 className="text-2xl">March 26</h3>
        <span
          className="my-7 cursor-pointer duration-300 hover:text-blue3"
          onClick={() => selectAnother(false)}
        >
          Send another gift
        </span>
      </div>
    </>
  );
};

export default GiftSelector;
