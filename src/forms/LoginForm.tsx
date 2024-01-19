/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts';
import { endpoints } from '../services';
import { LoginRequest } from '@backendTypes';
import { Locked, Unlocked } from '../assets';

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
          <img src={Unlocked} onClick={() => setPwdVisible(false)} />
        ) : (
          <img src={Locked} onClick={() => setPwdVisible(true)} />
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
