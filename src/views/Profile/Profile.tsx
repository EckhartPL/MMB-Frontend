import React from 'react';
import { useAuth } from '../../contexts';

import './Profile.css';
import { endpoints } from '../../services';
import { Navigate } from 'react-router-dom';
import { Upload } from '../../components/Upload/Upload';
import { ProfileForm } from '../../forms/ProfileForm';

export const Profile = () => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return <Navigate to={endpoints.home} replace />;
  }

  return (
    <div className="profile-container">
      <Upload />
      <ProfileForm />
    </div>
  );
};
