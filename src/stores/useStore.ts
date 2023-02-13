import { create, SetState } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { State } from "./repositoryFactory";

const initialState = {
  email: "",
};

const storeSlice = (set: SetState<State>): State => ({
  ...initialState,
  setEmail: (email: string) => set(() => ({ email })),
});

const useStore =
  process.env.NODE_ENV === "development"
    ? create(devtools(persist(storeSlice, { name: "store" })))
    : create(persist(storeSlice, { name: "store" }));

export default useStore;