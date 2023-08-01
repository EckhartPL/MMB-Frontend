import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { AddArticle } from './components/Article/AddArticle';
import { Article } from './components/Article/Articles';
import { ProfileHeader } from './components/common/ProfileHeader/ProfileHeader';
import { Home } from './components/Home/Home';
import { Login } from './components/Login/Login';
import { Navbar } from './components/Navbar/Navbar';
import { Register } from './components/Register/Register';
import { UserArticle } from './components/User/Article/UserArticle';
import { Profile } from './components/User/Profile/Profile';

import './App.css';

export function App() {
  return (
    <>
      <Navbar />
      <ProfileHeader />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/article" element={<AddArticle />} />
        <Route path="/article/:pageId" element={<Article />} />
        <Route path="/user/:userName/:articleTitle" element={<UserArticle />} />
        <Route path="/user/:userName" element={<Profile />} />
        <Route path="/auth/register" element={<Register />} />
        <Route path="/auth/login" element={<Login />} />
      </Routes>
    </>
  );
}
