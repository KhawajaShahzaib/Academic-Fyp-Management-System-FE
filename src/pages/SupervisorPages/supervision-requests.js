import styles from '../commonCSS/supervisorStyles.js'
import React, { useState } from 'react';
import '../../components/HeaderMe.css'

// import ExcelGenerator from "../components/excelGenerator.js";
import Header from "../../components/Header";

const SupervisionRequests = () => {
    const [requests, setRequests] = useState([
        { 
          id: 1, 
          groupName: 'Group 1', 
          requestMessage: 'Request to become your supervised group',
          description: 'We are a group of enthusiastic students looking to work on cutting-edge AI projects. Our group includes members with expertise in various domains including AI, blockchain, and cybersecurity. We are eager to work under your guidance and believe that your expertise aligns well with our project goals.',
          members: [
            { name: 'Alice', projectTitle: 'AI in Healthcare', domain: 'Artificial Intelligence', degree: 'Master\'s' },
            { name: 'Bob', projectTitle: 'Blockchain Security', domain: 'Blockchain', degree: 'Bachelor\'s' }
          ]
        },
        { 
          id: 2, 
          groupName: 'Group 2', 
          requestMessage: 'Request to discuss FYP ideas',
          description: 'Our team is working on a cybersecurity project focusing on the latest threat detection techniques. We believe that your guidance would be invaluable in helping us achieve our project objectives and ensure its success. We look forward to discussing our ideas with you.',
          members: [
            { name: 'Charlie', projectTitle: 'Cybersecurity Threats', domain: 'Cybersecurity', degree: 'Master\'s' },
            { name: 'Diana', projectTitle: 'Web App Security', domain: 'Web Development', degree: 'Bachelor\'s' }
          ]
        }
      ]);

    const handleRequestAction = (requestId, action) => {
        // Logic for accepting or rejecting requests
        if (action === 'accept') {
          alert(`Request ${requestId} accepted.`);
        } else {
          alert(`Request ${requestId} rejected.`);
        }
        setRequests(requests.filter(request => request.id !== requestId));
      };
    return (
      <Header>
        <section style={styles.section}>
              <h2 style={styles.sectionHeader}>Incoming Requests</h2>
              {requests.length === 0 ? (
                <p>No new requests.</p>
              ) : (
                <ul style={styles.list}>
                  {requests.map(request => (
                    <li key={request.id} style={styles.listItem}>
                      <h4>{request.groupName}</h4>
                      <p>{request.requestMessage}</p>
                      <p>{request.description}</p>
                      <h5>Group Members:</h5>
                      <ul style={styles.list}>
                        {request.members.map(member => (
                          <li key={member.name} style={styles.listItem}>
                            {member.name} - {member.projectTitle} (Degree: {member.degree})
                          </li>
                        ))}
                      </ul>
                      <button style={styles.button} onClick={() => handleRequestAction(request.id, 'accept')}>Accept</button>
                      <button style={styles.button} onClick={() => handleRequestAction(request.id, 'reject')}>Reject</button>
                    </li>
                  ))}
                </ul>
              )}
            </section>
            </Header>
    );
  };
  
  export default SupervisionRequests
  