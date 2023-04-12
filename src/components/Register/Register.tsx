import React, { FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';

import './Register.css'

export const Register = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState<boolean>(false);

  const register = async (e: FormEvent) => {
    e.preventDefault();

    setLoading(true);

    try {
      await fetch('http://localhost:3001/auth/register', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(form)
      })
    } finally {
      setLoading(false);
    }
  }

  const updateForm = (key: string, value: string) => {
    setForm(form => ({
      ...form,
      [key]: value,
    }));
  }

  if (loading) {
    <h2>Trwa logowanie...</h2>
  }

  return (
    <div className="box">
      <form className="form" onSubmit={register}>
        <h2>Register</h2>
        <div className="input-box">
          <span>Email</span>
          <input
            type="email"
            name="register-email"
            required
            maxLength={255}
            value={form.email}
            onChange={e => updateForm('email', e.target.value)}
          />
          <i></i>
        </div>
        <div className="input-box">
          <span>Password</span>
          <input
            type="password"
            name="register-pwd"
            required
            maxLength={255}
            value={form.password}
            onChange={e => updateForm('password', e.target.value)}
          />
          <i></i>
        </div>
        <div className="links">
          <Link to={'/auth/login'} >Already have an account?</ Link>
        </div>
        <input type="submit" value="Register" />
      </form>
    </div>
  );
};