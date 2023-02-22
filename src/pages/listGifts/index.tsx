import React from "react";
import { ListGiftTemplate } from "@/components/giftList";
import { useAuth } from "@/context/AuthContext";
const ListGifts = () => {
  const { user } = useAuth();

  return user && <ListGiftTemplate />;
};

export default ListGifts;
