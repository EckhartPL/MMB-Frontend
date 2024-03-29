import React, { createContext, useContext, useEffect, useState } from 'react';
import { AuthContextProps, AuthContextProviderProps, TokensContextInterface } from '@frontendTypes';
import { LoginRequest, LoginResponse, Tokens, UserResponse } from '@backendTypes';
import { apiServer, endpoints } from '../services';
import { TOKEN_REFRESH_INTERVAL } from '../utils';

export const UserContext = createContext<AuthContextProps | null>(null);
export const TokensContext = createContext<TokensContextInterface | null>(null);

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [currentUser, setCurrentUser] = useState<UserResponse | null>(
    JSON.parse(localStorage.getItem('user') || 'null') === 'undefined'
      ? null
      : JSON.parse(localStorage.getItem('user') || 'null'),
  );
  const [tokens, setTokens] = useState<Tokens | null>(JSON.parse(localStorage.getItem('tokens') || 'null'));

  const login = async (credentials: LoginRequest): Promise<LoginResponse> => {
    const response = await apiServer.post<LoginRequest, LoginResponse>(endpoints.login, credentials);

    if (response && response.data) {
      console.log(response);
      const { data } = response;
      const { user, tokens: tokensData } = data;
      setCurrentUser(user);
      setTokens(tokensData);
      return response.data;
    } else {
      throw new Error(
        Array.isArray(response.error) ? response.error[0].message : response.error?.message || 'Unknown error',
      );
    }
  };

  const logout = async () => {
    await apiServer.post(endpoints.logout, null, tokens?.access_token);
    setCurrentUser(null);
    setTokens(null);
  };

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    const refreshAccessToken = async () => {
      const newTokens = await apiServer.postRt<Tokens>(endpoints.refreshAccessToken, tokens?.refresh_token);
      setTokens(newTokens.data || null);
    };

    // Set up the interval to refresh the access token
    const tokenRefreshInterval = setInterval(async () => {
      await refreshAccessToken();
      console.log('token refreshed');
    }, TOKEN_REFRESH_INTERVAL);

    // Clean up the interval when the component unmounts
    return () => clearInterval(tokenRefreshInterval);
  }, [tokens?.access_token, tokens?.refresh_token]);

  useEffect(() => {
    localStorage.setItem('tokens', JSON.stringify(tokens));
  }, [tokens]);

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser, tokens, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = (): AuthContextProps => {
  const auth = useContext(UserContext);

  if (!auth) {
    throw new Error('useAuth must be used within a UserContextProvider.');
  }

  return auth;
};
