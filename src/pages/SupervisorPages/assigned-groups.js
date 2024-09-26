import styles from '../commonCSS/supervisorStyles.js'
import React, { useState } from 'react';
import '../../components/HeaderMe.css'
import Header from "../../components/Header";

const AssignedGroups = () => {
    const [groups] = useState([
        { id: 1, name: 'Group 1', students: ['Student A', 'Student B'] },
        { id: 2, name: 'Group 2', students: ['Student C', 'Student D'] },
        { id: 3, name: 'Group 3', students: ['Student E', 'Student F'] }
      ]);
      
    
      
    return (
      <Header>
        <section style={styles.section}>
        <h2 style={styles.sectionHeader}>Student Groups</h2>
        <ul style={styles.list}>
          {groups.map(group => (
            <li key={group.id} style={styles.listItem}>{group.name}: {group.students.join(', ')}</li>
          ))}
        </ul>
      </section>
      </Header>
    );
  };
  
  export default AssignedGroups;

  
