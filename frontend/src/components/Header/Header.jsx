import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { func, number, shape, string } from 'prop-types';

import logo from '../../images/logo.svg';
import ToggleSwitch from '../ToggleSwitch/ToggleSwitch';
import AppContext from '../../contexts/AppContext';
import './Header.css';

function Header({ openModal, location }) {
  const { loggedIn, currentUser } = useContext(AppContext);

  const date = new Date().toLocaleString('default', {
    month: 'short',
    day: 'numeric',
  });

  return (
    <header className="header">
      <NavLink to="/">
        <img className="header__logo" src={logo} alt="WTWR logo" />
      </NavLink>
      <div className="header__time-and-place ellipsis">
        <span>
          <time className="header__time" dateTime={date}>
            {`${date}, `}
          </time>
        </span>
        <span className="header__place">{location.city}</span>
      </div>
      <nav className="header__nav">
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
    </header>
  );
}

Header.propTypes = {
  openModal: func.isRequired,
  location: shape({ latitude: number, longitude: number, city: string })
    .isRequired,
};

export default Header;
