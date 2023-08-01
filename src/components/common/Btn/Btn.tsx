import React from 'react';
import { Link } from 'react-router-dom';

import './Btn.css';

interface Props {
  to?: string;
  text: string;
}

export function Btn(props: Props) {
  return props.to ? (
    <Link className="btn" to={props.to}>
      {props.text}
    </Link>
  ) : (
    <button className="btn">{props.text}</button>
  );
}
