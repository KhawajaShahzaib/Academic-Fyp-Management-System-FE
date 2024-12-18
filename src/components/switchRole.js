//ORigianl only frontend
// import React from 'react';
// import './switchRole.css';
// // import riphahLogo from '../public/riphah-logo.png';
// // import notificationIcon from '../public/notification-icon.png';
// import { useNavigate } from 'react-router-dom';

// const SwitchRole = ({ currentUserRole }) => {
//   const navigate = useNavigate();
  
//   const handleRoleSwitch = (event) => {
//     const role = event.target.value;
//     if (role) {
//       navigate(`/${role}`);
//     }
//   };
  
//   return (
  
//     <div className="switch-dropdown">
//       <select className="switch-select" onChange={handleRoleSwitch}>
//         <option disabled defaultValue>Switch Role</option>
//         {currentUserRole !== 'PBLIncharge' && <option value="DbFypInch">Switch to FYP Incharge</option>}
//         {currentUserRole !== 'Supervisor' && <option value="DbFypSup">Switch to Supervisor</option>}
//         {currentUserRole !== 'Student' && <option value="StudentDash">Switch to Student</option>}
//         {currentUserRole !== 'Teacher' && <option value="DbFypDir">Switch to Director</option>}
//         {currentUserRole !== 'PanelMember' && <option value="PanelMember">Switch to Panel</option>}
//         {/* {currentUserRole !== 'MainPage' && <option value="MainPage">Switch to Main Page</option>} */}
//       </select>
//     </div>
   
//   );
// };

// export default SwitchRole;

import React, { useContext } from 'react';
import './switchRole.css';
import { useNavigate } from 'react-router-dom';
// import alia from '../context/AuthContext'
import AuthContext from '../context/AuthContext';
 // Import your AuthContext

const SwitchRole = () => {
  const { currentRole, roles, setCurrentRole } = useContext(AuthContext); // Access roles and setCurrentRole
  const navigate = useNavigate();

  const handleRoleSelection = (role) => {
    setCurrentRole(role);
    // Navigate to the appropriate dashboard based on the selected role
    if (role === 'Supervisor') {
        navigate('/faculty-dashboard');
    } else if (role === 'FypManager') {
        navigate('/fyp-dashboard');
    } else if (role === 'PanelMember') {
        navigate('/panel-member-dashboard');
    } else if (role === 'Director') {
        navigate('/director-dashboard');
    }
};
  
  const handleRoleSwitch = (event) => {
    const role = event.target.value;
    if (role) {
      setCurrentRole(role); // Update the current role in context
      handleRoleSelection(role); // Navigate to the respective role's dashboard
    }
  };
  
  return (
    <div className="switch-dropdown">
      <select className="switch-select" onChange={handleRoleSwitch} defaultValue={currentRole}>
        <option disabled>Switch Role</option>
        {roles.map((role) => (
          <option key={role} value={role}>
            Switch to {role}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SwitchRole;
