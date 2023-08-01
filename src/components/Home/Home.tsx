import React from 'react';
import { Logo } from '../Logo/Logo';

import './Home.css';

export function Home() {
  return (
    <>
      <Logo />
      <div className="home-container">
        <div className="best-articles-container">
          <h1>
            An experienced IT specialist and programmer with extensive experience in creating web applications and
            managing servers. <br /> Programmer by education, experience and passion.
          </h1>
          <div className="feature-list">
            <p>The blog application been and is currently developed with following features:</p>
            <li>View blog articles with title, content, author, and date posted</li>
            <li>Leave like (comments soon) on articles</li>
            <li>Register and login to manage user profile</li>
            <li>Responsive design for desktop and mobile devices</li>
          </div>
        </div>
      </div>
    </>
  );
}
