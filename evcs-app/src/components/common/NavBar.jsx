import React from 'react';
import { NavLink, Link } from 'react-router-dom';

const NavBar = ({ siteName = '', Links = [] }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: '#00959a' }}>
      <Link className="navbar-brand" to='/'>{siteName}</Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
        <div className="navbar-nav">
          {Links.map(link => (
            <NavLink
              key={link.name}
              className='nav-link border-info border rounded-sm mx-1 text-white'
              activeClassName='active-link'
              to={link.path}>{link.name}</NavLink>))}
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
