import React, { useState, useEffect, useContext } from 'react';
import '../../components/HeaderMe.css';
import Header from "../../components/Header";
import AuthContext from '../../context/AuthContext';
import styles from '../commonCSS/supervisorStyles.js';

const ScheduleSupervisorMeeting = () => {
  const [meetings, setMeetings] = useState([]);
  const { authTokens } = useContext(AuthContext);

  // Fetching scheduled meetings
  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/fyp/schedule-meetings/', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authTokens.access}`,
          },
        });
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        console.log("Meetings fetched: ", data);
        setMeetings(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error fetching meetings:', error);
        setMeetings([]);
      }
    };

    fetchMeetings();
  }, [authTokens]);

  return (
    <Header>
      <section style={styles.section}>
        <h2 style={styles.sectionHeader}>Scheduled Meetings</h2>
        {Array.isArray(meetings) && meetings.length === 0 ? (
          <p style={styles.infoText}>No meetings scheduled yet.</p>
        ) : Array.isArray(meetings) ? (
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.tableHeader}>Group Name</th>
                <th style={styles.tableHeader}>Date</th>
                <th style={styles.tableHeader}>Time</th>
                <th style={styles.tableHeader}>Status</th>
              </tr>
            </thead>
            <tbody>
              {meetings.map(meeting => (
                <tr key={meeting.id}>
                  <td style={styles.tableCell}>{meeting.group_name}</td>
                  <td style={styles.tableCell}>{meeting.date}</td>
                  <td style={styles.tableCell}>{meeting.time}</td>
                  <td style={styles.tableCell}>{meeting.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Error: Unable to display meetings.</p>
        )}
      </section>
    </Header>
  );
};

export default ScheduleSupervisorMeeting;
