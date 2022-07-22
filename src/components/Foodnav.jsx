import React from "react";
import "./Foodnav.css";
import { NavLink } from "react-router-dom";

const Foodnav = () => {
  return (
    <div className="food-nav">
      <div className="food-nav-items">
        <NavLink to={"/cuisine/American"}>
          <h3>American</h3>
        </NavLink>
        <NavLink to={"/cuisine/Japanese"}>
          <h3>Japanese</h3>
        </NavLink>
        <NavLink to={"/cuisine/Mexican"}>
          <h3>Mexican</h3>
        </NavLink>
      </div>
    </div>
  );
};

export default Foodnav;
