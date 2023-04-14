import React, { ChangeEvent, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { TokensContext } from '../../../contexts/token.context';
import { UserObj } from 'types';

import './Profile.css';

export const Profile = () => {
  const { tokens } = useContext(TokensContext)
  const [avatar, setAvatar] = useState<File>();
  const [user, setUser] = useState<UserObj>({
    email: '',
    name: '',
    profilePictureUrl: '',
  });
  const params = useParams();
  const userName = params.userName;

  useEffect(() => {
    try {
      fetch(`http://localhost:3001/user/upload/${userName}`, {
        headers: {
          'Authorization': `Bearer ${tokens.access_token}`,
        }
      })
        .then(res => res.json())
        .then(data => {
          setUser(data)
        });
    } catch (e) {
      throw new Error(`error message: ${e}`);
    }
  }, []);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAvatar(e.target.files[0]);
    }
  }

  const handleUploadClick = async () => {
    if (!avatar) {
      console.error('File is not uploaded', avatar);
      return;
    }

    const data = new FormData();
    data.append('avatar', avatar);

    await fetch('http://localhost:3001/user/upload', {
      method: 'POST',
      body: data,
      headers: {
        //'content-type': avatar.type,
        //'boundary': 'asd',
        //'content-length': `${avatar.size}`,
        'Authorization': `Bearer ${tokens.access_token}`,
      },
    })
      .then(res => res.json())
      .then(data => setUser(e => ({
        ...e,
        profilePictureUrl: data,
      })))
      .catch(err => console.error(err));
  };

  return <>
    <div className="profile-container">
      <div className="profile-upload-picture">
        <label>
          <p>Upload picture</p>
          {user ? user.name : <h1>user is not logged in</h1>}
          <input type="file" name="avatar" onChange={handleFileChange} accept=".jpg, .jpeg, .png" />
          <button type="submit" onClick={handleUploadClick}>Upload</button>
          <progress max="100" value="0"></progress>
        </label>
      </div>
    </div>
  </>
}
