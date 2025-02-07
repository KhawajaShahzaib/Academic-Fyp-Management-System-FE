import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import '../../components/HeaderMe.css';
import Dropdown1 from "../../components/Dropdown1.js";
import AuthContext from '../../context/AuthContext.js';
import Header from "../../components/Header.js";
import styles from '../commonCSS/fypmanagerstyles';
import Card from '../../components/Cards.js';
import { faUserGraduate, faUserTie, faUsers, faChalkboardTeacher, faUniversity } from '@fortawesome/free-solid-svg-icons';
import Announcements from '../../components/Announcements.js';
const DbFypSup = () => {
  const { user, currentRole, authTokens } = useContext(AuthContext);
  const currentUserRole = user.user_type; 

  //Adding the Options
  const supervisorSections = [
    {
      title: 'Supervision Setup',
      options: [
        // { name: 'Manage Specialization', link: '/manage-specialization'},
        { name: 'Check Incoming Supervision Requests', link: '/supervision-requests' }
      ],
    },
    {
      title: 'Student Groups Management',
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
  


///// PRESENTATION DATA ADDED
const [upcomingPresentations, setUpcomingPresentations] = useState([]);
    // const [courses, setCourses] = useState([]);
    // const [assessments, setAssessments] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState('');
    const [selectedAssessment, setSelectedAssessment] = useState('');

    // useEffect(() => {
    //     const fetchCourses = async () => {
    //         try {
    //             const response = await axios.get('http://127.0.0.1:8000/api/fyp/courses/', {
    //                 headers: { Authorization: `Bearer ${authTokens.access}` }
    //             });
    //             setCourses(response.data);
    //         } catch (error) {
    //             console.error("Error fetching courses:", error);
    //         }
    //     };

    //     fetchCourses();
    // }, []);



    useEffect(() => {
            const fetchPresentations = async () => {
                try {
                    const response = await axios.get(
                        `http://127.0.0.1:8000/api/fyp/view-presentations-user/`,
                        { headers: { Authorization: `Bearer ${authTokens.access}` } }
                    );

                    const currentTime = new Date(); // Get the current time
                    console.log("Received schedules: ", response.data);

                    // Split presentations into upcoming and previous
                    const upcoming = response.data.filter(presentation => new Date(presentation.scheduled_time) > currentTime);

                    setUpcomingPresentations(upcoming);
                } catch (error) {
                    console.error('Error fetching presentations:', error);
                }
            };

            fetchPresentations();
        
    }, [selectedCourse, selectedAssessment]);

    const renderPresentationTable = (presentations, title) => (
        <div style={styles.container}>
            <h2>{title}</h2>
            <table style={styles.table}>
                <thead>
                    <tr style={styles.tableHeaderRow}>
                        <th style={styles.tableHeader}>Assessment Title</th>
                        <th style={styles.tableHeader}>Scheduled Time</th>
                        <th style={styles.tableHeader}>Room No</th>
                        <th style={styles.tableHeader}>Panel Members</th>
                    </tr>
                </thead>
                <tbody>
                    {presentations.map((presentation, index) => (
                        <tr key={index} style={styles.tableRow}>
                            {/* Assessment Name */}
                            <td style={styles.tableCell}>{presentation.assessment.name}</td>
                            
                            {/* Scheduled Time */}
                            <td style={styles.tableCell}>
                                {new Date(presentation.scheduled_time).toLocaleString()}
                            </td>
                            
                            {/* Room Number */}
                            <td style={styles.tableCell}>{presentation.room_no}</td>
                            
                            {/* Panel Members */}
                            <td style={styles.tableCell}>
                                {presentation.panel_members.map((member, idx) => (
                                    <div key={idx}>{member.user.username}</div>
                                ))}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
  </div>
);

///

  return (
    <>
         <Header>
         <Announcements />
              <section style={styles.section}>
              <h2 style={styles.sectionHeader}>{currentRole} Dashboard</h2>
            </section>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>


<Card
  icon={faUsers}
  title="Your Groups"
  available={1}
  styles={styles}
/>

          </div>                
            <section style={styles.section}>
                {/* <h2 style={styles.sectionHeader}>Upcoming Presentations</h2> */}



                {upcomingPresentations.length > 0 ? (
    renderPresentationTable(upcomingPresentations, 'Upcoming Presentations')
) : (
    <p style={styles.noDataMessage}>No upcoming presentations available</p>
)}
            </section>

           
              {/* Other sections can be added here */}
              {/* <section style={styles.section}>
                
              <div className="button-container">
              <button className="right" onClick={handleToggleAvailability}> {available ? 'Set as Unavailable' : 'Set as Available'} </button>
              </div>
              </section> */}
              {/* <Dropdown1 /> */}
              <section style={styles.section}>
              <Dropdown1 title="Supervisor" sections={supervisorSections} />

              </section>
           
              </Header>
           
        </>
      );
    }

export default DbFypSup




 


