import React, { useContext } from 'react';
import { shape, func, number } from 'prop-types';

import ItemCard from '../ItemCard/ItemCard';
import './Profile.css';

import AppContext from '../../contexts/AppContext';
import { getTempDescriptor } from '../../utils/helpers';

function Profile({ openModal, weather }) {
  const { clothing, currentUser, handleLogout } = useContext(AppContext);

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
        <ul role="list" className="cards">
          {clothing
            .filter((item) => item.owner === currentUser._id)
            .filter(
              (item) => item.weather === getTempDescriptor(weather.temp.F)
            )
            .map((item) => (
              <ItemCard key={item._id} data={item} openModal={openModal} />
            ))}
        </ul>
      </div>
    </div>
  );
}

Profile.propTypes = {
  openModal: func.isRequired,
  weather: shape({ temp: shape({ F: number, C: number }) }).isRequired,
};
export default Profile;
