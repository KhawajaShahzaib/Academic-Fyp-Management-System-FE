import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import '../../components/Headerstudent.css';
import axios from 'axios';

const ProjectIdeas = () => {
  const [ideas, setIdeas] = useState([]); // To store fetched ideas
  const [filteredIdeas, setFilteredIdeas] = useState([]); // To store filtered ideas

  // Search filters
  const [keywords, setKeywords] = useState('');
  const [degree, setDegree] = useState('');
  const [domain, setDomain] = useState('');
  const [olderIdeas, setOlderIdeas] = useState('Three Month');

  // Fetch ideas from the API on component mount
  useEffect(() => {
    const fetchIdeas = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/fyp/fyp-ideas/');
        setIdeas(response.data);
        setFilteredIdeas(response.data); // Initially display all ideas
      } catch (error) {
        console.error('Error fetching FYP ideas:', error);
      }
    };

    fetchIdeas();
  }, []);

  // Handle search logic
  const handleSearch = (e) => {
    e.preventDefault();

    const filtered = ideas.filter((idea) => {
      const matchesKeywords = keywords
        ? idea.title.toLowerCase().includes(keywords.toLowerCase()) ||
          idea.description.toLowerCase().includes(keywords.toLowerCase())
        : true;

      const matchesDegree = degree ? idea.preferred_degree === degree : true;
      const matchesDomain = domain ? idea.domain === domain : true;

      // Filter by date (older ideas)
      const now = new Date();
      const ideaDate = new Date(idea.created_at); // Ensure the API provides a `created_at` field
      let withinDateRange = true;

      if (olderIdeas === 'Three Month') {
        withinDateRange = (now - ideaDate) / (1000 * 60 * 60 * 24) <= 90;
      } else if (olderIdeas === 'Six Month') {
        withinDateRange = (now - ideaDate) / (1000 * 60 * 60 * 24) <= 180;
      } else if (olderIdeas === 'One Year') {
        withinDateRange = (now - ideaDate) / (1000 * 60 * 60 * 24) <= 365;
      }

      return matchesKeywords && matchesDegree && matchesDomain && withinDateRange;
    });

    setFilteredIdeas(filtered);
  };

  return (
    <Header>
      <div className="project-ideas">
        <h2>Search Project Ideas</h2>
        <form onSubmit={handleSearch}>
          <div className="form-group">
            <label htmlFor="keywords">Search by Keywords</label>
            <input
              type="text"
              id="keywords"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              placeholder="Enter title or description keywords"
            />
          </div>

          <div className="form-group">
            <label htmlFor="degree">Search by Preferred Degree</label>
            <select id="degree" value={degree} onChange={(e) => setDegree(e.target.value)}>
              <option value="">Select Degree</option>
              <option value="Bachelor's">Bachelor's</option>
              <option value="Master's">Master's</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="domain">Search by Domain</label>
            <select id="domain" value={domain} onChange={(e) => setDomain(e.target.value)}>
              <option value="">Select Domain</option>
              <option value="Data Science">Data Science</option>
              <option value="Artificial Intelligence">Artificial Intelligence</option>
              <option value="Machine Learning">Machine Learning</option>
              <option value="Computer Vision">Computer Vision</option>
              <option value="Web Development">Web Development</option>
              <option value="Android Development">Android Development</option>
              <option value="Cybersecurity">Cybersecurity</option>
              <option value="Cloud Computing">Cloud Computing</option>
              <option value="Blockchain">Blockchain</option>
              <option value="Internet of Things">Internet of Things</option>
            </select>
          </div>

          {/* <div className="form-group">
            <label htmlFor="olderIdeas">Search Older Ideas</label>
            <select
              id="olderIdeas"
              value={olderIdeas}
              onChange={(e) => setOlderIdeas(e.target.value)}
            >
              <option value="Three Month">Three Months</option>
              <option value="Six Month">Six Months</option>
              <option value="One Year">One Year</option>
            </select>
          </div> */}

          <button type="submit">Search</button>
        </form>

        <div className="ideas-list">
          <h3>Results</h3>
          {filteredIdeas.length > 0 ? (
            <ul>
              {filteredIdeas.map((idea) => (
                <li key={idea.id}>
                  <h4>{idea.title}</h4>
                  <p><strong>Domain:</strong> {idea.domain}</p>
                  <p><strong>Description:</strong> {idea.description}</p>
                  <p><strong>Preferred Degree:</strong> {idea.preferred_degree}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No ideas found matching your criteria.</p>
          )}
        </div>
      </div>
    </Header>
  );
};

export default ProjectIdeas;
