import { createContext } from "react";
import { UserObj } from "types";

export const UserContext = createContext({
  user: {
    email: '',
    name: '',
  } as UserObj,
  setUser: (user: UserObj) => { },
});