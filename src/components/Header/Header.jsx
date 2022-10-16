import React from 'react';
import { func, number, shape, string } from 'prop-types';

import logo from '../../images/logo.svg';
import avatar from '../../images/placeholder.png';
import ToggleSwitch from '../ToggleSwitch/ToggleSwitch';
import './Header.css';

function Header({ openAddModal, location }) {
  const date = new Date().toLocaleString('default', {
    month: 'long',
    day: 'numeric',
  });

  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="WTWR logo" />
      <div className="header__time-and-place">
        <span className="header__time">
          <time className="header__time" dateTime={date}>
            {`${date}, `}
          </time>
        </span>
        <span className="header__place">{location.city}</span>
      </div>
      <nav className="header__nav">
        <ToggleSwitch />
        <button
          className="header__add-clothes-button"
          type="button"
          onClick={openAddModal}
        >
          <span className="header__button-text">+ Add Clothes</span>
        </button>

        <div className="user">
          <p className="name">Kevin Loughead</p>
          <img className="avatar" src={avatar} alt="User's avatar" />
        </div>
      </nav>
    </header>
  );
}

Header.propTypes = {
  openAddModal: func.isRequired,
  location: shape({ latitude: number, longitude: number, city: string })
    .isRequired,
};

export default Header;
