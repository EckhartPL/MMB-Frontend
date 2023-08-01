import React from 'react';
import { Link } from 'react-router-dom';

export const LoginBar = () => {
  return (
    <div className="login-bar">
      <div className="sign-in">
        <Link to="/auth/login">Sign in</Link>
      </div>
      <div className="sign-up">
        <Link to="/auth/register">Sign up</Link>
      </div>
    </div>
  );
};
