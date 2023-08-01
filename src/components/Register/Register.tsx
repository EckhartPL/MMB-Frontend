import React, { FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';

import '../Login/Login.css';
import { apiServer, endpoints } from '../../services';

export function Register() {
  const [form, setForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const register = async (e: FormEvent) => {
    e.preventDefault();
    const { password, confirmPassword } = form;

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    await apiServer.post(endpoints.register, form);
  };

  const updateForm = (key: string, value: string) => {
    setForm((formData) => ({
      ...formData,
      [key]: value,
    }));
  };

  return (
    <div className="box-register">
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
            onChange={(e) => updateForm('email', e.target.value)}
          />
          <i />
        </div>
        <div className="input-box">
          <span>Password</span>
          <input
            type="password"
            name="register-pwd"
            required
            maxLength={255}
            value={form.password}
            onChange={(e) => updateForm('password', e.target.value)}
          />
          <i />
        </div>
        <div className="input-box">
          <span>Confirm password</span>
          <input
            type="password"
            name="register-confirm-pwd"
            required
            maxLength={255}
            value={form.confirmPassword}
            onChange={(e) => updateForm('confirmPassword', e.target.value)}
          />
          <i />
        </div>
        <div className="links">
          <Link to="/auth/login">Already have an account?</Link>
        </div>
        <input type="submit" value="Register" />
      </form>
    </div>
  );
}
