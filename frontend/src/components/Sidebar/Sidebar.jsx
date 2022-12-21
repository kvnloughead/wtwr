import React, { useContext, useState } from 'react';
import { func } from 'prop-types';

import AppContext from '../../contexts/AppContext';
import './Sidebar.css';

function Sidebar({ openModal }) {
  const { currentUser, handleLogout } = useContext(AppContext);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/click-events-have-key-events
    <aside
      aria-label="sidebar"
      onClick={toggleSidebar}
      className={`sidebar ${sidebarOpen ? 'sidebar_open' : ''}`}
    >
      <div className="user">
        <p className="name">{currentUser.name}</p>
        <img className="avatar" src={currentUser.avatar} alt="User's avatar" />
      </div>
      <button
        aria-label="change profile data"
        type="button"
        className="button"
        onClick={openModal}
        data-modal="edit-profile"
      />
      <button
        aria-label="logout"
        type="button"
        className="button"
        onClick={handleLogout}
        data-modal=""
      />
    </aside>
  );
}

Sidebar.propTypes = {
  openModal: func.isRequired,
};

export default Sidebar;
