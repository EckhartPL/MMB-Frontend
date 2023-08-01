import React from 'react';

import './Logout-popup.css';

interface Props {
  msg: string;
}

export function Logout(props: Props) {
  const { msg } = props;
  return (
    <div className="popup">
      <button className="close-popup">X</button>
      <div className="popup-content">{msg}</div>
    </div>
  );
}
