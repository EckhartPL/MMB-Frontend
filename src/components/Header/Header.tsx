import React from 'react';
import { Filter } from './Filter/Filter';
import { Btn } from '../common/Btn/Btn';

// import './Header.css';

export function Header() {
  return (
    <div className="header-container">
      <Btn text="Add article" to="/article" />
      <Filter />
    </div>
  );
}
