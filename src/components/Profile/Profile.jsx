import React from 'react';
import './Profile.css';
import avatar from '../../images/placeholder.png';

function Profile() {
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
        <button type="button">+ Add new</button>
        <ul>
          <li>foo</li>
          <li>bar</li>
          <li>baz</li>
        </ul>
      </div>
    </div>
  );
}

export default Profile;
