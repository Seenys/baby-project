import { useRouter } from "next/router";
import React from "react";
import GiftSelectorTemplate from "@/components/website/giftSelector/template/GiftSelectorTemplate";

const GiftSelector = () => {
  const router = useRouter();
  const { uid } = router.query;
  return uid && <GiftSelectorTemplate uid={uid} />;
};

export default GiftSelector;
