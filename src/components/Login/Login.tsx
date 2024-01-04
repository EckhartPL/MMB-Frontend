import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts';

import './Login.css';
import { endpoints } from '../../services';
import { LoginForm } from '../../forms/LoginForm';

export function Login() {
  const { currentUser } = useAuth();

  if (currentUser) {
    window.alert('You are already logged in');
    return <Navigate to={endpoints.home} replace />;
  }

  return (
    <div className="box">
      <LoginForm />
    </div>
  );
}
