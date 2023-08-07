import React, { ChangeEvent, useState } from 'react';
import { useAuth } from '../../../contexts';

import './Profile.css';
import { apiServer, endpoints } from '../../../services';
import { UserResponse } from '../../../../../backend/types/user';
import { Spinner } from '../../../components';
import { Navigate } from 'react-router-dom';

export function Profile() {
  const { tokens, currentUser, setCurrentUser } = useAuth();
  const [avatar, setAvatar] = useState<File>();
  const [loading, setLoading] = useState(false);

  if (!currentUser) {
    return <Navigate to={endpoints.home} replace />;
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAvatar(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!avatar) {
      window.alert('File is not uploaded');
      console.error('File is not uploaded', avatar);
      return null;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append('avatar', avatar);

    const { data: profilePictureUrl } = await apiServer.postFormData<FormData>(
      endpoints.userUploadPicture,
      formData,
      tokens?.access_token,
    );
    const user = { ...currentUser, profilePictureUrl };
    setCurrentUser(user as UserResponse);
    setLoading(false);
  };

  return (
    <div className="profile-container">
      {loading ? <Spinner /> : null}
      <div className="profile-upload-picture">
        <label>
          <p>Upload picture</p>
          {currentUser ? currentUser.name : <h1>user is not logged in</h1>}
          <input type="file" name="avatar" onChange={handleFileChange} accept=".jpg, .jpeg, .png" />
          <button type="submit" onClick={handleUpload}>
            Upload avatar
          </button>
        </label>
      </div>
    </div>
  );
}
