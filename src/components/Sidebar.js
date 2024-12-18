// import React from 'react';
// import './Sidebar.css';
// import { FaCog, FaSignOutAlt } from 'react-icons/fa';
// import { CiHome } from "react-icons/ci";


// const Sidebar = () => {
//   return (
//     <aside className="sidebar">
//       <ul>
//         <li className="sidebar-item">
//           <div className="sidebar-item-container">
//             <CiHome className="sidebar-icon" />
//             Dashboard
//           </div>
//         </li>
//         <li className="sidebar-item">
//           <div className="sidebar-item-container">
//             <FaCog className="sidebar-icon" />
//             Settings
//           </div>
//         </li>
//         <li className="sidebar-item">
//           <div className="sidebar-item-container">
//             <FaSignOutAlt className="sidebar-icon" />
//             Log out
//           </div>
//         </li>
//       </ul>
//     </aside>
//   );
// };

// export default Sidebar;

import React, { useContext } from 'react';
import './Sidebar.css';
import { FaCog, FaSignOutAlt } from 'react-icons/fa';
import { CiHome } from 'react-icons/ci';
import AuthContext from '../context/AuthContext';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Sidebar = () => {
  const { currentRole } = useContext(AuthContext); // Get the current role from context
  const navigate = useNavigate(); // Initialize the navigate function

  const handleDashboardClick = () => {
    // Navigate to the appropriate dashboard based on the current role
    switch (currentRole) {
      case 'Supervisor':
        navigate('/faculty-dashboard');
        break;
      case 'FypManager':
        navigate('/fyp-dashboard');
        break;
      case 'PanelMember':
        navigate('/panel-member-dashboard');
        break;
      case 'Director':
        navigate('/director-dashboard');
        break;
      default:
        navigate('/student-dashboard'); // Default route for students or any other role
    }
  };

  return (
    <aside className="sidebar">
      <ul>
        <li className="sidebar-item" onClick={handleDashboardClick}>
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
