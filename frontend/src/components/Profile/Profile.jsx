import React, { useContext } from 'react';
import { func } from 'prop-types';

import ItemCard from '../ItemCard/ItemCard';
import './Profile.css';
import avatar from '../../images/avatar.png';
import { user } from '../../utils/constants';

import AppContext from '../../contexts/AppContext';

function Profile({ openModal }) {
  const { clothing } = useContext(AppContext);

  return (
    <div className="profile">
      <aside>
        <div className="user">
          <p className="name">{user.name}</p>
          <img className="avatar" src={avatar} alt="User's avatar" />
        </div>
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
