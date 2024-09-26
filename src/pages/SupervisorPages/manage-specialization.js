
// import './supervisor.css';
import styles from '../commonCSS/supervisorStyles.js'
import React, { useState } from 'react';
import Header from "../../components/Header";
import '../../components/HeaderMe.css'


const ManageSpecialization = () => {
    const [specialties, setSpecialties] = useState([]);
    const [customSpecialty, setCustomSpecialty] = useState('');
  
    const specialtyOptions = [
      'Data Science',
      'Artificial Intelligence',
      'Machine Learning',
      'Computer Vision',
      'Web Development',
      'Android Development',
      'Cybersecurity',
      'Cloud Computing',
      'Blockchain',
      'Internet of Things'
    ];
    const handleSpecialtyChange = (event) => {
        const value = event.target.value;
        setSpecialties(
          specialties.includes(value)
            ? specialties.filter(s => s !== value)
            : [...specialties, value]
        );
      };
    
      const handleAddCustomSpecialty = () => {
        if (customSpecialty && !specialties.includes(customSpecialty)) {
          setSpecialties([...specialties, customSpecialty]);
          setCustomSpecialty('');
        }
      };
    return (
      <Header>
        <section style={styles.section}>
              <h2 style={styles.sectionHeader}>Manage Supervisor Specialties</h2>
              <h3>Specialty Areas</h3>
              <div>
                {specialtyOptions.map(option => (
                  <div key={option}>
                    <input
                      type="checkbox"
                      id={option}
                      checked={specialties.includes(option)}
                      onChange={handleSpecialtyChange}
                    />
                    <label htmlFor={option}>{option}</label>
                  </div>
                ))}
                <input
                  type="text"
                  style={styles.input}
                  value={customSpecialty}
                  onChange={(e) => setCustomSpecialty(e.target.value)}
                  placeholder="Add custom specialty"
                />
                <button style={styles.button} onClick={handleAddCustomSpecialty}>Add Specialty</button>
              </div>
              <h4>Selected Specialties</h4>
              <ul style={styles.list}>
                {specialties.map(specialty => (
                  <li key={specialty} style={styles.listItem}>{specialty}</li>
                ))}
              </ul>
            </section>
            </Header>
    );
  };
  
  export default ManageSpecialization;

//   const styles = {
//     header: {
//       textAlign: 'center',
//       margin: '20px 0',
//     },
//     section: {
//       margin: '20px 0',
//       padding: '20px',
//       border: '1px solid #ddd',
//       borderRadius: '8px',
//       backgroundColor: '#f9f9f9',
//     },
//     sectionHeader: {
//       marginBottom: '10px',
//       fontSize: '1.5em',
//     },

//     input: {
//       display: 'block',
//       width: '100%',
//       padding: '10px',
//       margin: '10px 0',
//       border: '1px solid #ddd',
//       borderRadius: '4px',
//     },
//     textarea: {
//       display: 'block',
//       width: '100%',
//       padding: '10px',
//       margin: '10px 0',
//       border: '1px solid #ddd',
//       borderRadius: '4px',
//       minHeight: '100px',
//     },

//     list: {
//       listStyle: 'none',
//       padding: 0,
//     },
//     listItem: {
//       marginBottom: '10px',
//     },
   
//   };
  