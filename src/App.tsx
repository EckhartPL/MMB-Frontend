import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Article } from './components/Article/Articles';
import { AddArticle } from './components/Article/AddArticle';
import { Home } from './components/Home/Home';
import { Navbar } from './components/Navbar/Navbar';
import { Register } from './components/Register/Register';
import { Login } from './components/Login/Login';
import { TokensContext } from './contexts/token.context';
import { Tokens, UserObj } from 'types';
import { UserContext } from './contexts/user.context';
import { Profile } from './components/User/Profile/Profile';
import { ProfileHeader } from './components/common/ProfileHeader/ProfileHeader';

import './App.css';

export const App = () => {
  const [tokens, setTokens] = useState<Tokens>({
    access_token: '',
    refresh_token: '',
  });
  const [user, setUser] = useState<UserObj>({
    email: '',
    name: '',
    profilePictureUrl: '',
  });

  return <>
    <TokensContext.Provider value={{ tokens, setTokens }}>
      <UserContext.Provider value={{ user, setUser }}>
        <Navbar />
        <ProfileHeader />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/article" element={<AddArticle />} />
          <Route path="/article/:pageId" element={<Article />} />
          <Route path="/user/:userName/:articleTitle" element={<Profile />} />
          <Route path="/user/:userName" element={<Profile />} />
          <Route path="/auth/register" element={<Register />} />
          <Route path="/auth/login" element={<Login />} />
        </Routes>
      </UserContext.Provider>
    </ TokensContext.Provider>
  </>
}