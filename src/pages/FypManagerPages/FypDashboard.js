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
      title: 'Assessment Management',
      options: [
        { name: 'Manage External Assessment', link: '/external-assessmentpage' },
        { name: 'Create Internal Assessment', link: '/create-assessmentpage'},

        { name: 'Upload Timetable for suggestions..', link: '/TimetableUploadPage' }
      ],
    },
    {
      title: 'Schedule',
      options: [
        { name: 'View Project List', link: '/batch-page'},
        { name: 'Schedule Presentation', link: '/schedule-presentation'},
        { name: 'Manage Presentation', link: '/manage-presentations'},
        { name: 'Manage Assessments', link: '/manage-assessmentpage'},
        { name: 'Panel', link: '/invite-panelmember' },
        { name: 'Manage Panel', link: '/manage-panelmember' }
        
      ],
    },
    {
      title: 'Manage Task',
      options: [
        { name: 'Create Submission', link: '/create-submission'},
        { name: 'Manage Submission', link: '/manage-submission' }
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

