// import React, { useState, useContext } from 'react';
// import '../components/HeaderMe.css';
// // import Navbar from '../components/Navbar.js';
// import Sidebar from '../components/Sidebar.js';
// import Announcements from '../components/Announcements.js';
// import Dropdown1 from "../components/Dropdown1.js";
// import Calendar from "../components/Calendar.js";
// import SwitchRole from "../components/switchRole.js";
// // import ExcelGenerator from "../components/excelGenerator.js";
// import AuthContext from '../context/AuthContext';
// // import Header from "../components/Header";
// import Navbar from '../components/Navbar.js';

// //Supervisor Related Imports:
// // import ManageSpecialization from './SupervisorPages/manage-specialization.js';



// const DbFypSup = () => {
//   const [schedules] = useState([
//     { id: 1, group: 'Group 1', date: '2024-09-01', time: '10:00 AM', room: 'A101' },
//     { id: 2, group: 'Group 2', date: '2024-09-02', time: '11:00 AM', room: 'B202' }
//   ]);
//   const { user } = useContext(AuthContext);

//   const currentUserRole = user.user_type; 
//   //Adding the Options
//   const supervisorSections = [
//     {
//       title: 'Supervising Setup',
//       options: [
//         { name: 'Manage Specialization', link: '/manage-specialization'},
//         { name: 'Check Incoming Supervision Requests', link: '/supervision-requests' }
//       ],
//     },
//     {
//       title: 'Manage Student Groups',
//       options: [
//         { name: 'Schedule Group Meetings', link: '/schedule-meetings' },
//         { name: 'View Group Meetings', link: '/view-meetings' },
//         { name: 'View Assigned Groups', link: '/assigned-groups' }
//       ],
//     },
//     {
//       title: 'Project Ideas',
//       options: [{ name: 'Share Ideas', link: '/share-ideas' }],
//     },
//   ];
//   const [available, setAvailable] = useState(false);
//   const handleToggleAvailability = () => {
//     setAvailable(!available);
//     alert(`Availability status updated to ${!available}`);
//   };


//   return (
//     <>
//         <div className="header">
//           <Navbar/>
//           <div className="container"> 
//           <Sidebar />           
//             <main className="main-content">
//             <Announcements />
//               <section style={styles.section}>
                
//               <h2 style={styles.sectionHeader}>Hello {user.username}, View Presentation Schedule</h2>
//               <div style={styles.cardContainer}>
//                 {schedules.map(schedule => (
//                   <div key={schedule.id} style={styles.card}>
//                     <p><strong>{schedule.group}</strong></p>
//                     <p>Date: {schedule.date}</p>
//                     <p>Time: {schedule.time}</p>
//                     <p>Room: {schedule.room}</p>
//                   </div>
//                 ))}
//               </div>
//             </section>

           
//               {/* Other sections can be added here */}
//               <section style={styles.section}>
                
//               <div className="button-container">
//               <button className="right" onClick={handleToggleAvailability}> {available ? 'Set as Unavailable' : 'Set as Available'} </button>
//               </div>
//               </section>
//               {/* <Dropdown1 /> */}
//               <section style={styles.section}>
//               <Dropdown1 title="Supervisor" sections={supervisorSections} />

//               </section>
           
          
//             </main>
//             <div>
//     <SwitchRole currentUserRole={currentUserRole}/>
//     <Calendar />
   
//     </div>
//           </div>
         
//  </div>
//         </>
//       );

// }



// export default DbFypSup

import React, { useState, useContext } from 'react';
import '../../components/HeaderMe.css';
// import Navbar from '../components/Navbar.js';
import Dropdown1 from "../../components/Dropdown1.js";
// import ExcelGenerator from "../components/excelGenerator.js";
import AuthContext from '../../context/AuthContext.js';
import Header from "../../components/Header.js";
import styles from '../commonCSS/supervisorStyles.js'




const DbFypSup = () => {
  const [schedules] = useState([
    { id: 1, group: 'Group 1', date: '2024-09-01', time: '10:00 AM', room: 'A101' },
    { id: 2, group: 'Group 2', date: '2024-09-02', time: '11:00 AM', room: 'B202' }
  ]);
  const { user } = useContext(AuthContext);

  const currentUserRole = user.user_type; 
  //Adding the Options
  const supervisorSections = [
    {
      title: 'Supervising Setup',
      options: [
        { name: 'Manage Specialization', link: '/manage-specialization'},
        { name: 'Check Incoming Supervision Requests', link: '/supervision-requests' }
      ],
    },
    {
      title: 'Manage Student Groups',
      options: [
        { name: 'Schedule Group Meetings', link: '/schedule-meetings' },
        { name: 'View Group Meetings', link: '/view-meetings' },
        { name: 'View Assigned Groups', link: '/assigned-groups' }
      ],
    },
    {
      title: 'Project Ideas',
      options: [{ name: 'Share Ideas', link: '/share-ideas' }],
    },
  ];
  const [available, setAvailable] = useState(false);
  const handleToggleAvailability = () => {
    setAvailable(!available);
    alert(`Availability status updated to ${!available}`);
  };


  return (
    <>
         <Header>
              <section style={styles.section}>
                
              <h2 style={styles.sectionHeader}>Hello {user.username}, View Presentation Schedule</h2>
              <div style={styles.cardContainer}>
                {schedules.map(schedule => (
                  <div key={schedule.id} style={styles.card}>
                    <p><strong>{schedule.group}</strong></p>
                    <p>Date: {schedule.date}</p>
                    <p>Time: {schedule.time}</p>
                    <p>Room: {schedule.room}</p>
                  </div>
                ))}
              </div>
            </section>

           
              {/* Other sections can be added here */}
              <section style={styles.section}>
                
              <div className="button-container">
              <button className="right" onClick={handleToggleAvailability}> {available ? 'Set as Unavailable' : 'Set as Available'} </button>
              </div>
              </section>
              {/* <Dropdown1 /> */}
              <section style={styles.section}>
              <Dropdown1 title="Supervisor" sections={supervisorSections} />

              </section>
           
              </Header>
           
        </>
      );

}


export default DbFypSup
