import React, { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header'; // Assuming you have a Header component
// import styles from './commonCSS/supervisorStyles.js'; // Make sure your styles are consistent


const RoleSelectionPage = () => {
    const { roles, setCurrentRole } = useContext(AuthContext);
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
        else{
            navigate('/student-dashboard')
        }
    };

    return (
        <>
            <Header>
                <section style={styles.section}>
                    <h2>Select Your Role</h2>
                </section>
                <section style={styles.section}>
                    <ul style={styles.roleList}>
                        {roles.map((role, index) => (
                            <li key={index} style={styles.roleItem}>
                                <button 
                                    onClick={() => handleRoleSelection(role)} 
                                    style={styles.roleButton}
                                >
                                    {role}
                                </button>
                            </li>
                        ))}
                    </ul>
                </section>
            </Header>
        </>
    );
};

export default RoleSelectionPage;

const styles = {
    section: {
        padding: '20px',
        backgroundColor: '#f9f9f9', // Light background for sections
        borderRadius: '8px',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)', // Subtle shadow for depth
        margin: '20px 0', // Space between sections
    },
    roleList: {
        listStyleType: 'none', // Remove default list styling
        padding: 0,
    },
    roleItem: {
        margin: '10px 0', // Space between role items
    },
    roleButton: {
        padding: '30px 102px',
        backgroundColor: '#007bff', // Bootstrap primary color
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
    
    },
    roleButtonHover: {
        backgroundColor: '#0056b3', // Darker shade on hover
    },
};

