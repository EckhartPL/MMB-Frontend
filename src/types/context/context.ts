import { LoginRequest, LoginResponse, Tokens, UserObj, UserResponse } from '@backendTypes';
import { ReactNode } from 'react';

export interface AuthContextProps {
  currentUser: UserResponse | null;
  setCurrentUser: (user: UserResponse | null) => void;
  tokens: Tokens | null;
  login: (credentials: LoginRequest) => Promise<LoginResponse>;
  logout: () => void;
}

export interface AuthContextProviderProps {
  children: ReactNode;
}

export interface UserContextInterface {
  user: UserObj;
  setUser: (user: UserObj) => void;
}

export interface TokensContextInterface {
  tokens: Tokens;
  setTokens: (tokens: Tokens) => void;
}
