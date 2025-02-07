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
        } else if (role === 'Panel') {
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
                                    onMouseEnter={(e) => handleHover(e, true)} 
                                    onMouseLeave={(e) => handleHover(e, false)}
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

const handleHover = (e, isHovered) => {
    const button = e.target;
    if (isHovered) {
        button.style.backgroundColor = '#0056b3'; // Darker shade on hover
        button.style.transform = 'scale(1.1)'; // Slightly increase size on hover
        button.style.boxShadow = '0 12px 16px rgba(0, 0, 0, 0.3)'; // More intense shadow on hover
    } else {
        button.style.backgroundColor = '#007bff'; // Original color
        button.style.transform = 'scale(1)'; // Reset size
        button.style.boxShadow = '0 8px 12px rgba(0, 0, 0, 0.2)'; // Reset shadow
    }
};

export default RoleSelectionPage;


const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
        backgroundColor: '#f0f4f8', // Soft background for better contrast
        minHeight: '100vh',
    },
    title: {
        fontSize: '36px', // Increased font size for the title
        fontWeight: '700', // Bolder title
        color: '#333',
        marginBottom: '30px', // More spacing below the title
    },
    roleList: {
        listStyleType: 'none',
        padding: 0,
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '20px', // Larger gap between buttons
    },
    roleItem: {
        margin: 0,
    },
    roleButton: {
        padding: '30px 60px', // Larger padding for bigger buttons
        backgroundColor: '#007bff', // Bootstrap primary color
        color: '#fff',
        border: 'none',
        borderRadius: '12px', // More rounded corners
        fontSize: '24px', // Increased font size for button text
        fontWeight: '600', // Bolder button text
        cursor: 'pointer',
        transition: 'background-color 0.3s ease, transform 0.2s ease',
        boxShadow: '0 8px 12px rgba(0, 0, 0, 0.2)', // More pronounced shadow
    },
};