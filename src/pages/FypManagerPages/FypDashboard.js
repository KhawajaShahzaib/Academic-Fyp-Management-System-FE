import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header'
import AuthContext from '../../context/AuthContext';
import styles from '../commonCSS/supervisorStyles.js'
import Dropdown1 from "../../components/Dropdown1.js";


// import ExcelGenerator from "../components/excelGenerator.js";
const DbFypInch = () => {

  const { user } = useContext(AuthContext);

 

  const fypsection = [
    {
      title: 'Batches',
      options: [
        { name: 'Spring 2021', link: '#'},
        { name: 'Spring 2021', link: '#' },
        { name: 'Spring 2021', link: '#' }
      ],
    },
    {
      title: 'Schedule',
      options: [
        { name: 'TimeTable', link: '#'},
        { name: 'Panel', link: '#' }
        
      ],
    },
    {
      title: 'Manage Task',
      options: [
        { name: 'Create Submission', link: '#'},
        { name: 'Manage Submission', link: '#' }
      ],
    },
  ];
  return (
    <>
         <Header>
         <h1>Hello {user.username} Student Dashboard</h1>
              <section style={styles.section}>
                
            </section>

           
              {/* Other sections can be added here */}
              {/* <Dropdown1 /> */}
              <section style={styles.section}>
              <Dropdown1 title="Fyp-Incharge" sections={fypsection} />

              </section>
           
              </Header>
           
        </>
      );

}

export default DbFypInch

