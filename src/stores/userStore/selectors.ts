import { State } from "./repositoryFactory";

export const getEmail = (state: State) => state.email;
export const setEmail = (state: State): ((email: string) => void) => state.setEmail;