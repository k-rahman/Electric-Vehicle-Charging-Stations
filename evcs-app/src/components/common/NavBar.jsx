import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = ({ siteName = '', Links = [], onLinkClick }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark">
      <Link className="navbar-brand" to='/'>{siteName}</Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
        <div className="navbar-nav">
          {Links.map(link => (
            <button
              key={link.name}
              className='btn border-info border rounded-sm mx-1 text-white'
              name={link.name}
              onClick={onLinkClick}>{link.name}</button>))}
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
