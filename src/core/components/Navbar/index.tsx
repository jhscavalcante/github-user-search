import React from "react";
import { Link } from "react-router-dom";
import "./styles.scss";

const Navbar = () => (
  <nav className="main-nav ">
    <div>
      <Link to="/">
        <h4 className="main-nav-title">Bootcamp DevSuperior</h4>
      </Link>
    </div>
  </nav>
);

export default Navbar;
