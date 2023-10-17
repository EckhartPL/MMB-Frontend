import React, { ChangeEvent, useState } from 'react';
import { useAuth } from '../../../contexts';

import './Profile.css';
import { apiServer, endpoints } from '../../../services';
import { UserResponse } from '../../../../../backend/types/user';
import { Spinner } from '../../../components';
import { Navigate } from 'react-router-dom';
import { UploadEntity } from '../../../../../backend/src/modules/upload/entities';

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

  const handleUploadClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!avatar) {
      window.alert('File is not uploaded');
      console.error('File is not uploaded', avatar);
      return null;
    }
    event.currentTarget.disabled = true;
    setLoading(true);

    const formData = new FormData();
    formData.append('avatar', avatar);

    const { data: profilePicture } = await apiServer.postFormData<UploadEntity>(
      endpoints.userUploadPicture,
      formData,
      tokens?.access_token,
    );
    const user: UserResponse = { ...currentUser, profilePicture };
    setCurrentUser(user);
    setLoading(false);
  };

  return (
    <div className="profile-container">
      {loading ? <Spinner /> : null}
      <div className="profile-upload-picture">
        <label>
          <p>Upload picture</p>
          {currentUser ? currentUser.name : <h1>user is not logged in</h1>}
          <input disabled={loading} type="file" name="avatar" onChange={handleFileChange} accept=".jpg, .jpeg, .png" />
          <button disabled={loading} type="submit" onClick={handleUploadClick}>
            {loading ? 'Sending...' : 'Upload avatar'}
          </button>
        </label>
      </div>
    </div>
  );
}
