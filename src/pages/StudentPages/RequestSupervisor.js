import React, { useState, useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import axios from 'axios';
 // Import the new CSS file
import Header from '../../components/Header';
import '../../components/Headerstudent.css';
const RequestSupervisor = () => {
  const { authTokens } = useContext(AuthContext);
  const [projectTitle, setProjectTitle] = useState('');
  const [description, setDescription] = useState('');
  const [groupMembers, setGroupMembers] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      group: {
        project_title: projectTitle,
      },
      description: description,
      group_members: groupMembers.split(',').map(member => ({ username: member.trim() })),
    };

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/fyp/supervision-requests/', data, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authTokens.access}`,
        },
      });

      setMessage('Request sent successfully!');
      setProjectTitle('');
      setDescription('');
      setGroupMembers('');
    } catch (error) {
      console.error('Error sending request:', error);
      setMessage('Failed to send request. Please try again.');
    }
  };

  return (
    <Header>
      <section className="request-supervisor-container">
        <h2 className="title">Request a Supervisor</h2>
        {message && <p className="message">{message}</p>}
        <form onSubmit={handleSubmit} className="request-supervisor-form">
          <label>
            Project Title:
            <input
              type="text"
              value={projectTitle}
              onChange={(e) => setProjectTitle(e.target.value)}
              required
            />
          </label>
          <label>
            Description:
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows="4"
            ></textarea>
          </label>
          <label>
            Group Members (comma-separated usernames):
            <input
              type="text"
              value={groupMembers}
              onChange={(e) => setGroupMembers(e.target.value)}
              required
            />
          </label>
          <button type="submit" className="submit-button">
            Send Request
          </button>
        </form>
      </section>
    </Header>
  );
};

export default RequestSupervisor;
