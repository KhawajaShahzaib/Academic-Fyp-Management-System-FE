import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import './Navbar.css';  // Ensure your custom CSS is imported
import riphahLogo from '../public/RIU-Post-01-800x239.png';
import notificationIcon from '../public/logo512.png';

const Navbar = () => {
    const { user, logoutUser } = useContext(AuthContext);

    let menuItems = [];

    if (user.user_type === 'admin') {
        menuItems = (
            <>
                <Link to="/">Profile</Link>
                <a>Manage-Users</a>
                <a>Settings</a>
                <Link to="/course">Courses</Link>
                <Link to="/" onClick={logoutUser}>Logout</Link>
            </>
        );
    } else if (user.user_type === 'student') {
        menuItems = (
            <>
                <Link to="/">Profile</Link>
                <a>Enrollment</a>
                <a>Attendance</a>
                <a>Courses</a>
                <Link to="/" onClick={logoutUser}>Logout</Link>
            </>
        );
    } else if (user.user_type === 'faculty') {
        menuItems = (
            <>
                <Link to="/"> <div className="menu-item">Profile</div></Link>
                <a className="menu-item">FYP</a>
                <a className="menu-item">Manage Students</a>
                <a className="menu-item">Manage Faculty</a>
                <Link to="/" onClick={logoutUser}>Logout</Link>
            </>
        );
    } else if (user.user_type === 'parent') {
        menuItems = (
            <>
                <Link to="/">Profile</Link>
                <div>Child Enrollment</div>
                <div>Parent Meetings</div>
                <Link to="/" onClick={logoutUser}>Logout</Link>
            </>
        );
    }

    return (
        <div className="navbar">
            <div className="logo">
                <img src={riphahLogo} alt="Riphah Logo" />
            </div>
            <div className="menu">
                {menuItems}
            </div>
            <div className="search">
                <input type="text" placeholder="Search..." />
            </div>
            <div className="notification">
                <img src={notificationIcon} alt="Notification Icon" />
                <div className="navbar-right">
                  </div>
            </div>
        </div>
    );
};

export default Navbar;
