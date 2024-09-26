import React from 'react';
import './switchRole.css';
// import riphahLogo from '../public/riphah-logo.png';
// import notificationIcon from '../public/notification-icon.png';
import { useNavigate } from 'react-router-dom';

const SwitchRole = ({ currentUserRole }) => {
  const navigate = useNavigate();
  
  const handleRoleSwitch = (event) => {
    const role = event.target.value;
    if (role) {
      navigate(`/${role}`);
    }
  };
  
  return (
  
    <div className="switch-dropdown">
      <select className="switch-select" onChange={handleRoleSwitch}>
        <option disabled defaultValue>Switch Role</option>
        {currentUserRole !== 'PBLIncharge' && <option value="DbFypInch">Switch to FYP Incharge</option>}
        {currentUserRole !== 'Supervisor' && <option value="DbFypSup">Switch to Supervisor</option>}
        {currentUserRole !== 'Student' && <option value="StudentDash">Switch to Student</option>}
        {currentUserRole !== 'Teacher' && <option value="DbFypDir">Switch to Director</option>}
        {currentUserRole !== 'PanelMember' && <option value="PanelMember">Switch to Panel</option>}
        {/* {currentUserRole !== 'MainPage' && <option value="MainPage">Switch to Main Page</option>} */}
      </select>
    </div>
   
  );
};

export default SwitchRole;
