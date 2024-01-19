import React, { ChangeEvent, useState } from 'react';
import { Spinner } from '../../components';
import { UploadEntity } from '../../../../backend/src/modules/upload/entities';
import { apiServer, endpoints } from '../../services';
import { useAuth } from '../../contexts';
import { UserResponse } from '../../../../backend/types/user';
import { Navigate } from 'react-router-dom';

export const Upload = () => {
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
    <div className="profile-upload-picture">
      {loading ? <Spinner /> : null}
      <label>
        <div id="profile-upload-box">Upload profile picture {currentUser.name}</div>
        <label id="upload-input">
          Choose File
          <input disabled={loading} type="file" name="avatar" onChange={handleFileChange} accept=".jpg, .jpeg, .png" />
        </label>

        <button id="upload-btn" disabled={loading} type="submit" onClick={handleUploadClick}>
          {loading ? 'Sending...' : 'Upload avatar'}
        </button>
      </label>
    </div>
  );
};
