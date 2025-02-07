
// import './supervisor.css';
// import styles from '../commonCSS/supervisorStyles.js'
import styles from '../commonCSS/supervisorStyles.js'
import React, { useState, useContext } from 'react';
import Header from "../../components/Header";
// import '../../components/HeaderMe.css'
import AuthContext from '../../context/AuthContext';


const ManageSpecialization = () => {
//   const { user } = useContext(AuthContext);
  const { authTokens } = useContext(AuthContext);
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

  const handleSubmit = async () => {
      try {
          const response = await fetch('http://127.0.0.1:8000/api/fyp/update-supervisor-specialties/', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${authTokens.access}`
              },
              body: JSON.stringify({ specialties }),
          });
          const data = await response.json();
          if (response.ok) {
              alert(data.message);  // Show success message
          } else {
              alert(data.message);  // Show error message
          }
      } catch (error) {
          console.error('Error updating specialties:', error);
          alert('An error occurred while updating specialties.');
      }
  };

  return (
    <Header>
        <section style={styles.section}>
            <h2 style={styles.sectionHeader}>Manage Supervisor Specialties</h2>
            <h3 style={styles.subHeader}>Specialty Areas</h3>
            <div style={styles.specialtyContainer}>
                {specialtyOptions.map(option => (
                    <div key={option} style={styles.checkboxContainer}>
                                                <label htmlFor={option} style={styles.checkboxlabel}>{option}</label>

                        <input
                            type="checkbox"
                            id={option}
                            value={option}
                            checked={specialties.includes(option)}
                            onChange={handleSpecialtyChange}
                            style={styles.checkbox}
                        />
                    </div>
                ))}
                <div style={styles.customSpecialtyContainer}>
                    <input
                        type="text"
                        style={styles.input}
                        value={customSpecialty}
                        onChange={(e) => setCustomSpecialty(e.target.value)}
                        placeholder="Add custom specialty"
                    />
                    <button style={styles.actionButton} onClick={handleAddCustomSpecialty}>
                        Add Specialty
                    </button>
                </div>
            </div>
            <h4 style={styles.subHeader}>Selected Specialties</h4>
            <ul style={styles.list}>
                {specialties.map(specialty => (
                    <li key={specialty} style={styles.listItem}>{specialty}</li>
                ))}
            </ul>
            <button style={styles.actionButton} onClick={handleSubmit}>
                Save Specialties
            </button>
        </section>
    </Header>
);

};

export default ManageSpecialization;



// Original no backend
// const ManageSpecialization = () => {
//     const { user } = useContext(AuthContext);
//     const [specialties, setSpecialties] = useState([]);
//     const [customSpecialty, setCustomSpecialty] = useState('');
  
//     const specialtyOptions = [
//       'Data Science',
//       'Artificial Intelligence',
//       'Machine Learning',
//       'Computer Vision',
//       'Web Development',
//       'Android Development',
//       'Cybersecurity',
//       'Cloud Computing',
//       'Blockchain',
//       'Internet of Things'
//     ];
//     const handleSpecialtyChange = (event) => {
//         const value = event.target.value;
//         setSpecialties(
//           specialties.includes(value)
//             ? specialties.filter(s => s !== value)
//             : [...specialties, value]
//         );
//       };
    
//       const handleAddCustomSpecialty = () => {
//         if (customSpecialty && !specialties.includes(customSpecialty)) {
//           setSpecialties([...specialties, customSpecialty]);
//           setCustomSpecialty('');
//         }
//       };
//     return (
//       <Header>
//         <section style={styles.section}>
//               <h2 style={styles.sectionHeader}>Manage Supervisor Specialties</h2>
//               <h3>Specialty Areas</h3>
//               <div>
//                 {specialtyOptions.map(option => (
//                   <div key={option}>
//                     <input
//                       type="checkbox"
//                       id={option}
//                       checked={specialties.includes(option)}
//                       onChange={handleSpecialtyChange}
//                     />
//                     <label htmlFor={option}>{option}</label>
//                   </div>
//                 ))}
//                 <input
//                   type="text"
//                   style={styles.input}
//                   value={customSpecialty}
//                   onChange={(e) => setCustomSpecialty(e.target.value)}
//                   placeholder="Add custom specialty"
//                 />
//                 <button style={styles.button} onClick={handleAddCustomSpecialty}>Add Specialty</button>
//               </div>
//               <h4>Selected Specialties</h4>
//               <ul style={styles.list}>
//                 {specialties.map(specialty => (
//                   <li key={specialty} style={styles.listItem}>{specialty}</li>
//                 ))}
//               </ul>
//             </section>
//             </Header>
//     );
//   };
  
//   export default ManageSpecialization;
