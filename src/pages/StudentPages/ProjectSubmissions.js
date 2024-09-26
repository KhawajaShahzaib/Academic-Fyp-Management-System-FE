// src/components/ProjectSubmissions.js
import React, { useState } from 'react';

const ProjectSubmissions = () => {
  const [studentFile, setStudentFile] = useState(null);

  const handleFileSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted File:', studentFile);
    setStudentFile(null); // Reset file input after submission
  };

  return (
    <div className="project-submissions">
      <h2>Final Project Submission</h2>
      <p>Please upload the final version of your project including all required documentation.</p>
      <form onSubmit={handleFileSubmit}>
        <div className="form-field">
          <label htmlFor="studentFile">Upload Your File:</label>
          <input
            type="file"
            id="studentFile"
            onChange={(e) => setStudentFile(e.target.files[0])}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ProjectSubmissions;
