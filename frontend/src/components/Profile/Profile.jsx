import React, { useContext } from 'react';
import { shape, func, number } from 'prop-types';

import './Profile.css';

import AppContext from '../../contexts/AppContext';
import CardList from '../CardList/CardList';

function Profile({ openModal, weather }) {
  const { currentUser, handleLogout } = useContext(AppContext);

  return (
    <div className="profile">
      <aside>
        <div className="user">
          <p className="name">{currentUser.name}</p>
          <img
            className="avatar"
            src={currentUser.avatar}
            alt="User's avatar"
          />
        </div>
        <button
          type="button"
          className="button"
          onClick={openModal}
          data-modal="edit-profile"
        >
          Change profile data
        </button>
        <button
          type="button"
          className="button"
          onClick={handleLogout}
          data-modal=""
        >
          Logout
        </button>
      </aside>
      <div className="container">
        <div>
          <h2>Your items</h2>
          <button
            className="button"
            aria-label="add-clothes"
            type="button"
            data-modal="add-item"
            onClick={openModal}
          />
        </div>
        <CardList
          openModal={openModal}
          weather={weather}
          filters={['weather', 'user']}
        />
      </div>
    </div>
  );
}

Profile.propTypes = {
  openModal: func.isRequired,
  weather: shape({ temp: shape({ F: number, C: number }) }).isRequired,
};
export default Profile;
