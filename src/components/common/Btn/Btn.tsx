import React from 'react';
import { Link } from 'react-router-dom';

import './Btn.css';

interface Props {
  id?: string;
  to?: string;
  text: string;
  onClick?: () => void;
}

export function Btn(props: Props) {
  return props.to ? (
    <Link id={props.id} className="btn" to={props.to}>
      {props.text}
    </Link>
  ) : (
    <button onClick={props.onClick} className="btn">
      {props.text}
    </button>
  );
}
