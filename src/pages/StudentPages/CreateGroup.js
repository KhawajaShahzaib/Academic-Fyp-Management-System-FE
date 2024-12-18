import React, { useState } from 'react';
import Header from '../../components/Header'; // Assuming you're using a Header component
import '../../components/Headerstudent.css';
const CreateGroup = () => {
  const [projectTitle, setProjectTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (projectTitle === '') {
      alert('Please enter a project title');
      return;
    }

    // Handle form submission logic here (e.g., send to an API)
    console.log('Project Title:', projectTitle);

    // Reset the form after submission
    setProjectTitle('');
  };

  return (
    <Header>
      <div className="create-group">
        <h2>Create Group</h2>
        <form onSubmit={handleSubmit}>
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
          <button type="submit">Create</button>
        </form>
      </div>
    </Header>
  );
};

export default CreateGroup;
