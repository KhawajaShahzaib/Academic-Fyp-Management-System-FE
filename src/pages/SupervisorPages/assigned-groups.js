import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../../context/AuthContext';
import Header from '../../components/Header';
// import styles from '../commonCSS/supervisorStyles.js';
import styles from '../commonCSS/fypmanagerstyles.js';
// import '../../components/HeaderMe.css';

const AssignedGroups = () => {
  const [groups, setGroups] = useState([]);
  const { authTokens } = useContext(AuthContext);  // Ensure you are getting auth tokens

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/fyp/groups/', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authTokens.access}`,
          },
        });
        setGroups(response.data);
        console.log("Fetched Groups:", response.data);
      } catch (error) {
        console.error("Error fetching groups:", error);
      }
    };
    fetchGroups();
  }, [authTokens]);

  return (
    <Header>
      <section style={styles.section}>
        <h2 style={styles.sectionHeader}>Student Groups</h2>
        <div className="table-container">
          <table style={styles.table}>
            <thead>
              <tr style={styles.tableHeaderRow}>
                <th style={styles.tableHeader}>Project Title</th>
                <th style={styles.tableHeader}>Group ID</th>
                <th style={styles.tableHeader}>Members</th>
                <th style={styles.tableHeader}>Supervisor</th>
              </tr>
            </thead>
            <tbody>
              {groups.map((group, index) => (
                <tr key={group.group_id} style={styles.tableRow}>
                  <td style={styles.tableCell}>{group.project_title}</td>
                  <td style={styles.tableCell}>{group.group_id}</td>
                  <td style={styles.tableCell}>
                    {group.members.map(member => (
                      <div key={member.student.sap_id}>
                        {member.student.username} (SAP ID: {member.student.sap_id})
                      </div>
                    ))}
                  </td>
                  <td style={styles.tableCell}>{group.supervisor.username}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </Header>
  );
};

export default AssignedGroups;



// import styles from '../commonCSS/supervisorStyles.js'
// import '../../components/HeaderMe.css'
// import Header from "../../components/Header";
// import React, { useState, useEffect, useContext } from 'react';
// import AuthContext from '../../context/AuthContext';
// import axios from 'axios';



// const AssignedGroups = () => {
//   const [groups, setGroups] = useState([]);
//   const { authTokens } = useContext(AuthContext);  // Ensure you are getting auth tokens

//   useEffect(() => {
//     const fetchGroups = async () => {
//       try {
//         const response = await axios.get('http://127.0.0.1:8000/api/fyp/groups/', {
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${authTokens.access}`,
//           },
//         });
//         setGroups(response.data);
//         console.log("Fetched Groups:", response.data);
//       } catch (error) {
//         console.error("Error fetching groups:", error);
//       }
//     };
//     fetchGroups();
//   }, [authTokens]);

//   return (
//     <Header>
//       <section style={styles.section}>
//         <h2 style={styles.sectionHeader}>Student Groups</h2>
//         <ul style={styles.list}>
//           {groups.map(group => (
//             <li key={group.group_id} style={{ 
//               ...styles.listItem, 
//               justifyContent: 'space-between', 
//               alignItems: 'center', 
//               border: '1px solid #ddd',  // Add border for separation
//               padding: '10px',            // Add padding for spacing
//               marginBottom: '10px',       // Spacing between items
//               borderRadius: '5px'         // Rounded corners
//             }}>
//               <strong style={{ fontSize: '18px', flex: 1, textAlign: 'left' }}>
//                 Project Title: {group.project_title}
//               </strong>
//               <strong style={{ fontSize: '18px', textAlign: 'left', marginLeft: '20px' }}>
//                 Members: {group.members.length}
//               </strong>
//             </li>
//           ))}
//         </ul>
//       </section>
//     </Header>
//   );
// };

// export default AssignedGroups;


//Original no backend
// const AssignedGroups = () => {
//     const [groups] = useState([
//         { id: 1, name: 'Group 1', students: ['Student A', 'Student B'] },
//         { id: 2, name: 'Group 2', students: ['Student C', 'Student D'] },
//         { id: 3, name: 'Group 3', students: ['Student E', 'Student F'] }
//       ]);
      
    
      
//     return (
//       <Header>
//         <section style={styles.section}>
//         <h2 style={styles.sectionHeader}>Student Groups</h2>
//         <ul style={styles.list}>
//           {groups.map(group => (
//             <li key={group.id} style={styles.listItem}>{group.name}: {group.students.join(', ')}</li>
//           ))}
//         </ul>
//       </section>
//       </Header>
//     );
//   };
  
//   export default AssignedGroups;

  
