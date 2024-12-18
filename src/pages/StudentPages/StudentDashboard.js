// src/components/StudentDash.js
import React, { useContext } from 'react';
import Header from '../../components/Header';
import Dropdown1 from '../../components/Dropdown1';
import AuthContext from '../../context/AuthContext';
import styles from '../commonCSS/supervisorStyles.js';

const StudentDash = () => {
  const { user } = useContext(AuthContext);

  const studentSections = [
    {
      title: 'Project Management',
      options: [
        { name: 'View Submissions', link: '/project-submissions' },
        
        { name: 'Add Group Member', link: '/add-group-member' },
        { name: 'Create Group', link: '/create-group' },
      ],
    },
    {
      title: 'Group Invitation',
      options: [
        { name: 'View Group Invitation', link: '/view-group-invitation' },
      
      ],
    },
    {
      title: 'Project Ideas',
      options: [
        { name: 'View Project Ideas', link: '/project-ideas' },
      
      ],
    },
    {
      title: 'Meetings',
      options: [
        { name: 'Group Meeting', link: '/schedule-supervisor-meeting' },
        { name: 'View Presentation Schedule', link: '/presentation-schedule' },
      
      ],
    },
    {
      title: 'Supervisor Request',
      options: [
        { name: 'Supervisor Request', link: '/request-supervisor' },
      ],
    },
  ];

  return (
    <Header>
      <section style={styles.section}>
        <h1 style={styles.sectionHeader}>Hello {user.username}, Student Dashboard</h1>
        <section style={styles.section}>
          <Dropdown1 title="Student Options" sections={studentSections} />
        </section>
      </section>
    </Header>
  );
};

export default StudentDash;
