import React from 'react';
import './Sidebar.css';
import { FaCog, FaSignOutAlt } from 'react-icons/fa';
import { CiHome } from "react-icons/ci";


const Sidebar = () => {
  return (
    <aside className="sidebar">
      <ul>
        <li className="sidebar-item">
          <div className="sidebar-item-container">
            <CiHome className="sidebar-icon" />
            Dashboard
          </div>
        </li>
        <li className="sidebar-item">
          <div className="sidebar-item-container">
            <FaCog className="sidebar-icon" />
            Settings
          </div>
        </li>
        <li className="sidebar-item">
          <div className="sidebar-item-container">
            <FaSignOutAlt className="sidebar-icon" />
            Log out
          </div>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
