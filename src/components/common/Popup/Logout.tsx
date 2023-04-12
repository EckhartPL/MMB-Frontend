import React from 'react';

import './Logout.css';

interface Props {
  msg: string;
}

export const Logout = (props: Props) => {
  const {msg} = props;
  return <>
    <div className="popup">
      <button className='close-popup'>X</button>
      <div className="popup-content">
        {msg}
      </div>
    </div>
  </>
}