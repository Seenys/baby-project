import { create, SetState } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { State } from "./repositoryFactory";

const initialState = {
    name: "",
    gift: [],
    displaySelected: false,
   
};

const storeSlice = (set: SetState<State>): State => ({
  ...initialState,
  setGift: (gift: any) => set(() => ({ gift })),
  setIsSelected: (isDisplaySelected: boolean) => set(() => ({ displaySelected: isDisplaySelected })),
});

const useStore =
  process.env.NODE_ENV === "development"
    ? create(devtools(persist(storeSlice, { name: "store" })))
    : create(persist(storeSlice, { name: "store" }));

export default useStore;
