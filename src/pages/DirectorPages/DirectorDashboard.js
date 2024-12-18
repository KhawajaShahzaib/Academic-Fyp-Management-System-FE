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
      title: 'FYP Creation Management',
      options: [
        { name: 'Appoint FYP Manager', link: '/AssignFypManager'},
        // { name: 'View all Current FYP Ongoing Tasks', link: '#' }
      ],
    },
    {
      title: 'Ongoing FYP Courses',
      options: [
        { name: 'View Progress', link: '/view-progress' },
        { name: 'View Assessments', link: '#' }
      ],
    },

    {
      title: "Results",
      options: [
        {name: "View Previous Result", link: '/view-result'}
      ]
    }
  
  ];
  return (
    <>
         <Header>
         <section style={styles.section}>
        <h1>Director Dashboard</h1>
        <div className="summary">
          <div className="card">
            <h2>Total Supervisors</h2>
            <p>Available: <span>10</span></p>
            <p>Occupied: <span>5</span></p>
          </div>
        </div>
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
