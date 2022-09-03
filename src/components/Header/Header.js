import React from 'react';
import logo from '../../images/logo.svg';
import avatar from '../../images/placeholder.png';
import './Header.css';

const Header = () => {
  const date = new Date().toLocaleString('default', {
    month: 'long',
    day: 'numeric',
  });

  const city = 'Pottstown';

  return (
    <header className='header'>
      <img className='header__logo' src={logo} alt='WTWR logo' />
      <p className='header__time-and-place'>
        <time className='header__time' dateTime={date}>
          {date}
        </time>
        , {city}
      </p>
      <button className='header__add-clothes-button'>+ Add Clothes</button>
      <p className='header__username'>Kevin Loughead</p>
      <img className='header__avatar' src={avatar} alt="User's avatar" />
    </header>
  );
};

export default Header;
