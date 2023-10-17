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
    const arrow = document.querySelector('.avatar-header img:nth-child(2)') as HTMLElement;
    const dropdown = document.querySelector('.dropdown') as HTMLDivElement;

    if (arrow) {
      clicked ? (arrow.style.transform = 'rotate(90deg)') : (arrow.style.transform = 'none');
      if (dropdown) {
        clicked ? (dropdown.style.display = 'block') : (dropdown.style.display = 'none');
        document.addEventListener('click', (e: MouseEvent) => {
          if (!arrow.contains(e.target as Node)) {
            setClicked(false);
            dropdown.style.display = 'none';
            arrow.style.transform = 'none';
          }
        });
      }
    }
  }, [clicked]);

  return (
    <>
      <div className="avatar-header-container" role="presentation" onClick={() => setClicked(!clicked)}>
        {currentUser ? <AvatarHeader /> : <LoginBar />}
      </div>
      {currentUser ? <DropdownMenu /> : null}
    </>
  );
}
