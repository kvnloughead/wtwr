import React from 'react';
import { func } from 'prop-types';

import './Profile.css';
import avatar from '../../images/placeholder.png';

function Profile({ openAddModal }) {
  return (
    <div className="profile">
      <aside>
        <div className="user">
          <p className="name">Kevin Loughead</p>
          <img className="avatar" src={avatar} alt="User's avatar" />
        </div>
      </aside>
      <div className="items">
        <h2>Your items</h2>
        <button
          className="add-clothes-btn"
          aria-label="add-clothes"
          type="button"
          onClick={openAddModal}
        />
        <ul>
          <li>foo</li>
          <li>bar</li>
          <li>baz</li>
        </ul>
      </div>
    </div>
  );
}

Profile.propTypes = {
  openAddModal: func.isRequired,
};
export default Profile;
