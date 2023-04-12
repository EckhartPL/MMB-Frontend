import React from "react";
import { Btn } from "../common/Btn/Btn";
import { Filter } from "./Filter/Filter";

// import './Header.css';

export const Header = () => ( <>
  <Btn text={"Add article"} to={"/article"} />
  <Filter/>
</>
)