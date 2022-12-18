import React from 'react';
import { NavLink } from 'react-router-dom';
import { func, number, shape, string } from 'prop-types';

import Nav from '../Nav/Nav';
import logo from '../../images/logo.svg';
import './Header.css';

function Header({ openModal, location }) {
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
      <Nav openModal={openModal} />
    </header>
  );
}

Header.propTypes = {
  openModal: func.isRequired,
  location: shape({ latitude: number, longitude: number, city: string })
    .isRequired,
};

export default Header;
