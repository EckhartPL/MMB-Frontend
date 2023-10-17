import React, { useState } from 'react';
import { Btn } from '../../../components';

export function Filter() {
  const [toggle, setToggle] = useState(false);

  return (
    <>
      {toggle ? (
        <input id="input" onClick={() => setToggle(!toggle)} type="text"></input>
      ) : (
        <Btn text="Filter" onClick={() => setToggle(!toggle)} />
      )}
    </>
  );
}
