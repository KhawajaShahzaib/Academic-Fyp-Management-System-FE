import React, { useState, useContext } from 'react';
import '../../components/HeaderMe.css';
// import Navbar from '../components/Navbar.js';
import Dropdown1 from "../../components/Dropdown1.js";
// import ExcelGenerator from "../components/excelGenerator.js";
import AuthContext from '../../context/AuthContext';
import Header from "../../components/Header";
import styles from '../commonCSS/supervisorStyles.js'




const DirectorDashboard = () => {

  const { user } = useContext(AuthContext);

  const currentUserRole = user.user_type; 

  const directorSections = [
    {
      title: 'Project',
      options: [
        { name: 'View All Projects', link: '/manage-specialization'},
        { name: 'View all Current FYP Ongoing Tasks', link: '/supervision-requests' }
      ],
    },
    {
      title: 'Manage Student Groups',
      options: [
        { name: 'View all Supervisors', link: '/schedule-meetings' },
        { name: 'View Group Meetings', link: '/view-meetings' },
        { name: 'View Assigned Groups', link: '/assigned-groups' }
      ],
    },
    {
      title: 'Project Ideas',
      options: [{ name: 'Share Ideas', link: '/share-ideas' }],
    },
  ];
  return (
    <>
         <Header>
              <section style={styles.section}>
                
            </section>

           
              {/* Other sections can be added here */}
              {/* <Dropdown1 /> */}
              <section style={styles.section}>
              <Dropdown1 title="Director" sections={directorSections} />

              </section>
           
              </Header>
           
        </>
      );

}


export default DirectorDashboard
