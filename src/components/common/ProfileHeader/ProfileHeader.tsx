import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../contexts';

import './ProfileHeader.css';
import { DropdownMenu } from './DropdownMenu';
import { LoginBar } from './LoginBar';
import { AvatarHeader } from './AvatarHeader';

export function ProfileHeader() {
  const { currentUser } = useAuth();
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    const arr = document.querySelector('.avatar-header svg') as HTMLElement;
    const dropdown = document.querySelector('.dropdown') as HTMLDivElement;

    if (arr) {
      // window.getComputedStyle(arr).transform === 'none'
      clicked ? (arr.style.transform = 'rotate(90deg)') : (arr.style.transform = 'none');
      if (dropdown) {
        // arr.style.transform === 'rotate(90deg)'
        clicked ? (dropdown.style.display = 'block') : (dropdown.style.display = 'none');
        document.addEventListener('click', (e: MouseEvent) => {
          if (!arr.contains(e.target as Node)) {
            dropdown.style.display = 'none';
            arr.style.transform = 'none';
          }
        });
      }
    }
  }, [clicked]);

  return (
    <>
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
      <div className="avatar-header-container" onClick={() => setClicked(!clicked)}>
        {currentUser ? <AvatarHeader /> : <LoginBar />}
      </div>
      {currentUser ? <DropdownMenu /> : null}
    </>
  );
}
