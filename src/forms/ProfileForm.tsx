import React, { FormEvent, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts';
import { endpoints, apiServer } from '../services';
import { ProfileRequest, UserUpdateResponse } from '@backendTypes';

export const ProfileForm = () => {
  const { tokens, currentUser, setCurrentUser } = useAuth();
  const [form, setForm] = useState<ProfileRequest>({
    name: '',
  });
  const [profileUpdateMessages, setProfileUpdateMessages] = useState({
    empty: false,
    sameName: false,
    nameOccupied: false,
  });
  const [editProfile, setEditProfile] = useState(false);
  const { empty, sameName, nameOccupied } = profileUpdateMessages;

  if (!currentUser) {
    return <Navigate to={endpoints.home} replace />;
  }

  const updateForm = (key: string, value: string) => {
    setForm((formData) => ({
      ...formData,
      [key]: value,
    }));

    setProfileUpdateMessages((prevMessages) => ({
      ...prevMessages,
      empty: value === '',
      sameName: value === currentUser.name,
    }));
  };

  const saveUserInfo = async (e: FormEvent) => {
    e.preventDefault();

    setEditProfile(!editProfile);

    if (editProfile && form.name !== '') {
      const response = await apiServer.patch<ProfileRequest, UserUpdateResponse>(
        endpoints.userUpdateInfo,
        form,
        tokens?.access_token,
      );
      if (response && response.data && response.data.exists) {
        setProfileUpdateMessages({ ...profileUpdateMessages, nameOccupied: true });
        return;
      }
      setCurrentUser({ ...currentUser, name: form.name });
      window.alert('Profile updated successfully!');
      console.warn(response);
    }
  };

  return (
    <form className="profile-form" method="PATCH" onSubmit={saveUserInfo}>
      <div className="input-box">
        {empty ? (
          <div className="form-error">Name cannot be empty</div>
        ) : sameName ? (
          <div className="form-error">Name cannot be the same as before</div>
        ) : nameOccupied ? (
          <div className="form-error">Name is already taken</div>
        ) : (
          <div id="form-name">Name</div>
        )}
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
      <button type="submit" className="submit-btn" disabled={empty || sameName}>
        {editProfile ? 'Save' : 'Edit'}
      </button>
    </form>
  );
};
