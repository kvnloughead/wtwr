import React, { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { func } from 'prop-types';

import ToggleSwitch from '../ToggleSwitch/ToggleSwitch';
import AppContext from '../../contexts/AppContext';
import './Nav.css';

function Nav({ openModal }) {
  const { loggedIn, currentUser, handleLogout } = useContext(AppContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <>
      <button
        onClick={toggleMobileMenu}
        type="button"
        aria-label="open-menu"
        className={`menu-icon ${mobileMenuOpen ? 'menu-icon_open' : ''}`}
      />
      <nav className={`nav ${mobileMenuOpen ? 'nav_open' : ''}`}>
        <ToggleSwitch />
        {loggedIn ? (
          <>
            <button
              className="button button_action_add"
              aria-label="add-clothes"
              type="button"
              onClick={openModal}
              data-modal="add-item"
            />
            <button
              type="button"
              className="button"
              onClick={handleLogout}
              data-modal=""
            >
              Logout
            </button>
            <NavLink to="/profile" style={{ textDecoration: 'none' }}>
              <div className="user">
                <p className="name ellipsis">{currentUser.name}</p>
                <img
                  className="avatar"
                  src={currentUser.avatar}
                  alt="User's avatar"
                />
              </div>
            </NavLink>
          </>
        ) : (
          <>
            <button
              type="button"
              className="button"
              onClick={openModal}
              data-modal="login"
            >
              Login
            </button>
            <button
              type="button"
              className="button"
              onClick={openModal}
              data-modal="registration"
            >
              Sign up
            </button>
          </>
        )}
      </nav>
    </>
  );
}

Nav.propTypes = {
  openModal: func.isRequired,
};

export default Nav;
