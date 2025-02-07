import React, { useEffect, useState, useContext } from 'react';
import Header from '../../components/Header';
import styles from '../commonCSS/supervisorStyles.js';
import AuthContext from '../../context/AuthContext.js';
import axios from 'axios';
import { FaBook } from 'react-icons/fa'; // Importing a book icon for degrees

const ViewPBLManagement = () => {
  const { authTokens } = useContext(AuthContext);
  const [degreesData, setDegreesData] = useState([]);
  const [selectedDegree, setSelectedDegree] = useState(null);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [loadingCourses, setLoadingCourses] = useState(false);
  const [loadingDegrees, setLoadingDegrees] = useState(true);

  // Fetch degrees data on component mount
  useEffect(() => {
    const fetchDegrees = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/fyp/degree/', {
          headers: {
            'Authorization': `Bearer ${authTokens.access}`,
          },
        });
        console.log('Degrees Data:', response.data); // Log the fetched degrees
        setDegreesData(response.data);
      } catch (error) {
        console.error('Error fetching degrees:', error);
      } finally {
        setLoadingDegrees(false);
      }
    };

    fetchDegrees();
  }, [authTokens]);

  // Handle the change of selected degree and fetch courses
  const handleDegreeChange = async (degreeId) => {
    setSelectedDegree(degreeId);
    // setSelectedCourses(courseId);
    setLoadingCourses(true);
    try {
      // const response = await axios.get(http://127.0.0.1:8000/api/fyp/${degreeId}/courses-with-projects/, {
      const response = await axios.get(`http://127.0.0.1:8000/api/fyp/${degreeId}/get_coursess/`, {
      // const response = await axios.get(http://127.0.0.1:8000/api/fyp/courses-with-projects/, {
    
        headers: {
          'Authorization': `Bearer ${authTokens.access}`,
        },
      });
      console.log('Courses Data Against Degree:', response.data); // Log the fetched courses
      setSelectedCourses(response.data);
    } catch (error) {
      console.error('Error fetching courses:', error);
      setSelectedCourses([]);
    } finally {
      setLoadingCourses(false);
    }
  
  };

  return (
    <Header>
      <section
        style={{
          ...styles.section,
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          backgroundColor: '#f9f9f9',
        }}
      >
        <h2
          style={{
            ...styles.sectionHeader,
            fontSize: '1.8em',
            marginBottom: '20px',
            color: '#333',
          }}
        >
          PBL Management System
        </h2>

        {loadingDegrees ? (
          <p>Loading degrees...</p>
        ) : (
          <div style={{ margin: '20px 0' }}>
            <label
              htmlFor="degree-select"
              style={{
                fontWeight: 'bold',
                fontSize: '1.2em',
                color: '#444',
                marginBottom: '10px',
                display: 'block',
              }}
            >
              Select Degree:
            </label>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
                gap: '20px',
              }}
            >
              {degreesData.map((degree) => (
                <div
                  key={degree.id}
                  onClick={() => handleDegreeChange(degree.degree_id)}
                  style={{
                    cursor: 'pointer',
                    padding: '20px',
                    borderBottom:
                      selectedDegree === degree.degree_id
                        ? '10px solid #0073e6'
                        : '10px solid transparent',
                    borderRadius: '15px',
                    backgroundColor:
                      selectedDegree === degree.degree_id
                        ? 'rgba(0, 115, 230, 0.1)'
                        : '#fff',
                    color:
                      selectedDegree === degree.degree_id ? '#0073e6' : '#333',
                    boxShadow:
                      selectedDegree === degree.degree_id
                        ? '0 4px 10px rgba(0, 115, 230, 0.3)'
                        : '0 4px 10px rgba(0, 0, 0, 0.1)',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                  }}
                >
                  <FaBook
                    style={{
                      fontSize: '2.5em',
                      marginBottom: '10px',
                      color: selectedDegree === degree.degree_id ? '#0073e6' : '#0073e6',
                    }}
                  />
                  <h4
                    style={{
                      fontSize: '1.4em',
                      marginBottom: '10px',
                      fontWeight: '600',
                    }}
                  >
                    {degree.degree_name}
                  </h4>
                </div>
              ))}
            </div>
          </div>
        )}

        {loadingCourses && <p>Loading courses...</p>}

        {selectedCourses.length === 0 && !loadingCourses && (
          <p>No courses available for the selected degree.</p>
        )}

        {selectedCourses.length > 0 && (
          <div>
            <h3
              style={{
                fontWeight: 'bold',
                fontSize: '1.5em',
                color: '#555',
                marginBottom: '20px',
              }}
            >
              Relevant Courses
            </h3>
            <table
              style={{
                width: '100%',
                borderCollapse: 'collapse',
                marginTop: '20px',
              }}
            >
              <thead>
                <tr style={{ backgroundColor: '#f0f0f0', textAlign: 'left' }}>
                  <th style={{ padding: '10px', border: '1px solid #ddd' }}>
                    Course Name
                  </th>
                  <th style={{ padding: '10px', border: '1px solid #ddd' }}>
                    Section
                  </th>
                  <th style={{ padding: '10px', border: '1px solid #ddd' }}>
                    Semester
                  </th>
                  <th style={{ padding: '10px', border: '1px solid #ddd' }}>
                    Teacher
                  </th>
                  <th style={{ padding: '10px', border: '1px solid #ddd' }}>
                    Rubric Status
                  </th>

                  <th style={{ padding: '10px', border: '1px solid #ddd' }}>
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {selectedCourses.map((course) => (
                  <tr key={course.id}>
                    <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                      {course.course_name}
                    </td>
                    <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                      {course.section_name}
                    </td>
                    <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                      {course.semester.semester_name}
                    </td>
                    <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                      {course.user}
                    </td>
                    <td
                      style={{
                        padding: '10px',
                        border: '1px solid #ddd',
                        color: course.rubric_approved ? 'green' : 'red',
                      }}
                    >
                      {course.rubric_approved ? 'Approved' : 'Not Approved'}
                    </td>
                    <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                      <button
                        onClick={() =>
                          alert('PBL scheduled')
                        }
                        style={{
                          padding: '5px 10px',
                          backgroundColor: '#0073e6',
                          color: '#fff',
                          border: 'none',
                          borderRadius: '5px',
                          cursor: 'pointer',
                        }}
                      >
                        Schedule PBL
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </Header>
  );
};

export default ViewPBLManagement;