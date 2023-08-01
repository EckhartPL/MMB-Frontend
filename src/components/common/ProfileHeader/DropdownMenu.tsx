import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../contexts';

export const DropdownMenu = () => {
  const { logout, currentUser } = useAuth();
  return (
    <div className="dropdown">
      <div className="triangle-pointer" />
      <div className="current-user">
        Logged in as <strong>{currentUser?.name}</strong>
      </div>
      <div className="dropdown-divider" />
      <div className="profile-link">
        <Link to={`/user/${currentUser?.name}`}>Profile</Link>
      </div>
      <div className="profile-link">
        <Link to={`/user/${currentUser?.name}/articles`}>My Articles</Link>
      </div>
      <div className="profile-link">
        <Link to={`/user/${currentUser?.name}/liked-articles`}>Saved Articles</Link>
      </div>
      <div className="dropdown-divider" />
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
      <div className="logout" onClick={logout}>
        Logout
      </div>
    </div>
  );
};
