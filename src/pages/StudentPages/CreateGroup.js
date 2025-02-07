import React, { useState, useEffect, useContext } from 'react';
import Header from '../../components/Header'; // Assuming you're using a Header component
import '../../components/Headerstudent.css';
import AuthContext from '../../context/AuthContext';
import axios from 'axios';

const CreateGroup = () => {
  const [projectTitle, setProjectTitle] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [courses, setCourses] = useState([]);
  const { user, authTokens } = useContext(AuthContext);

  // Fetch courses from backend
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        console.log("Logged in User:", user.username);
  
        const response = await axios.get('http://127.0.0.1:8000/api/fyp/studentcourses/', {
          headers: {
            Authorization: `Bearer ${authTokens.access}`,
          },
        });
  
        console.log('Data fetched:', response.data);
        setCourses(response.data); // Assuming response.data is the array of courses
      } catch (error) {
        console.error('Error fetching courses:', error.response?.data || error.message);
      }
    };
  
    fetchCourses();
  }, [authTokens.access, user.username]); // Add dependencies

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (selectedCourse === '') {
      alert('Please select a course');
      return;
    }
  
    if (projectTitle === '') {
      alert('Please enter a project title');
      return;
    }
  
    const groupData = {
      project_title: projectTitle,
      course_id: selectedCourse,
      created_by: user?.id, // Use the actual student ID from the user context
    };
  
    try {
      const response = await fetch('http://127.0.0.1:8000/api/fyp/groups-students/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authTokens.access}`, // Include the token here
        },
        body: JSON.stringify(groupData),
      });
  
      if (response.ok) {
        const data = await response.json();
        alert(`Group created successfully! Group ID: ${data.group_id}`);
        setSelectedCourse('');
        setProjectTitle('');
      } else {
        const errorData = await response.json();
        alert(`Failed to create group: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Error creating group:', error);
    }
  };

  return (
    <Header>
      <div className="create-group">
        <h2>Create Group</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="courseSelect">Select Course:</label>
            <select
              id="courseSelect"
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              required
            >
              <option value="">-- Select a Course --</option>
              {courses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.code} - {course.name}
                </option>
              ))}
            </select>
          </div>
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
