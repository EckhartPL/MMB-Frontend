import { createContext } from "react";
import { Tokens } from 'types';

export const TokensContext = createContext({
  tokens: {
    access_token: '',
    refresh_token: '',
  },
  setTokens: (tokens: Tokens) => {}
})