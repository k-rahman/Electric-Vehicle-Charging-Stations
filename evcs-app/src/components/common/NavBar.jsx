import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = ({ siteName = '', Links = [], onLinkClick, user }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark">
      <Link className="navbar-brand" to='/'>{siteName}</Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
        <div className="navbar-nav">
          {!user &&
            <>
              <button
                className='btn border-info border rounded-sm mx-1 text-white'
                name='Login'
                onClick={onLinkClick}>Login</button>
              <button
                className='btn border-info border rounded-sm mx-1 text-white'
                name='Register'
                onClick={onLinkClick}>Register</button>
            </>
          }
          {user &&
            <>
              <button
                className='btn border-info border rounded-sm mx-1 text-white'
                name='user'
                onClick={onLinkClick}>{user}'s history</button>
              <button
                className='btn border-info border rounded-sm mx-1 text-white'
                name='Logout'
                onClick={onLinkClick}>Logout</button>
            </>
          }
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
