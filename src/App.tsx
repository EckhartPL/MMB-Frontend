import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { Navbar, ProfileHeader, Home, AddArticle, Article, UserArticle, Profile, Register, Login } from './components';

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
        <Route path="/user/profile" element={<Profile />} />
        <Route path="/auth/register" element={<Register />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="*" element={<p>There's nothing here: 404!</p>} />
      </Routes>
    </>
  );
}
