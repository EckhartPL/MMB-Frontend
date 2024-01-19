import React from 'react';

import '../../views/Articles/Articles.css';
import { Articles } from '../../views';
import { Search } from '../Search';

export function Article() {
  return (
    <div className="articles-container">
      <Search />
      <Articles />
    </div>
  );
}
