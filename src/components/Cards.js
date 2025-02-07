import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core';

const Card = ({ icon, title, available, styles }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
    <div
      className="card"
      style={styles.card}
      onMouseEnter={(e) => (e.currentTarget.style.transform = styles.cardHover.transform)}
      onMouseLeave={(e) => (e.currentTarget.style.transform = '')}
    >
      <div style={styles.iconContainer}>
        <FontAwesomeIcon icon={icon} size="2x" style={styles.cardIcon} />
      </div>
      <h2 style={styles.cardTitle}>{title}</h2>
      <p style={styles.cardText}>
    <span style={styles.count}>{available}</span>
      </p>
      
    </div>
    </div>
  );
};

const Summary = () => {
  const styles = {
    card: {
      backgroundColor: '#ffffff',
      borderRadius: '10px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      padding: '20px',
      textAlign: 'center',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      cursor: 'pointer',
      maxWidth: '250px',
    },
    cardHover: {
      transform: 'scale(1.05)',
      boxShadow: '0 6px 10px rgba(0, 0, 0, 0.2)',
    },
    cardIcon: {
    //   color: '#4CAF50',
      marginBottom: '10px',
    },
    cardTitle: {
      fontSize: '1.5em',
      fontWeight: 'bold',
      color: '#333',
      margin: '10px 0',
    },
    cardText: {
      fontSize: '1em',
      color: '#666',
      margin: '5px 0',
    },
    iconContainer: {
      backgroundColor: '#E8F5E9',
      borderRadius: '50%',
      display: 'inline-flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '50px',
      height: '50px',
      margin: '0 auto 15px',
    },
  };

//   return (
//     <div className="summary" style={{ display: 'flex', gap: '20px', justifyContent: 'center', padding: '20px' }}>
//       <Card
//         icon={icon}
//         title={title}
//         available={available}
//         occupied={occupied}
//         styles={styles}
//       />
//     </div>
//   );
};

export default Card;
