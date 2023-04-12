import React from "react"
import { Link } from "react-router-dom";

import './Btn.css';

interface Props {
  to?: string;
  text: string;
}

export const Btn = (props: Props) => (
  props.to
  ? <Link className="btn" to={props.to}>{props.text}</Link>
  : <button className="btn">{props.text}</button>
);