import styles from '../commonCSS/supervisorStyles.js'
import React, { useState, useContext } from 'react';
import '../../components/HeaderMe.css'; // Ensure your CSS is applied

// import ExcelGenerator from "../components/excelGenerator.js";
import Header from "../../components/Header";

const ShareIdeas = () => {
  // const { user } = useContext(AuthContext);

  // const currentUserRole = user.user_type; 
    const [fypIdea, setFypIdea] = useState({
        title: '',
        description: '',
        supervisor: '',
        domain: '',
        preferredDegree: ''
      });
      const handleSaveFypIdea = () => {
        alert('FYP Idea saved locally!');
        setFypIdea({
          title: '',
          description: '',
          supervisor: '',
          domain: '',
          preferredDegree: ''
        });
      };    
    return (
      <Header>
        <section style={styles.section}>
              <h2 style={styles.sectionHeader}>Share FYP Ideas</h2>
              <input
                type="text"
                style={styles.input}
                value={fypIdea.title}
                onChange={(e) => setFypIdea({ ...fypIdea, title: e.target.value })}
                placeholder="Title"
              />
              <textarea
                style={styles.textarea}
                value={fypIdea.description}
                onChange={(e) => setFypIdea({ ...fypIdea, description: e.target.value })}
                placeholder="Description"
              ></textarea>
              <input
                type="text"
                style={styles.input}
                value={fypIdea.supervisor}
                onChange={(e) => setFypIdea({ ...fypIdea, supervisor: e.target.value })}
                placeholder="Supervisor"
              />
              <input
                type="text"
                style={styles.input}
                value={fypIdea.domain}
                onChange={(e) => setFypIdea({ ...fypIdea, domain: e.target.value })}
                placeholder="Domain (e.g., AI, ML)"
              />
              <select
                style={styles.input}
                value={fypIdea.preferredDegree}
                onChange={(e) => setFypIdea({ ...fypIdea, preferredDegree: e.target.value })}
              >
                <option value="">Select Preferred Degree Level</option>
                <option value="Bachelor's">Bachelor's</option>
                <option value="Master's">Master's</option>
              </select>
              <button style={styles.button} onClick={handleSaveFypIdea}>Save Idea</button>
            </section>
            </Header>
     
      );

}

  export default ShareIdeas;
  // const styles = {
  //   header: {
  //     textAlign: 'center',
  //     margin: '20px 0',
  //   },
  //   section: {
  //     margin: '20px 0',
  //     padding: '20px',
  //     border: '1px solid #ddd',
  //     borderRadius: '8px',
  //     backgroundColor: '#f9f9f9',
  //   },
  //   sectionHeader: {
  //     marginBottom: '10px',
  //     fontSize: '1.5em',
  //   },
  //   cardContainer: {
  //     display: 'flex',
  //     flexWrap: 'wrap',
  //     justifyContent: 'space-around',
  //     gap: '15px',
  //   },
  //   card: {
  //     backgroundColor: 'rgb(225 223 223)',
  //     padding: '20px',
  //     borderRadius: '8px',
  //     boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
  //     width: '280px',
  //     textAlign: 'center',
  //   },
  //   input: {
  //     display: 'block',
  //     width: '100%',
  //     padding: '10px',
  //     margin: '10px 0',
  //     border: '1px solid #ddd',
  //     borderRadius: '4px',
  //   },
  //   textarea: {
  //     display: 'block',
  //     width: '100%',
  //     padding: '10px',
  //     margin: '10px 0',
  //     border: '1px solid #ddd',
  //     borderRadius: '4px',
  //     minHeight: '100px',
  //   },
  //   button: {
  //     padding: '10px 20px',
  //     backgroundColor: '#007bff',
  //     color: '#fff',
  //     border: 'none',
  //     borderRadius: '4px',
  //     cursor: 'pointer',
  //     marginRight: '10px',
  //   },
  //   list: {
  //     listStyle: 'none',
  //     padding: 0,
  //   },
  //   listItem: {
  //     marginBottom: '10px',
  //   },
  //   label: {
  //     display: 'block',
  //     margin: '10px 0 5px',
  //   }
  // };

  
