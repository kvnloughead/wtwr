import React from 'react';
import { shape, func, number } from 'prop-types';

import './Profile.css';

import CardList from '../CardList/CardList';
import Sidebar from '../Sidebar/Sidebar';

function Profile({ openModal, weather }) {
  return (
    <div className="profile">
      <Sidebar openModal={openModal} />
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
