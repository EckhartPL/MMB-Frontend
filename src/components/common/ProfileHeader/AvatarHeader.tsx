import React, { ForwardedRef, forwardRef } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../contexts';
import { endpoints } from '../../../services';
import { Avatar } from '../Avatar';
import { HeaderArrow } from '../../../assets';

interface ArrowProps {
  ref: ForwardedRef<HTMLImageElement>;
}

export const AvatarHeader: React.FC<ArrowProps> = forwardRef((props: ArrowProps, ref) => {
  const { currentUser } = useAuth();

  return (
    <div className="avatar-header">
      <Link to={endpoints.userProfile}>
        <Avatar userName={currentUser?.name} userProfilePictureUrl={currentUser?.profilePicture?.url} />
      </Link>
      <img ref={ref} src={HeaderArrow} alt="Header Arrow" />
    </div>
  );
});
