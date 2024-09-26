// src/components/ProjectIdeas.js
import React, { useState } from 'react';

const ProjectIdeas = () => {
  const [school, setSchool] = useState('');
  const [keywords, setKeywords] = useState('');
  const [degree, setDegree] = useState('');
  const [faculty, setFaculty] = useState('');
  const [domain, setDomain] = useState('');
  const [olderIdeas, setOlderIdeas] = useState('Three Month');

  const handleSearch = (e) => {
    e.preventDefault();
    // Implement your search logic here
    console.log({ school, keywords, degree, faculty, domain, olderIdeas });
  };

  return (
    <div className="project-ideas">
      <h2>Search Project Ideas</h2>
      <form onSubmit={handleSearch}>
        <div className="form-group">
          <label htmlFor="school">School</label>
          <select id="school" value={school} onChange={(e) => setSchool(e.target.value)}>
            <option value="">Select School</option>
            <option value="School A">School A</option>
            <option value="School B">School B</option>
            {/* Add more options as needed */}
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="keywords">Search by Words</label>
          <input
            type="text"
            id="keywords"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="degree">Search by Preferred Degree</label>
          <select id="degree" value={degree} onChange={(e) => setDegree(e.target.value)}>
            <option value="">Select Degree</option>
            <option value="Degree A">Degree A</option>
            <option value="Degree B">Degree B</option>
            {/* Add more options as needed */}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="faculty">Search by Faculty</label>
          <input
            type="text"
            id="faculty"
            value={faculty}
            onChange={(e) => setFaculty(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="domain">Search by Domain</label>
          <input
            type="text"
            id="domain"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="olderIdeas">Search Older Ideas</label>
          <select
            id="olderIdeas"
            value={olderIdeas}
            onChange={(e) => setOlderIdeas(e.target.value)}
          >
            <option value="Three Month">Three Month</option>
            <option value="Six Month">Six Month</option>
            <option value="One Year">One Year</option>
          </select>
        </div>

        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default ProjectIdeas;
