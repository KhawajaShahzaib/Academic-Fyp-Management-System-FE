import React, { useState } from 'react';
import '../../components/Headerstudent.css';
import Header from "../../components/Header";

const ProjectSubmissions = () => {
  const [studentFile, setStudentFile] = useState(null);
  const [submissions, setSubmissions] = useState([]); // Track multiple submissions

  const handleFileChange = (e) => {
    setStudentFile(e.target.files[0]);
  };

  const handleFileSubmit = (e) => {
    e.preventDefault();

    if (!studentFile) {
      alert("Please select a file before submitting.");
      return;
    }

    const newSubmission = {
      fileName: studentFile.name,
      submissionTime: new Date().toLocaleString(),
    };

    // Update submission list
    setSubmissions((prevSubmissions) => [...prevSubmissions, newSubmission]);
    setStudentFile(null); // Reset file input after submission
  };

  return (
    <Header>
      <div className="project-submissions">
        <h2>Final Project Submission</h2>
        <p>Please upload the final version of your project including all required documentation.</p>
        <form onSubmit={handleFileSubmit}>
          <div className="form-field">
            <label htmlFor="studentFile">Upload Your File:</label>
            <input
              type="file"
              id="studentFile"
              onChange={handleFileChange}
              required
            />
          </div>
          <button type="submit">Submit</button>
        </form>

        {/* Submission history display */}
        {submissions.length > 0 && (
          <div className="submission-history">
            <h3>Submission History</h3>
            <ul>
              {submissions.map((submission, index) => (
                <li key={index}>
                  <strong>{submission.fileName}</strong> - Submitted on {submission.submissionTime}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </Header>
  );
};

export default ProjectSubmissions;
