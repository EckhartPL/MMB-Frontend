import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { defaultAvatar } from "../../../utils";
import { TokensContext } from "../../../contexts/token.context";
import { UserContext } from "../../../contexts/user.context";

import './ProfileHeader.css';

export const ProfileHeader = () => {
  const { user, setUser } = useContext(UserContext);
  const { tokens, setTokens } = useContext(TokensContext);
  const [clicked, setClicked] = useState(false);

  const logout = async () => {
    await fetch(`http://localhost:3001/auth/logout`, {
      method: 'POST',
      headers: {
        'authorization': `Bearer ${tokens.access_token}`
      }
    });

    setTokens({
      access_token: '',
      refresh_token: '',
    });
    setUser({
      email: '',
      name: '',
      id: '',
      profilePictureUrl: '',
    });
  };

  useEffect(() => {

    const arr = document.querySelector('.avatar-header svg') as HTMLElement;
    const dropdown = document.querySelector('.dropdown') as HTMLDivElement;
    if (arr) {
      window.getComputedStyle(arr).transform === 'none'
        ? arr.style.transform = 'rotate(90deg)'
        : arr.style.transform = 'none';
      if (dropdown) {
        arr.style.transform === 'rotate(90deg)'
          ? dropdown.style.display = 'block'
          : dropdown.style.display = 'none'
        document.addEventListener('click', (e: MouseEvent) => {
          if (!arr.contains(e.target as Node)) {
            dropdown.style.display = 'none';
            arr.style.transform = 'none';
          }
        })
      }
    }

  }, [clicked]);

  return <>
    <div className="avatar-header-container" onClick={() => setClicked(!clicked)}>
      {user && user.name !== ''
        ? <div className="avatar-header">
          <label>
            {user.profilePictureUrl !== null
            ? <Link to={`/user/${user.name}`}><img src={user.profilePictureUrl} alt={`${user.name} profile`}/></Link> 
            : <Link to={`/user/${user.name}`}><img className="default-avatar" src={defaultAvatar} alt={`${user.name} profile`}/></Link>
            }
            <svg clipRule="evenodd" fillRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m10.211 7.155c-.141-.108-.3-.157-.456-.157-.389 0-.755.306-.755.749v8.501c0 .445.367.75.755.75.157 0 .316-.05.457-.159 1.554-1.203 4.199-3.252 5.498-4.258.184-.142.29-.36.29-.592 0-.23-.107-.449-.291-.591-1.299-1.002-3.945-3.044-5.498-4.243z" /></svg>
          </label>

        </div>
        : <div className="login-bar">
          <div className="sign-in">
            <Link to={`/auth/login`}>Sign in</Link>
          </div>
          <div className="sign-up">
            <Link to={`/auth/register`}>Sign up</Link>
          </div>
        </div>
      }
    </div>
    <div className="dropdown">
      <div className="triangle-pointer"></div>
      <div className="current-user">
        Logged in as <strong>{user.name}</strong>
      </div>
      <div className="dropdown-divider"></div>
      <div className="profile-link">
        <Link to={`/user/${user.name}`}>Profile</Link>
      </div>
      <div className="profile-link">
        <Link to={`/user/${user.name}/articles`}>My Articles</Link>
      </div>
      <div className="profile-link">
        <Link to={`/user/${user.name}/liked-articles`}>Saved Articles</Link>
      </div>
      <div className="dropdown-divider"></div>
      <div className="logout" onClick={logout}>Logout</div>
    </div>
  </>
};
