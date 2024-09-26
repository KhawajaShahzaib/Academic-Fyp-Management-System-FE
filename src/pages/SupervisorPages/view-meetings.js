import styles from '../commonCSS/supervisorStyles.js'
import React, { useState } from 'react';
import '../../components/HeaderMe.css'

const GroupMeetings = () => {
    const [meetingDate, setMeetingDate] = useState('');
    const [meetingTime, setMeetingTime] = useState('');
    const [selectedGroupId, setSelectedGroupId] = useState('');
    const [scheduledMeetings, setScheduledMeetings] = useState([
      { id: 1, group: 'Group 1', date: '2024-09-01', time: '10:00 AM', status: 'Upcoming' },
      { id: 2, group: 'Group 2', date: '2024-08-30', time: '11:00 AM', status: 'Past' },
      { id: 3, group: 'Group 3', date: '2024-11-15', time: '02:00 PM', status: 'Upcoming' }, // New upcoming meeting
      { id: 4, group: 'Group 1', date: '2024-09-10', time: '03:30 PM', status: 'Upcoming' }, // Another upcoming meeting
  ]);
  
     // Split meetings into past and upcoming
  const pastMeetings = scheduledMeetings.filter(meeting => new Date(meeting.date) < new Date());
  const upcomingMeetings = scheduledMeetings.filter(meeting => new Date(meeting.date) >= new Date());
    return (
        <main className="main-content">
        <section style={styles.section}>
              <h2 style={styles.sectionHeader}>Upcoming Meetings</h2>
              <div style={styles.cardContainer}>
                {upcomingMeetings.map(meeting => (
                  <div key={meeting.id} style={styles.card}>
                    <p><strong>{meeting.group}</strong></p>
                    <p>Date: {meeting.date}</p>
                    <p>Time: {meeting.time}</p>
                  </div>
                ))}
              </div>
            </section>

            <section style={styles.section}>
              <h2 style={styles.sectionHeader}>Past Meetings</h2>
              <div style={styles.cardContainer}>
                {pastMeetings.map(meeting => (
                  <div key={meeting.id} style={styles.card}>
                    <p><strong>{meeting.group}</strong></p>
                    <p>Date: {meeting.date}</p>
                    <p>Time: {meeting.time}</p>
                  </div>
                ))}
              </div>
            </section>
            </main>
    );
  };
  
  export default GroupMeetings;

  
