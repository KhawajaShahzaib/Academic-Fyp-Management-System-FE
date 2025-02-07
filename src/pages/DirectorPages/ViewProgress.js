import React, { useState, useEffect, useContext } from 'react'; 
import '../../components/HeaderMe.css';
import AuthContext from '../../context/AuthContext';
import Header from "../../components/Header";
// import styles from '../commonCSS/fypmanagerstyles.js';
// import styles from '../commonCSS/supervisorStyles.js';
import { Chart } from 'chart.js/auto';
import axios from 'axios';
import { FaBook } from 'react-icons/fa'; // Importing a book icon for degrees
import { faUserGraduate, faUserTie, faUsers, faChalkboardTeacher, faUniversity } from '@fortawesome/free-solid-svg-icons';
import Card from '../../components/Cards.js';
const ViewProgress = () => {
  const { user, authTokens } = useContext(AuthContext);
  const [groups, setGroups] = useState([]);
  const [assessments, setAssessments] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [courseData, setCourseData] = useState({});
 const [degreesData, setDegreesData] = useState([]);
    const [selectedDegree, setSelectedDegree] = useState(null);
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
    setCourses(response.data);
  } catch (error) {
    console.error('Error fetching courses:', error);
    setCourses([]);
  } finally {
    setLoadingCourses(false);
  }
}

const handleCourseChange = (courseId) => {
  if (selectedCourse === courseId) {
      setSelectedCourse(null); // Deselect if clicked again
      updateChart(null);
  } else {
      setSelectedCourse(courseId); // Select a new course
      updateChart(courseId);
  }
};
  

  useEffect(() => {
    if (selectedCourse) {
      const fetchGroupsAndAssessments = async () => {
        try {
          const [groupsResponse, assessmentsResponse] = await Promise.all([
            axios.get(`http://127.0.0.1:8000/api/fyp/${selectedCourse}/get-fyp-groups-all`, {
              headers: { Authorization: `Bearer ${authTokens.access}` }
            }),
            axios.get(`http://127.0.0.1:8000/api/fyp/assessments/?course_id=${selectedCourse}`, {
              headers: { Authorization: `Bearer ${authTokens.access}` }
            })
          ]);
          setGroups(groupsResponse.data);

          const filteredAssessments = assessmentsResponse.data.filter(
            assessment => assessment.name.toLowerCase() !== 'attendance'.toLowerCase()
          );
          setAssessments(filteredAssessments);

          // Calculate completed and total assessments
          const completed = filteredAssessments.filter(a => a.is_done).length;
          const total = filteredAssessments.length;

          setCourseData(prevState => ({
            ...prevState,
            [selectedCourse]: { completed, total, groups: groupsResponse.data.length }
          }));
        } catch (error) {
          console.error('Error fetching groups or assessments:', error);
        }
      };
      fetchGroupsAndAssessments();
    }
  }, [selectedCourse]);

  useEffect(() => {
    if (courses.length > 0) {
      initializeChart();
    }
  }, [courses, courseData]);

  const initializeChart = () => {
    const ctx = document.getElementById('progressChart').getContext('2d');
    const { completed, total } = courseData[selectedCourse] || { completed: 0, total: 0 };

    if (window.progressChart instanceof Chart) {
      window.progressChart.destroy();
    }

    window.progressChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Completed Assessments', 'Total Assessments'],
        datasets: [{
          label: 'Assessments',
          data: [completed, total],
          backgroundColor: ['rgba(54, 162, 235, 0.2)', 'rgba(255, 99, 132, 0.2)'],
          borderColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 99, 132, 1)'],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            title: { display: true, text: 'Number of Assessments' }
          }
        }
      }
    });
  };

  const updateChart = (course) => {
    const { completed, total } = courseData[course] || { completed: 0, total: 0 };

    if (window.progressChart instanceof Chart) {
      window.progressChart.data.datasets[0].data = [completed, total];
      window.progressChart.update();
    }
  };


  return (
    <Header>
      <section style={styles.section}>
        <div>
        <Card
  icon={faUsers}
  title="Total Groups"
  available={courseData[selectedCourse]?.groups || 0}
  styles={styles}
/>
        </div>
        </section>
        <section style={styles.section}>
         {/* Course Selection */}
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

{selectedDegree && (
    <div style={{ marginBottom: '30px' }}>
        <h3 style={{ marginBottom: '10px', color: '#555' }}>Select a Course</h3>
        <table style={styles.table}>
            <thead style={styles.tableHeader}>
                <tr style={styles.tableHeaderRow}>
                    <th style={styles.tableCell}>Select</th>
                    <th style={styles.tableCell}>Course Name</th>
                    <th style={styles.tableCell}>Section</th>
                    <th style={styles.tableCell}>Semester</th>
                </tr>
            </thead>
            <tbody>
                {courses.map((course) => (
                    <tr
                        key={course.course_id}
                        style={
                            selectedCourse === course.course_id
                                ? styles.selectedRow
                                : styles.unselectedRow
                        }
                        onClick={() => handleCourseChange(course.course_id)}
                    >
                        <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                            <input
                                type="radio"
                                name="courseSelection"
                                checked={selectedCourse === course.course_id}
                                onChange={() => handleCourseChange(course.course_id)}
                            />
                        </td>
                        <td style={styles.tableCell}>{course.course_name}</td>
                        <td style={styles.tableCell}>{course.section_name}</td>
                        <td style={styles.tableCell}>{course.semester.semester_name}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
)}

        <div className="chart-section">
          <h2>Course Progress</h2>
          <canvas id="progressChart" width="400" height="200"></canvas>
        </div>
      </section>
    </Header>
  );
};
const styles = {
  section: {
    margin: '20px 0',
  },
  card: {
    backgroundColor: '#f9f9f9',
    borderRadius: '10px',
    padding: '20px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
  },
  cardContent: {
    textAlign: 'center',
  },
  title: {
    fontSize: '24px',
    color: '#333',
    marginBottom: '10px',
  },
  count: {
    fontSize: '24px',
    color: '#0073e6',
    fontWeight: 'bold',
  },
  countValue: {
    fontSize: '2em',
  },
  label: {
    fontWeight: 'bold',
    fontSize: '1.2em',
    color: '#444',
    marginBottom: '10px',
    display: 'block',
  },
  cardHover: {
    transform: 'scale(1.05)',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
    gap: '20px',
  },
  degreeCard: (isSelected) => ({
    cursor: 'pointer',
    padding: '20px',
    borderBottom: isSelected ? '10px solid #0073e6' : '10px solid transparent',
    borderRadius: '15px',
    backgroundColor: isSelected ? 'rgba(0, 115, 230, 0.1)' : '#fff',
    color: isSelected ? '#0073e6' : '#333',
    boxShadow: isSelected ? '0 4px 10px rgba(0, 115, 230, 0.3)' : '0 4px 10px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s ease',
    textAlign: 'center',
  }),
  icon: (isSelected) => ({
    fontSize: '2.5em',
    marginBottom: '10px',
    color: isSelected ? '#0073e6' : '#0073e6',
  }),
  degreeName: {
    fontSize: '1.4em',
    marginBottom: '10px',
    fontWeight: '600',
  },
  courseTitle: {
    marginBottom: '10px',
    color: '#555',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  tableHeader: {
    backgroundColor: '#f4f4f4',
  },
  tableHeaderRow: {
    borderBottom: '2px solid #ddd',
  },
  tableCell: {
    padding: '10px',
    border: '1px solid #ddd',
  },
  selectedRow: {
    backgroundColor: '#e1f5fe',
  },
  unselectedRow: {
    backgroundColor: '#fff',
  },
};
export default ViewProgress;






// import React, { useState, useEffect, useContext } from 'react';
// import '../../components/HeaderMe.css';
// import AuthContext from '../../context/AuthContext';
// import Header from "../../components/Header";
// // import styles from '../commonCSS/supervisorStyles.js';
// import styles from '../commonCSS/fypmanagerstyles.js';
// import { Chart } from 'chart.js/auto';

// const ViewProgress = () => {
//   const { user } = useContext(AuthContext);

//   const courseData = {
//     'fyp1': { completed: 3, total: 5, groups: 12 },
//     'fyp2': { completed: 2, total: 4, groups: 10 },
//     'bsse': { completed: 4, total: 6, groups: 8 },
//     'bsit': { completed: 5, total: 7, groups: 9 },
//   };

//   const [selectedCourse, setSelectedCourse] = useState('fyp1');

//   useEffect(() => {
//     initializeChart();
//   }, []); // Initialize chart only once on component mount

//   const initializeChart = () => {
//     const ctx = document.getElementById('progressChart').getContext('2d');
//     const { completed, total } = courseData[selectedCourse];

//     if (window.progressChart instanceof Chart) {
//       window.progressChart.destroy();
//     }

//     window.progressChart = new Chart(ctx, {
//       type: 'bar',
//       data: {
//         labels: ['Completed Assessments', 'Total Assessments'],
//         datasets: [{
//           label: 'Assessments',
//           data: [completed, total],
//           backgroundColor: ['rgba(54, 162, 235, 0.2)', 'rgba(255, 99, 132, 0.2)'],
//           borderColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 99, 132, 1)'],
//           borderWidth: 1
//         }]
//       },
//       options: {
//         scales: {
//           y: {
//             beginAtZero: true,
//             title: { display: true, text: 'Number of Assessments' }
//           }
//         }
//       }
//     });
//   };

//   const updateChart = (course) => {
//     const { completed, total } = courseData[course];

//     if (window.progressChart instanceof Chart) {
//       window.progressChart.data.datasets[0].data = [completed, total];
//       window.progressChart.update();
//     }
//   };

//   const handleCourseChange = (event) => {
//     const course = event.target.value;
//     setSelectedCourse(course);
//     updateChart(course);
//   };

//   return (
//     <Header>
//       <section style={styles.section}>
//         <h1>Director Dashboard</h1>
//         <div className="summary">
//           <div className="card">
//             <h2>Total Groups in Progress</h2>
//             {/* Display the group number dynamically based on the selected course */}
//             <p><span>Currently {courseData[selectedCourse].groups} in progress</span></p>
//           </div>
//         </div>

//         <div>
//           <label style={styles.courseSelect}>Select Course:</label>.
//           <select value={selectedCourse} onChange={handleCourseChange} style={styles.inputField}>
//             <option value="fyp1">FYP-1 BSCS FALL 2024</option>
//             <option value="fyp2">FYP-2 BSCS FALL 2024</option>
//             <option value="bsse">FYP-1 BSSE FALL 2024</option>
//             <option value="bsit">FYP-2 BSSE FALL 2024</option>
//           </select>
//         </div>

//         <div className="chart-section">
//           <h2>Course Progress</h2>
//           <canvas id="progressChart" width="400" height="200"></canvas>
//         </div>
//       </section>
//     </Header>
//   );
// };

// export default ViewProgress;
