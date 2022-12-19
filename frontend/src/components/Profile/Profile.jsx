import React, { useContext } from 'react';
import { func } from 'prop-types';

import ItemCard from '../ItemCard/ItemCard';
import './Profile.css';

import AppContext from '../../contexts/AppContext';

function Profile({ openModal }) {
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
          {clothing.map((item) => (
            <ItemCard key={item._id} data={item} openModal={openModal} />
          ))}
        </ul>
      </div>
    </div>
  );
}

Profile.propTypes = {
  openModal: func.isRequired,
};
export default Profile;
