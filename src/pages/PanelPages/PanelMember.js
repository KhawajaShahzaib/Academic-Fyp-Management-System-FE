import React, { useState, useEffect, useContext } from 'react';
import '../../components/HeaderMe.css';
// import Navbar from '../components/Navbar.js';
import Dropdown1 from "../../components/Dropdown1.js";
// import ExcelGenerator from "../components/excelGenerator.js";
import AuthContext from '../../context/AuthContext';
import Header from "../../components/Header";
import styles from '../commonCSS/fypmanagerstyles';
import axios from 'axios'; // Import axios for API requests
import Announcements from '../../components/Announcements.js';



const PanelMember = () => {

  const { user, currentRole, authTokens } = useContext(AuthContext);
const [upcomingPresentations, setUpcomingPresentations] = useState([]);

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
  
}, );

const renderPresentationTable = (presentations, title) => (
  <div style={styles.container}>
      <h2>{title}</h2>
      <table style={styles.table}>
          <thead>
              <tr style={styles.tableHeaderRow}>
              <th style={styles.tableHeader}>Assessment Title</th>
                  <th style={styles.tableHeader}>Scheduled Time</th>
                  <th style={styles.tableHeader}>Course</th>
                    <th style={styles.tableHeader}>Degree</th>
                  <th style={styles.tableHeader}>Student Group</th>
                  <th style={styles.tableHeader}>Room No</th>
                  {/* <th style={styles.tableHeader}>Panel Members</th> */}
              </tr>
          </thead>
          <tbody>
              {presentations.map((presentation, index) => (
                  <tr key={index} style={styles.tableRow}>
                    <td style={styles.tableCell}>{presentation.assessment.name}</td>
                      <td style={styles.tableCell}>
                          {new Date(presentation.scheduled_time).toLocaleString()}
                      </td>
                      <td style={styles.tableCell}>{presentation.course.course_name}</td>
                                        <td style={styles.tableCell}>{presentation.course.degree.degree_name}</td>
                      <td style={styles.tableCell}>
                          <strong>Project:</strong> {presentation.student_group.project_title}
                          <br />
                          {/* <strong>Members:</strong>
                          <ul>
                              {presentation.student_group.members.map((member, idx) => (
                                  <li key={idx}>
                                      {member.student.username} ({member.student.sap_id})
                                  </li>
                              ))}
                          </ul> */}
                      </td>
                      <td style={styles.tableCell}>{presentation.room_no}</td>
                      {/* <td style={styles.tableCell}>
                          {presentation.panel_members.map((member, idx) => (
                              <div key={idx}>{member.user.username}</div>
                          ))}
                      </td> */}
                  </tr>
              ))}
          </tbody>
      </table>
  </div>
);
  const panelsection = [
    {
      title: 'Evaluations',
      options: [
        // { name: 'Manage Expertise', link: '#'},
        { name: 'See Evaluations', link: '/evaluationSheet' },
        { name: 'Respond to availability', link: '#' }
      ],
    }
  ];

  return (
    <>
         <Header>
         <Announcements />
              <section style={styles.section}>
              <h2 style={styles.sectionHeader}>{currentRole} Dashboard</h2>

            </section>
            <section style={styles.section}>
                {upcomingPresentations.length > 0 ? (
    renderPresentationTable(upcomingPresentations, 'Upcoming Presentations')
) : (
    <p style={styles.noDataMessage}>No upcoming presentations available</p>
)}
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
