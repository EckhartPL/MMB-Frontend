import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../contexts';
import { endpoints } from '../../../services';
import { Avatar } from '../Avatar';
import { HeaderArrow } from '../../../assets';

export const AvatarHeader = () => {
  const { currentUser } = useAuth();
  return (
    <div className="avatar-header">
      <Link to={endpoints.userProfile}>
        <Avatar userName={currentUser?.name} userProfilePictureUrl={currentUser?.profilePicture?.url} />
      </Link>
      <img src={HeaderArrow} alt="Header Arrow" />
    </div>
  );
};
