import React, { useRef, useState } from 'react';
import { useAuth } from '../../../contexts';

import './ProfileHeader.css';
import { DropdownMenu } from './DropdownMenu';
import { LoginBar } from './LoginBar';
import { AvatarHeader } from './AvatarHeader';

export function ProfileHeader() {
  const { currentUser } = useAuth();
  const [, setClicked] = useState(false);
  const arrowRef = useRef<HTMLImageElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  document.addEventListener('click', (e) => {
    if (
      arrowRef &&
      dropdownRef.current &&
      arrowRef.current &&
      dropdownRef &&
      !arrowRef.current.contains(e.target as Node)
    ) {
      setClicked(false);
      dropdownRef.current.style.display = 'none';
      arrowRef.current.style.transform = 'none';
    }
  });

  const handleOnClick = () => {
    if (!currentUser) return;

    setClicked((prevClicked) => {
      const newClicked = !prevClicked;

      if (newClicked && arrowRef && dropdownRef && dropdownRef.current && arrowRef.current) {
        arrowRef.current.style.transform = 'rotate(90deg)';
        dropdownRef.current.style.display = 'block';
      } else if (arrowRef && dropdownRef && dropdownRef.current && arrowRef.current) {
        arrowRef.current.style.transform = 'none';
        dropdownRef.current.style.display = 'none';
      }

      return newClicked;
    });
  };

  return (
    <>
      <div className="avatar-header-container" role="presentation" onClick={() => handleOnClick()}>
        {currentUser ? <AvatarHeader ref={arrowRef} /> : <LoginBar />}
      </div>
      {currentUser ? <DropdownMenu ref={dropdownRef} /> : null}
    </>
  );
}
