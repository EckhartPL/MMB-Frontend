import React, { useEffect, useState } from 'react';
import { Btn } from '../../../components';

export function Filter() {
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    const search = document.querySelector('.search') as HTMLInputElement;

    // document.addEventListener('click', (e) => {
    //   if (!search.contains(e.target as Node)) {
    //     setToggle(false);
    //   }
    // });
  }, [toggle]);

  return (
    <>
      {toggle ? (
        <input id="input" onClick={() => setToggle(!toggle)} type="text" className="search"></input>
      ) : (
        <Btn text="Filter" onClick={() => setToggle(!toggle)} />
      )}
    </>
  );
}
