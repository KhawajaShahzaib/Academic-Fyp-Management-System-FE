import styles from '../commonCSS/supervisorStyles.js';
import React, { useState, useContext } from 'react';
import '../../components/HeaderMe.css'; 
import Header from "../../components/Header";
import AuthContext from '../../context/AuthContext';
import axios from 'axios';

const domains = [
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

const ShareIdeas = () => {
  const { authTokens } = useContext(AuthContext); // Ensure you are getting auth tokens
  const { user } = useContext(AuthContext);
  const supervisor = user.username;

  const [fypIdea, setFypIdea] = useState({
    title: '',
    description: '',
    domain: '',
    preferred_degree: '',
    customDomain: ''
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!fypIdea.title) newErrors.title = 'Title is required.';
    if (!fypIdea.description) newErrors.description = 'Description is required.';
    if (!fypIdea.domain && !fypIdea.customDomain) newErrors.domain = 'Domain is required.';
    if (!fypIdea.preferred_degree) newErrors.preferred_degree = 'Preferred degree level is required.';
    return newErrors;
  };

  const handleSaveFypIdea = async () => {
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const response = await fetch('http://127.0.0.1:8000/api/fyp/fyp-ideas/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authTokens.access}`,
      },
      body: JSON.stringify({
        ...fypIdea,
        domain: fypIdea.customDomain || fypIdea.domain // Use customDomain if provided
      }),
    });

    const data = await response.json(); // Get the response body

    if (response.ok) {
      alert('FYP Idea saved successfully!');
      setFypIdea({
        title: '',
        description: '',
        domain: '',
        preferred_degree: '',
        customDomain: ''
      });
      setErrors({});
    } else {
      console.error('Error details:', data); // Log error details
      alert('Failed to save FYP Idea: ' + (data.detail || data.non_field_errors.join(', ')));
    }
  };

  return (
    <Header>
      <section style={styles.section}>
        <h2 style={styles.sectionHeader}>Share FYP Ideas</h2>
        
        <input
          type="text"
          style={styles.input}
          value={fypIdea.title}
          onChange={(e) => {
            setFypIdea({ ...fypIdea, title: e.target.value });
            setErrors({ ...errors, title: '' }); // Clear error if exists
          }}
          placeholder="Title"
        />
        {errors.title && <span style={{ color: 'red' }}>{errors.title}</span>}
        
        <textarea
          style={styles.textarea}
          value={fypIdea.description}
          onChange={(e) => {
            setFypIdea({ ...fypIdea, description: e.target.value });
            setErrors({ ...errors, description: '' }); // Clear error if exists
          }}
          placeholder="Description"
        ></textarea>
        {errors.description && <span style={{ color: 'red' }}>{errors.description}</span>}

        <select
          style={styles.input}
          value={fypIdea.domain}
          onChange={(e) => {
            setFypIdea({ ...fypIdea, domain: e.target.value, customDomain: '' });
            setErrors({ ...errors, domain: '' }); // Clear error if exists
          }}
        >
          <option value="">Select Domain</option>
          {domains.map((domain, index) => (
            <option key={index} value={domain}>{domain}</option>
          ))}
        </select>

        <input
          type="text"
          style={styles.input}
          value={fypIdea.customDomain}
          onChange={(e) => {
            setFypIdea({ ...fypIdea, customDomain: e.target.value, domain: '' });
            setErrors({ ...errors, domain: '' }); // Clear error if exists
          }}
          placeholder="Custom Domain (if not listed)"
        />
        {errors.domain && <span style={{ color: 'red' }}>{errors.domain}</span>}

        <select
          style={styles.input}
          value={fypIdea.preferred_degree}
          onChange={(e) => {
            setFypIdea({ ...fypIdea, preferred_degree: e.target.value });
            setErrors({ ...errors, preferred_degree: '' }); // Clear error if exists
          }}
        >
          <option value="">Select Preferred Degree Level</option>
          <option value="Bachelor's">Bachelor's</option>
          <option value="Master's">Master's</option>
        </select>
        {errors.preferred_degree && <span style={{ color: 'red' }}>{errors.preferred_degree}</span>}

        <button style={styles.button} onClick={handleSaveFypIdea}>Save Idea</button>
      </section>
    </Header>
  );
};



export default ShareIdeas;

//Backend added Working
// const ShareIdeas = () => {
//   const { authTokens} = useContext(AuthContext);  // Ensure you are getting auth tokens
//   const { user } = useContext(AuthContext)
//   const supervisor = user.username
//   const [fypIdea, setFypIdea] = useState({
//     title: '',
//     description: '',
//     domain: '',
//     preferred_degree: ''
//   });
//   const handleSaveFypIdea = async () => {
//     const response = await fetch('http://127.0.0.1:8000/api/fyp/fyp-ideas/', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${authTokens.access}`,
//       },
//       body: JSON.stringify(fypIdea),
//     });
    
//     const data = await response.json(); // Get the response body
    
//     if (response.ok) {
//       alert('FYP Idea saved successfully!');
//       setFypIdea({
//         title: '',
//         description: '',
//         domain: '',
//         preferred_degree: ''
//       });
//     } else {
//       console.error('Error details:', data); // Log error details
//       alert('Failed to save FYP Idea: ' + data.detail || data.non_field_errors.join(', '));
//     }
//   };

  
//   return (
//     <Header>
//       <section style={styles.section}>
//         <h2 style={styles.sectionHeader}>Share FYP Ideas</h2>
//         <input
//           type="text"
//           style={styles.input}
//           value={fypIdea.title}
//           onChange={(e) => setFypIdea({ ...fypIdea, title: e.target.value })}
//           placeholder="Title"
//         />
//         <textarea
//           style={styles.textarea}
//           value={fypIdea.description}
//           onChange={(e) => setFypIdea({ ...fypIdea, description: e.target.value })}
//           placeholder="Description"
//         ></textarea>
 
//         <input
//           type="text"
//           style={styles.input}
//           value={fypIdea.domain}
//           onChange={(e) => setFypIdea({ ...fypIdea, domain: e.target.value })}
//           placeholder="Domain (e.g., AI, ML)"
//         />
//         <select
//   style={styles.input}
//   value={fypIdea.preferred_degree}
//   onChange={(e) => {
//     console.log('Selected value:', e.target.value);  // Log the selected value
//     setFypIdea({ ...fypIdea, preferred_degree: e.target.value });
//   }}
// >
//   <option value="">Select Preferred Degree Level</option>
//   <option value="Bachelor's">Bachelor's</option>
//   <option value="Master's">Master's</option>
// </select>
//         <button style={styles.button} onClick={handleSaveFypIdea}>Save Idea</button>
//       </section>
//     </Header>
//   );

// }



// export default ShareIdeas;

//Original No Backend
// const ShareIdeas = () => {
//   // const { user } = useContext(AuthContext);

//   // const currentUserRole = user.user_type; 
//     const [fypIdea, setFypIdea] = useState({
//         title: '',
//         description: '',
//         domain: '',
//         preferredDegree: ''
//       });
//       const handleSaveFypIdea = () => {
//         alert('FYP Idea saved locally!');
//         setFypIdea({
//           title: '',
//           description: '',
//           domain: '',
//           preferredDegree: ''
//         });
//       };    
//     return (
//       <Header>
//         <section style={styles.section}>
//               <h2 style={styles.sectionHeader}>Share FYP Ideas</h2>
//               <input
//                 type="text"
//                 style={styles.input}
//                 value={fypIdea.title}
//                 onChange={(e) => setFypIdea({ ...fypIdea, title: e.target.value })}
//                 placeholder="Title"
//               />
//               <textarea
//                 style={styles.textarea}
//                 value={fypIdea.description}
//                 onChange={(e) => setFypIdea({ ...fypIdea, description: e.target.value })}
//                 placeholder="Description"
//               ></textarea>
             
//               <input
//                 type="text"
//                 style={styles.input}
//                 value={fypIdea.domain}
//                 onChange={(e) => setFypIdea({ ...fypIdea, domain: e.target.value })}
//                 placeholder="Domain (e.g., AI, ML)"
//               />
//               <select
//                 style={styles.input}
//                 value={fypIdea.preferredDegree}
//                 onChange={(e) => setFypIdea({ ...fypIdea, preferredDegree: e.target.value })}
//               >
//                 <option value="">Select Preferred Degree Level</option>
//                 <option value="Bachelor's">Bachelor's</option>
//                 <option value="Master's">Master's</option>
//               </select>
//               <button style={styles.button} onClick={handleSaveFypIdea}>Save Idea</button>
//             </section>
//             </Header>
     
//       );

// }

// export default ShareIdeas;
