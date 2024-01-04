import React, { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts';
import { endpoints } from '../services';
import { LoginRequest } from '@backendTypes';

export const LoginForm = () => {
  const [credentials, setCredentials] = useState<LoginRequest>({ email: '', password: '' });
  const [pwdVisible, setPwdVisible] = useState<boolean>(false);
  const { login } = useAuth();
  const nav = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    login(credentials);
    nav(`/${endpoints.articles}/1`);
  };

  const updateForm = (key: string, value: string) => {
    setCredentials((credentialsData) => ({
      ...credentialsData,
      [key]: value,
    }));
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2>Sign in</h2>
      <div className="input-box">
        <input
          type="email"
          name="login-email"
          required
          maxLength={255}
          value={credentials.email}
          onChange={(e) => updateForm('email', e.target.value)}
        />
        <span>Email</span>
        <i />
      </div>

      <div className="input-box">
        <input
          type={pwdVisible ? 'text' : 'password'}
          name="login-pwd"
          required
          maxLength={255}
          value={credentials.password}
          onChange={(e) => updateForm('password', e.target.value)}
        />
        <span>Password</span>
        {pwdVisible ? (
          <svg
            className="unlocked"
            onClick={() => setPwdVisible(false)}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 576 512"
          >
            {/* <!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --> */}
            <path d="M352 144c0-44.2 35.8-80 80-80s80 35.8 80 80v48c0 17.7 14.3 32 32 32s32-14.3 32-32V144C576 64.5 511.5 0 432 0S288 64.5 288 144v48H64c-35.3 0-64 28.7-64 64V448c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V256c0-35.3-28.7-64-64-64H352V144z" />
          </svg>
        ) : (
          <svg
            className="locked"
            onClick={() => setPwdVisible(true)}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
          >
            {/* <!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --> */}
            <path d="M144 144v48H304V144c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192V144C80 64.5 144.5 0 224 0s144 64.5 144 144v48h16c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V256c0-35.3 28.7-64 64-64H80z" />
          </svg>
        )}
        <i />
      </div>
      <div className="links">
        <Link to="/">Forgot Password</Link>
        <Link to="/auth/register">Signup</Link>
      </div>
      <input type="submit" value="Login" />
    </form>
  );
};
