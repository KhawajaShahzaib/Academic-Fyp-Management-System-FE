import React, { useState, useContext } from 'react';
import '../../components/HeaderMe.css';
// import Navbar from '../components/Navbar.js';
import Dropdown1 from "../../components/Dropdown1.js";
// import ExcelGenerator from "../components/excelGenerator.js";
import AuthContext from '../../context/AuthContext';
import Header from "../../components/Header";
import styles from '../commonCSS/supervisorStyles.js'




const PanelMember = () => {

  const { user } = useContext(AuthContext);

  const currentUserRole = user.user_type; 

  const panelsection = [
    {
      title: 'Evaluations',
      options: [
        { name: 'Manage Expertise', link: '#'},
        { name: 'See Evaluations', link: '#' },
        { name: 'Respond to availability', link: '#' }
      ],
    }
  ];
  return (
    <>
         <Header>
              <section style={styles.section}>
                
            </section>

           
              {/* Other sections can be added here */}
              {/* <Dropdown1 /> */}
              <section style={styles.section}>
              <Dropdown1 title="Panel-Member" sections={panelsection} />

              </section>
           
              </Header>
           
        </>
      );

}


export default PanelMember
