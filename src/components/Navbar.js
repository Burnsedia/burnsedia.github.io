import React from "react";
import { Link } from "gatsby";



const NavBar = () => {
  return (
      <nav class="navbar" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
          
          <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>
      
        <div id="navbarBasicExample" class="navbar-menu centered">
          <div class="navbar-start">
            <Link to="/"class="navbar-item">
              Home
            </Link>
      
            <Link to="/projects" class="navbar-item">
              Projects 
            </Link>
            <Link to="/blog" class="navbar-item">
              Blog 
            </Link>
            </div>
          </div>
      </nav>
  )
}

