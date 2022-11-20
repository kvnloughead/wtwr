import React, { useContext } from 'react';
import { func, number, shape, string } from 'prop-types';

import logo from '../../images/logo.svg';
import avatar from '../../images/avatar.png';
import ToggleSwitch from '../ToggleSwitch/ToggleSwitch';
import AppContext from '../../contexts/AppContext';
import './Header.css';

function Header({ openModal, location }) {
  const { loggedIn } = useContext(AppContext);

  const date = new Date().toLocaleString('default', {
    month: 'short',
    day: 'numeric',
  });

  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="WTWR logo" />
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
            <div className="user">
              <p className="name ellipsis">Kevin James Loughead</p>
              <img className="avatar" src={avatar} alt="User's avatar" />
            </div>
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
