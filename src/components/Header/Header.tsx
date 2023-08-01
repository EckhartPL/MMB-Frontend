import React from 'react';
import { Filter } from './Filter/Filter';
import { Btn } from '../common/Btn/Btn';

// import './Header.css';

export function Header() {
  return (
    <>
      <Btn text="Add article" to="/article" />
      <Filter />
    </>
  );
}
