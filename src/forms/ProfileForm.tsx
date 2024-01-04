import React, { FormEvent, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts';
import { endpoints, apiServer } from '../services';

export const ProfileForm = () => {
  const { tokens, currentUser, setCurrentUser } = useAuth();
  const [form, setForm] = useState({
    name: '',
  });
  const [editProfile, setEditProfile] = useState(false);

  if (!currentUser) {
    return <Navigate to={endpoints.home} replace />;
  }

  const updateForm = (key: string, value: string) => {
    setForm((formData) => ({
      ...formData,
      [key]: value,
    }));
  };

  const saveUserInfo = async (e: FormEvent) => {
    e.preventDefault();
    setEditProfile(!editProfile);

    if (editProfile) {
      const response = await apiServer.patch(endpoints.userUpdateInfo, form, tokens?.access_token);
      setCurrentUser({ ...currentUser, name: form.name });
      window.alert('Profile updated successfully!');
      console.warn(response);
    }
  };

  return (
    <form className="profile-form" method="PATCH" onSubmit={saveUserInfo}>
      <div className="input-box">
        <div id="form-name">Name</div>
        <input
          id={editProfile ? 'black' : ''}
          type="text"
          name="name"
          maxLength={255}
          value={form.name}
          disabled={!editProfile}
          onChange={(e) => updateForm('name', e.target.value)}
          placeholder={currentUser.name}
        />
        <i />
      </div>
      <button type="submit" id="profile-submit-btn">
        {editProfile ? 'Save' : 'Edit'}
      </button>
    </form>
  );
};
