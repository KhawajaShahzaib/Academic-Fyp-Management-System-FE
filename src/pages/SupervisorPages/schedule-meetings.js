import './supervisor.css';
import styles from '../commonCSS/supervisorStyles.js';
import React, { useState, useContext, useEffect } from 'react';
import '../../components/HeaderMe.css';
import Header from "../../components/Header";
import AuthContext from '../../context/AuthContext';
import axios from 'axios';

const ScheduleMeetings = () => {
  const [groups, setGroups] = useState([]);
  const [meetingDate, setMeetingDate] = useState('');
  const [meetingTime, setMeetingTime] = useState('');
  const [selectedGroupId, setSelectedGroupId] = useState('');
  const [scheduledMeetings, setScheduledMeetings] = useState([]);
  const { authTokens } = useContext(AuthContext);  // Ensure you are getting auth tokens

  // Fetching groups
  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/fyp/groups/', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authTokens.access}`,
          },
        }); 
        const data = await response.json();
        console.log("Data fetched: ", data)
        setGroups(data);
      } catch (error) {
        console.error('Error fetching groups:', error);
      }
    };
    fetchGroups();
  }, [authTokens]);

  // Schedule meeting
  const handleScheduleMeeting = async (event) => {
    event.preventDefault();
    const groupName = groups.find(group => group.id === parseInt(selectedGroupId))?.name || 'Unknown Group';

    const newMeeting = {
      group: parseInt(selectedGroupId),
      date: meetingDate,
      time: meetingTime,
      status: 'Upcoming',
    };

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/fyp/schedule-meetings/', newMeeting, { 
        headers: { Authorization: `Bearer ${authTokens.access}` } 
      });
      setScheduledMeetings([...scheduledMeetings, response.data]);
      alert(`Meeting Scheduled Successfully`);
    } catch (error) {
      console.error('Error scheduling meeting:', error);
      alert('Error scheduling meeting. Please try again.');
    }

    // Clear inputs
    setMeetingDate('');
    setMeetingTime('');
    setSelectedGroupId('');
  };

  return (
    <Header>
      <section style={styles.section}>
        <h2 style={styles.sectionHeader}>Schedule a Meeting</h2>
        <form onSubmit={handleScheduleMeeting}>
          <label style={styles.label}>Select Group:</label>
          <select
            style={styles.input}
            value={selectedGroupId}
            onChange={(e) => setSelectedGroupId(e.target.value)}
          >
            <option value="">Select Group</option>
            {groups.map(group => (
    <option key={group.group_id} value={group.group_id}>{group.project_title}</option>
        ))}
          </select>
          <label style={styles.label}>Date:</label>
          <input
            type="date"
            style={styles.input}
            value={meetingDate}
            onChange={(e) => setMeetingDate(e.target.value)}
          />
          <label style={styles.label}>Time:</label>
          <input
            type="time"
            style={styles.input}
            value={meetingTime}
            onChange={(e) => setMeetingTime(e.target.value)}
          />
          <button type="submit" style={styles.button}>Schedule Meeting</button>
        </form>
      </section>
    </Header>
  );
};

export default ScheduleMeetings;


// import './supervisor.css';
// import styles from '../commonCSS/supervisorStyles.js'
// import React, { useState, useContext, useEffect } from 'react';
// import '../../components/HeaderMe.css'
// import Header from "../../components/Header";
// import AuthContext from '../../context/AuthContext';
// import axios from 'axios'
// const ScheduleMeetings = () => {
//   const [groups] = useState([
//     { id: 1, name: 'Group 1', students: ['Student A', 'Student B'] },
//     { id: 2, name: 'Group 2', students: ['Student C', 'Student D'] },
//     { id: 3, name: 'Group 3', students: ['Student E', 'Student F'] }
//   ]);
//     // State for Schedule Meeting
//   const [meetingDate, setMeetingDate] = useState('');
//   const [meetingTime, setMeetingTime] = useState('');
//   const [selectedGroupId, setSelectedGroupId] = useState('');
//   const [scheduledMeetings, setScheduledMeetings] = useState([
//     { id: 1, group: 'Group 1', date: '2024-09-01', time: '10:00 AM', status: 'Upcoming' },
//     { id: 2, group: 'Group 2', date: '2024-08-30', time: '11:00 AM', status: 'Past' },
//     { id: 3, group: 'Group 3', date: '2024-11-15', time: '02:00 PM', status: 'Upcoming' }, // New upcoming meeting
//     { id: 4, group: 'Group 1', date: '2024-09-10', time: '03:30 PM', status: 'Upcoming' }, // Another upcoming meeting
// ]);
// const handleScheduleMeeting = (event) => {
//   // const { authTokens } = useContext(AuthContext);
//     event.preventDefault();
//     const groupName = groups.find(group => group.id === parseInt(selectedGroupId))?.name || 'Unknown Group';
//     const newMeeting = {
//       id: scheduledMeetings.length + 1,
//       group: groupName,
//       date: meetingDate,
//       time: meetingTime,
//       status: 'Upcoming'
//     };
//     setScheduledMeetings([...scheduledMeetings, newMeeting]);
//     alert(`Meeting scheduled with ${groupName} on ${meetingDate} at ${meetingTime}`);
//     setMeetingDate('');
//     setMeetingTime('');
//     setSelectedGroupId('');
//   };
//     return (
//       <Header>
//         <section style={styles.section}>
//         <h2 style={styles.sectionHeader}>Schedule a Meeting</h2>
//         <form onSubmit={handleScheduleMeeting}>
//           <label style={styles.label}>Select Group:</label>
//           <select
//             style={styles.input}
//             value={selectedGroupId}
//             onChange={(e) => setSelectedGroupId(e.target.value)}
//           >
//             <option value="">Select Group</option>
//             {groups.map(group => (
//               <option key={group.id} value={group.id}>{group.name}</option>
//             ))}
//           </select>
//           <label style={styles.label}>Date:</label>
//           <input
//             type="date"
//             style={styles.input}
//             value={meetingDate}
//             onChange={(e) => setMeetingDate(e.target.value)}
//           />
//           <label style={styles.label}>Time:</label>
//           <input
//             type="time"
//             style={styles.input}
//             value={meetingTime}
//             onChange={(e) => setMeetingTime(e.target.value)}
//           />
//           <button type="submit" style={styles.button}>Schedule Meeting</button>
//         </form>
        
//       </section>
//       </Header>
//     );
//   };
  
//   export default ScheduleMeetings;

