import React, { useState } from 'react';
import Header from '../../components/Header'; // Assuming you're using a Header component
import '../../components/Headerstudent.css';

const AddGroupMember = ({ onAddGroupMember }) => {
  const [projectTitle, setProjectTitle] = useState('');
 
  const [sapId, setSapId] = useState(''); // New state for SAP ID

  const handleSubmit = (e) => {
    e.preventDefault();

    if (projectTitle === '' ||  sapId === '') {
      alert('Please enter a project title, select a course, and enter a SAP ID');
      return;
    }

    // Send the new group details to the parent component
    onAddGroupMember({ projectTitle, sapId });

    // Reset the form after submission
    setProjectTitle('');
    
    setSapId('');
  };

  return (
    <Header>
      <div className="add-group-member">
        <h2>Add Group Member</h2>
        <form onSubmit={handleSubmit}>
         

          {/* SAP ID Input */}
          <div>
            <label htmlFor="sapId">SAP ID:</label>
            <input
              type="text"
              id="sapId"
              value={sapId}
              onChange={(e) => setSapId(e.target.value)}
              placeholder="Enter SAP ID"
              required
            />
          </div>

          {/* Project Title Input */}
          <div>
            <label htmlFor="projectTitle">Project Title:</label>
            <input
              type="text"
              id="projectTitle"
              value={projectTitle}
              onChange={(e) => setProjectTitle(e.target.value)}
              placeholder="Enter Project Title"
              required
            />
          </div>

          <button type="submit">Request</button>
        </form>
      </div>
    </Header>
  );
};

export default AddGroupMember;
