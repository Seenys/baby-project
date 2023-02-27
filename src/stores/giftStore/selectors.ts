import { State } from "./repositoryFactory";

export const getGift = (state: State) => state.gift;
export const setGift = (state: State): ((gift: any) => void) => state.setGift;
export const getIsSelected = (state: State) => state.displaySelected;
export const setIsSelected = (state: State): ((isDisplaySelected: boolean) => void) => state.setIsSelected;