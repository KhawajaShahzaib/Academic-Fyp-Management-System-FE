import React, { useEffect, useState, useContext } from 'react';
import Header from '../../components/Header';
import axios from 'axios';
import AuthContext from '../../context/AuthContext';

const ViewGroupInvitation = ({ setMembers, acceptInvitation, rejectInvitation }) => {
  const [groups, setGroups] = useState([]);
  const { authTokens } = useContext(AuthContext); // Get authTokens from context

  useEffect(() => {
    const fetchInvitations = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/fyp/group-invitations/', {
          headers: { Authorization: `Bearer ${authTokens.access}` }
        });
        setGroups(response.data);
        console.log("Data received: ", response.data)
      } catch (error) {
        console.error("Error fetching group invitations:", error);
      }
    };
    fetchInvitations();
  }, []);
  
  const acceptInvitationHandler = async (groupId) => {
    try {
      await axios.post(`http://127.0.0.1:8000/api/fyp/accept-invitation/${groupId}/`, {}, {
        headers: { Authorization: `Bearer ${authTokens.access}` }
      });
      acceptInvitation(groupId); // Update state on frontend
    } catch (error) {
      console.error("Error accepting invitation:", error);
    }
  };
  
  const rejectInvitationHandler = async (groupId) => {
    try {
      await axios.post(`http://127.0.0.1:8000/api/fyp/reject-invitation/${groupId}/`, {}, {
        headers: { Authorization: `Bearer ${authTokens.access}` }
      });
      rejectInvitation(groupId); // Update state on frontend
    } catch (error) {
      console.error("Error rejecting invitation:", error);
    }
  };

  return (
    <Header>
      <div className="view-group-invitation">
        <h2>Group Invitations</h2>

        {groups.length === 0 ? (
          <p>No group invitations available.</p>
        ) : (
          <div>
            <h3>Invitations:</h3>
            <ul>
              {groups.map((group, index) => (
                <li key={index}>
                  <div>
                    <strong>SAP ID:</strong> {group.sapId}
                  </div>
                  <div>
                    <strong>Project Title:</strong> {group.projectTitle}
                  </div>
                 
                  <button onClick={() => acceptInvitationHandler(group.groupId)}>Accept</button>
                  <button onClick={() => rejectInvitationHandler(group.groupId)}>Reject</button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </Header>
  );
};

export default ViewGroupInvitation;
