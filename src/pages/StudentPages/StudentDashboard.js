import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header'

import AuthContext from '../../context/AuthContext';

const StudentDash = () => {
  const [isProjectOpen, setIsProjectOpen] = useState(true);
  const [showAddGroupMemberForm, setShowAddGroupMemberForm] = useState(false);
  const [showGroupMembers, setShowGroupMembers] = useState(false);
  const [groupMembers, setGroupMembers] = useState([]);
  const [sapId, setSapId] = useState('');
  const [projectTitle, setProjectTitle] = useState('');
  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  const toggleProjectSection = () => {
    setIsProjectOpen(!isProjectOpen);
  };

  const handleViewSubmissionsClick = () => {
    navigate('/project-submissions');
  };

  const handleSubmitGroupMember = (e) => {
    e.preventDefault();
    const newMember = { sapId, projectTitle };
    setGroupMembers([...groupMembers, newMember]);
    setSapId('');
    setProjectTitle('');
    setShowAddGroupMemberForm(false);
  };

  const handleViewProjectIdeasClick = () => {
    navigate('/project-ideas'); // Navigate to the Project Ideas page
  };

  return (
    <Header>
    <div className="student-dashboard">
      <h1>Hello {user.username} Student Dashboard</h1>
      <button className="new-button">+ New</button>
      <div className="project-section">
        <div className="project-header" onClick={toggleProjectSection}>
          <span>Project</span>
          <span>{isProjectOpen ? '▲' : '▼'}</span>
        </div>
        {isProjectOpen && (
          <div className="project-options">
            <div className="project-option" onClick={handleViewSubmissionsClick}>
              View Submissions
            </div>
            <div
              className="project-option"
              onClick={() => setShowGroupMembers(!showGroupMembers)}
            >
              View Group Members
            </div>
            <div
              className="project-option"
              onClick={() => setShowAddGroupMemberForm(!showAddGroupMemberForm)}
            >
              Add Group Member
            </div>
            <div
              className="project-option"
              onClick={handleViewProjectIdeasClick} // Link to the new Project Ideas page
            >
              View Project Ideas
            </div>
          </div>
        )}
      </div>

      {showAddGroupMemberForm && (
        <div className="add-group-member-form">
          <h3>Add Group Member</h3>
          <form onSubmit={handleSubmitGroupMember}>
            <div className="form-field">
              <label htmlFor="sapId">SAP ID:</label>
              <input
                type="text"
                id="sapId"
                value={sapId}
                onChange={(e) => setSapId(e.target.value)}
                required
              />
            </div>
            <div className="form-field">
              <label htmlFor="projectTitle">Project Title:</label>
              <input
                type="text"
                id="projectTitle"
                value={projectTitle}
                onChange={(e) => setProjectTitle(e.target.value)}
                required
              />
            </div>
            <button type="submit">Request</button>
          </form>
        </div>
      )}

      {showGroupMembers && (
        <div className="view-group-members">
          <h3>Group Members</h3>
          <ul>
            {groupMembers.map((member, index) => (
              <li key={index}>
                <strong>SAP ID:</strong> {member.sapId}, <strong>Project Title:</strong> {member.projectTitle}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
    </Header>
  );
};

export default StudentDash;
