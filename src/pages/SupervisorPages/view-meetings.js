import styles from '../commonCSS/supervisorStyles.js'
import React, { useState, useContext,  useEffect} from 'react';
import '../../components/HeaderMe.css'
import Header from "../../components/Header";
import AuthContext from '../../context/AuthContext';

import axios from 'axios';

const GroupMeetings = () => {
  const [scheduledMeetings, setScheduledMeetings] = useState([]);
  const { authTokens } = useContext(AuthContext);  // Ensure you are getting auth tokens

  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/fyp/schedule-meetings/', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authTokens.access}`,
          },
        });
        
        // Log response data to verify the structure
        console.log("Fetched Meetings:", response.data);
  
        // Set the fetched meetings data
        setScheduledMeetings(response.data);
      } catch (error) {
        console.error("Error fetching meetings:", error);
      }
    };
    fetchMeetings();
  }, [authTokens]);

  // Split meetings into past and upcoming
  const pastMeetings = scheduledMeetings.filter(meeting => new Date(meeting.date) < new Date());
  const upcomingMeetings = scheduledMeetings.filter(meeting => new Date(meeting.date) >= new Date());

  return (
    <Header>
      <section style={styles.section}>
        <h2 style={styles.sectionHeader}>Upcoming Meetings</h2>
        <div style={styles.cardContainer}>
          {upcomingMeetings.map(meeting => (
            <div key={meeting.id} style={styles.card}>
              <p><strong>{meeting.group.project_title}</strong></p> {/* Adjust according to your serializer */}
              <p>Date: {meeting.date}</p>
              <p>Time: {meeting.time}</p>
              <p>Status: {meeting.status}</p> {/* Include status if available */}
            </div>
          ))}
        </div>
      </section>

      <section style={styles.section}>
        <h2 style={styles.sectionHeader}>Past Meetings</h2>
        <div style={styles.cardContainer}>
          {pastMeetings.map(meeting => (
            <div key={meeting.id} style={styles.card}>
              <p><strong>{meeting.group.project_title}</strong></p> {/* Adjust according to your serializer */}
              <p>Date: {meeting.date}</p>
              <p>Time: {meeting.time}</p>
              <p>Status: {meeting.status}</p> {/* Include status if available */}
            </div>
          ))}
        </div>
      </section>
    </Header>
  );
};

export default GroupMeetings;


  







//Original frontEnd Working no backend
// const GroupMeetings = () => {
   
//     const [scheduledMeetings, setScheduledMeetings] = useState([
//       { id: 1, group: 'Group 1', date: '2024-09-01', time: '10:00 AM', status: 'Upcoming' },
//       { id: 2, group: 'Group 2', date: '2024-08-30', time: '11:00 AM', status: 'Past' },
//       { id: 3, group: 'Group 3', date: '2024-11-15', time: '02:00 PM', status: 'Upcoming' }, // New upcoming meeting
//       { id: 4, group: 'Group 1', date: '2024-09-10', time: '03:30 PM', status: 'Upcoming' }, // Another upcoming meeting
//   ]);
  
//      // Split meetings into past and upcoming
//   const pastMeetings = scheduledMeetings.filter(meeting => new Date(meeting.date) < new Date());
//   const upcomingMeetings = scheduledMeetings.filter(meeting => new Date(meeting.date) >= new Date());
//     return (
//       <Header>
//         <section style={styles.section}>
//               <h2 style={styles.sectionHeader}>Upcoming Meetings</h2>
//               <div style={styles.cardContainer}>
//                 {upcomingMeetings.map(meeting => (
//                   <div key={meeting.id} style={styles.card}>
//                     <p><strong>{meeting.group}</strong></p>
//                     <p>Date: {meeting.date}</p>
//                     <p>Time: {meeting.time}</p>
//                   </div>
//                 ))}
//               </div>
//             </section>

//             <section style={styles.section}>
//               <h2 style={styles.sectionHeader}>Past Meetings</h2>
//               <div style={styles.cardContainer}>
//                 {pastMeetings.map(meeting => (
//                   <div key={meeting.id} style={styles.card}>
//                     <p><strong>{meeting.group}</strong></p>
//                     <p>Date: {meeting.date}</p>
//                     <p>Time: {meeting.time}</p>
//                   </div>
//                 ))}
//               </div>
//             </section>   
//             </Header>
//     );
//   };
  
//   export default GroupMeetings;

  
