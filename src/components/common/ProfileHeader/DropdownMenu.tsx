import React, { ForwardedRef, forwardRef } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../contexts';
import { endpoints } from '../../../services';

interface DropdownMenuProps {
  ref: ForwardedRef<HTMLDivElement>;
}

export const DropdownMenu: React.FC<DropdownMenuProps> = forwardRef((props: DropdownMenuProps, ref) => {
  const { logout, currentUser } = useAuth();
  return (
    <div ref={ref} className="dropdown">
      <div className="triangle-pointer" />
      <div className="current-user">
        Logged in as <br /> <strong>{currentUser?.name || currentUser?.email}</strong>
      </div>
      <div className="dropdown-divider" />
      <div className="dropdown-link">
        <Link to={endpoints.userProfile}>Profile</Link>
      </div>
      <div className="dropdown-link">
        <Link to={`/user/${currentUser?.name}/articles`}>My Articles</Link>
      </div>
      <div className="dropdown-link">
        <Link to={`/user/${currentUser?.name}/liked-articles`}>Saved Articles</Link>
      </div>
      <div className="dropdown-link">
        <Link to={endpoints.articles}>Add Article</Link>
      </div>
      <div className="dropdown-divider" />
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
      <div className="logout" onClick={logout}>
        Logout
      </div>
    </div>
  );
});
