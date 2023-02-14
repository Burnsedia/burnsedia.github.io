import React from "react";
import { Link } from "gatsby";

const NavBar = () => {
  return (
      <nav className="navbar" role="navigation" ariaLabel="main navigation">
        <div className="navbar-brand">
          
          <a role="button" className="navbar-burger" ariaLabel="menu" ariaExpanded="false">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>
      
        <div id="navbarBasicExample" className="navbar-menu centered">
          <div className="navbar-start">
            <Link to="/"className="navbar-item">
              Home
            </Link>
      
            <Link to="/projects" className="navbar-item">
              Projects 
            </Link>
            <Link to="/blog" className="navbar-item">
              Blog 
            </Link>
            </div>
          </div>
      </nav>
  )
}

export default NavBar;
