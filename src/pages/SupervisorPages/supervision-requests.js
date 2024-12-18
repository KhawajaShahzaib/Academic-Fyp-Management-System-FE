import styles from '../commonCSS/supervisorStyles.js'
// import React, { useState } from 'react';
import '../../components/HeaderMe.css'
import React, { useState, useContext, useEffect } from 'react';
// import ExcelGenerator from "../components/excelGenerator.js";
import Header from "../../components/Header";
import AuthContext from '../../context/AuthContext';
//Backend Integrated
import axios from 'axios';
const SupervisionRequests = () => {
  const [requests, setRequests] = useState([]);
  const { authTokens } = useContext(AuthContext);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/fyp/supervision-requests/', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authTokens.access}`,
          },
        }); 
        console.log('Fetched Data', response.data);
        setRequests(response.data);
      } catch (error) {
        console.error('Error fetching requests:', error);
      }
    };

    fetchRequests();
  }, [authTokens]);

  const handleRequestAction = async (requestId, action) => {
    try {
      const response = await axios.patch(`http://127.0.0.1:8000/api/fyp/supervision-requests/${requestId}/`, {
        action: action,
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authTokens.access}`,
        },
      });

      alert(`Request ${requestId} ${action === 'accept' ? 'accepted' : 'rejected'}.`);
      setRequests(requests.filter(request => request.id !== requestId));
    } catch (error) {
      console.error('Error updating request:', error);
      alert('Failed to update the request.');
    }
  };

  return (
    <Header>
      <section style={styles.section}>
        <h2 style={{ ...styles.sectionHeader, fontSize: '2rem', fontWeight: 'bold' }}>Incoming Requests</h2>
        {requests.length === 0 ? (
          <p style={{ fontSize: '1.2rem' }}>No new requests.</p>
        ) : (
          <ul style={styles.list}>
            {requests.map(request => (
              <li key={request.id} style={styles.listItem}>
                <h4 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Project Title: {request.group.project_title}</h4>
                <p style={{ fontSize: '1.2rem'}}><strong>Description:</strong> {request.description}</p>
                <h5 style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Group Members:</h5>
                <ul style={styles.list}>
                  {request.group_members.map(member => (
                    <li key={member.student.group} style={styles.listItem}>
                      <span style={{ fontSize: '1.2rem' }}>Member Name: {member.student.username}</span>
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


export default SupervisionRequests;

// const SupervisionRequests = () => {
//     const [requests, setRequests] = useState([]);
//     const { authTokens } = useContext(AuthContext);

//     useEffect(() => {
//         const fetchRequests = async () => {
//             try {
//                 const response = await fetch(`http://127.0.0.1:8000/api/fyp/get-supervision-requests/`, {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json',
//                         'Authorization': `Bearer ${authTokens.access}`
//                     },
//                 });

//                 const data = await response.json();
//                 console.log('Fetched data:', data);  // Log the data
//                 setRequests(data);  // Assuming the response is an array of requests
//             } catch (error) {
//                 console.error('Error fetching supervision requests:', error);
//             }
//         };

//         fetchRequests();
//     }, []);

//     const handleRequestAction = async (requestId, action) => {
//         try {
//             const response = await fetch(`http://127.0.0.1:8000/api/fyp/respond-to-supervision-request/${requestId}/`, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': `Bearer ${authTokens.access}`
//                 },
//                 body: JSON.stringify({ action }),
//             });
//             const data = await response.json();
//             if (response.ok) {
//                 alert(data.message);
//                 setRequests(requests.filter(request => request.id !== requestId)); // Remove the accepted/rejected request from the state
//             } else {
//                 alert(data.message);
//             }
//         } catch (error) {
//             console.error('Error responding to request:', error);
//             alert('An error occurred while responding to the request.');
//         }
//     };

//     return (
//         <Header>
//             <section style={styles.section}>
//                 <h2 style={styles.sectionHeader}>Incoming Requests</h2>
//                 {requests.length === 0 ? (
//                     <p>No new requests.</p>
//                 ) : (
//                     <ul style={styles.list}>
//                       {/* <h1 {request.id} > Hello bruh</h1> */}
                      
//                         {requests.map(request => (
//                             <li key={request.id} style={styles.listItem}>
//                                 <h4>{request.group ? request.group.project_title : 'No Title'}</h4>
//                                 <p>{request.request_message}</p>
//                                 <p>{request.description}</p>

//                                 <h1> {request.id}  Hello bruh</h1>
                                
//                                 <h5>Group Members:</h5>
//                                 <ul style={styles.list}>
//                                     {request.group && request.group.members ? (
//                                         request.group.members.map(member => (
//                                             <li key={member.student.id} style={styles.listItem}>
//                                                 {member.student.user.username} - (Degree: {member.student.degree})
//                                             </li>
//                                         ))
//                                     ) : (
//                                         <li>No members available.</li>
//                                     )}
//                                 </ul>
//                                 <button style={styles.button} onClick={() => handleRequestAction(request.id, 'accept')}>Accept</button>
//                                 <button style={styles.button} onClick={() => handleRequestAction(request.id, 'reject')}>Reject</button>
//                             </li>
//                         ))}
//                     </ul>
//                 )}
//             </section>
//         </Header>
//     );
// };

// export default SupervisionRequests;




//Original Only FrontEnd No backend.
// const SupervisionRequests = () => {
//     const [requests, setRequests] = useState([
//         { 
//           id: 1, 
//           groupName: 'Group 1', 
//           requestMessage: 'Request to become your supervised group',
//           description: 'We are a group of enthusiastic students looking to work on cutting-edge AI projects. Our group includes members with expertise in various domains including AI, blockchain, and cybersecurity. We are eager to work under your guidance and believe that your expertise aligns well with our project goals.',
//           members: [
//             { name: 'Alice', projectTitle: 'AI in Healthcare', domain: 'Artificial Intelligence', degree: 'Master\'s' },
//             { name: 'Bob', projectTitle: 'Blockchain Security', domain: 'Blockchain', degree: 'Bachelor\'s' }
//           ]
//         },
//         { 
//           id: 2, 
//           groupName: 'Group 2', 
//           requestMessage: 'Request to discuss FYP ideas',
//           description: 'Our team is working on a cybersecurity project focusing on the latest threat detection techniques. We believe that your guidance would be invaluable in helping us achieve our project objectives and ensure its success. We look forward to discussing our ideas with you.',
//           members: [
//             { name: 'Charlie', projectTitle: 'Cybersecurity Threats', domain: 'Cybersecurity', degree: 'Master\'s' },
//             { name: 'Diana', projectTitle: 'Web App Security', domain: 'Web Development', degree: 'Bachelor\'s' }
//           ]
//         }
//       ]);

//     const handleRequestAction = (requestId, action) => {
//         // Logic for accepting or rejecting requests
//         if (action === 'accept') {
//           alert(`Request ${requestId} accepted.`);
//         } else {
//           alert(`Request ${requestId} rejected.`);
//         }
//         setRequests(requests.filter(request => request.id !== requestId));
//       };
//     return (
//       <Header>
//         <section style={styles.section}>
//               <h2 style={styles.sectionHeader}>Incoming Requests</h2>
//               {requests.length === 0 ? (
//                 <p>No new requests.</p>
//               ) : (
//                 <ul style={styles.list}>
//                   {requests.map(request => (
//                     <li key={request.id} style={styles.listItem}>
//                       <h4>{request.groupName}</h4>
//                       <p>{request.requestMessage}</p>
//                       <p>{request.description}</p>
//                       <h5>Group Members:</h5>
//                       <ul style={styles.list}>
//                         {request.members.map(member => (
//                           <li key={member.name} style={styles.listItem}>
//                             {member.name} - {member.projectTitle} (Degree: {member.degree})
//                           </li>
//                         ))}
//                       </ul>
//                       <button style={styles.button} onClick={() => handleRequestAction(request.id, 'accept')}>Accept</button>
//                       <button style={styles.button} onClick={() => handleRequestAction(request.id, 'reject')}>Reject</button>
//                     </li>
//                   ))}
//                 </ul>
//               )}
//             </section>
//             </Header>
//     );
//   };
  
//   export default SupervisionRequests
  