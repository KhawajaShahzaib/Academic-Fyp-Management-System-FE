import React, { useState, useContext } from 'react';
import Header from '../../components/Header'; 
import '../../components/Headerstudent.css';
import axios from 'axios';
import AuthContext from '../../context/AuthContext';

const AddGroupMember = ({ onAddGroupMember }) => {
  const [projectTitle, setProjectTitle] = useState('');
  const [sapId, setSapId] = useState(''); // SAP ID state
  const { authTokens } = useContext(AuthContext); // Get authTokens from context

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (projectTitle === '' || sapId === '') {
      alert('Please enter a project title and SAP ID');
      return;
    }

    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/api/fyp/add-group-member/',
        { projectTitle, sapId },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authTokens.access}`, // Add token here
          },
        }
      );

      if (response.status === 200) {
        alert(response.data.message); // Show success message
        onAddGroupMember({ projectTitle, sapId }); // Update parent component if needed
      } else {
        alert(response.data.error || 'Something went wrong');
      }
    } catch (error) {
      alert('Error: ' + error.message);
    }

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
