import React from 'react';
import Header from '../../components/Header';

const ViewGroupInvitation = ({ groups = [], setMembers, acceptInvitation, rejectInvitation }) => {
  const [acceptedGroups, setAcceptedGroups] = React.useState([]);

  const acceptInvitationHandler = (group) => {
    console.log('Invitation Accepted:', group);
    setAcceptedGroups((prevAcceptedGroups) => [...prevAcceptedGroups, group]);
    setMembers((prevMembers) => [...prevMembers, group]);
    acceptInvitation(group);
  };

  const rejectInvitationHandler = (group) => {
    console.log('Invitation Rejected:', group);
    rejectInvitation(group);
  };

  return (
    <Header>
      <div className="view-group-invitation">
        <h2>Group Invitations</h2>

        {/* Only show when there are no group invitations */}
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
                 
                  <button onClick={() => acceptInvitationHandler(group)}>Accept</button>
                  <button onClick={() => rejectInvitationHandler(group)}>Reject</button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Show accepted groups only if there are any */}
        {acceptedGroups.length > 0 && (
          <div>
            <h3>Accepted Groups:</h3>
            <ul>
              {acceptedGroups.map((group, index) => (
                <li key={index}>
                  <div>
                    <strong>SAP ID:</strong> {group.sapId}
                  </div>
                  <div>
                    <strong>Project Title:</strong> {group.projectTitle}
                  </div>
                  <div>
                    <strong>Course:</strong> {group.course}
                  </div>
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
