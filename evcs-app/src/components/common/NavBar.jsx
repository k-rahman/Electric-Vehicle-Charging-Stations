import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = ({ siteName = '', user, onHistoryClick, onLinkClick, onLogout }) => {
  return (
    <nav className="navbar navbar-expand-lg">
      <Link className="navbar-brand" to='/'>{siteName}</Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
        <div className="navbar-nav">
          {!user &&
            <>
              <button
                className='btn border rounded-sm mx-1'
                name='Login'
                onClick={onLinkClick}>Login</button>
              <button
                className='btn border rounded-sm mx-1'
                name='Register'
                onClick={onLinkClick}>Register</button>
            </>
          }
          {user &&
            <>
              <button
                className='btn border rounded-sm mx-1'
                name='user'
                onClick={onHistoryClick}>{user}'s history</button>
              <button
                className='btn border rounded-sm mx-1'
                name='Logout'
                onClick={onLogout}>Logout</button>
            </>
          }
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
