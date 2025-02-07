import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../../context/AuthContext';
import Header from "../../components/Header";
// import styles from '../commonCSS/supervisorStyles.js';
import styles from '../commonCSS/fypmanagerstyles.js';
import { FaBook } from 'react-icons/fa'; // Importing a book icon for degrees

const AssignFypManager = () => {
    const { authTokens } = useContext(AuthContext);
    const [courses, setCourses] = useState([]);
    const [faculty, setFaculty] = useState([]);
    const [selectedCourses, setSelectedCourses] = useState([]);
    const [selectedFaculty, setSelectedFaculty] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [degreesData, setDegreesData] = useState([]);
        const [selectedDegree, setSelectedDegree] = useState(null);
        const [loadingCourses, setLoadingCourses] = useState(false);
        const [loadingDegrees, setLoadingDegrees] = useState(true);

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
      fetchFaculty();
    } catch (error) {
      console.error('Error fetching courses:', error);
      setCourses([]);
    } finally {
      setLoadingCourses(false);
    }
  }

    useEffect(() => {
        // fetchCourses();
        fetchFaculty();
    }, []);

    const fetchCourses = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/fyp/courses-director/', {
                headers: { Authorization: `Bearer ${authTokens.access}` },
            });
            setCourses(response.data);
            console.log("fetched courses for director: ", response.data)
        } catch (error) {
            console.error('Error fetching courses:', error);
        }
    };

    const fetchFaculty = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/fyp/faculties/', {
                headers: { Authorization: `Bearer ${authTokens.access}` },
            });
            setFaculty(response.data);
            console.log("fetched faculties: ", response.data)
        } catch (error) {
            console.error('Error fetching faculty:', error);
        }
    };

    const handleCourseChange = (courseId) => {
        setSelectedCourses((prev) => {
            if (prev.includes(courseId)) {
                return prev.filter(id => id !== courseId);
            } else {
                return [...prev, courseId];
            }
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedFaculty) {
            alert("Please select a faculty member.");
            return;
        }

        const data = {
            course: selectedCourses,
            user: selectedFaculty.faculty_id,
        };

        try {
            await axios.post('http://127.0.0.1:8000/api/fyp/fyp-managers/', data, {
                headers: { Authorization: `Bearer ${authTokens.access}` },
            });
            alert("FYP Manager assigned successfully!");
            setSelectedCourses([]);
            setSelectedFaculty(null);
        } catch (error) {
            console.error('Error assigning FYP manager:', error);
        }
    };

    return (
        <Header>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                // maxWidth: '800px',
                margin: '0 auto',
                padding: '20px',
                border: '1px solid #ddd',
                borderRadius: '8px',
                backgroundColor: '#f9f9f9',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            }}>
                <h2 style={{ fontSize: '24px', marginBottom: '20px', color: '#333' }}>Assign FYP Manager</h2>
                
                
                <form onSubmit={handleSubmit} style={{ width: '100%' }}>
               

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
    <h3 style={{ marginBottom: '10px', color: '#555' }}>Select Courses</h3>
    <table style={styles.table}>
        <thead style={styles.tableHeader}>
            <tr style={styles.tableHeaderRow}>
                <th style={styles.tableCell}>Select</th>
                <th style={styles.tableCell}>Course Name</th>
                <th style={styles.tableCell}>Degree</th>
                <th style={styles.tableCell}>Semester</th>
                <th style={styles.tableCell}>Current Fyp Manager</th>
            </tr>
        </thead>
        <tbody>
            {courses.map((course) => (
                <tr
                    key={course.course_id}
                    style={
                        selectedCourses.includes(course.course_id)
                            ? styles.selectedRow
                            : styles.unselectedRow
                    }
                    onClick={() => handleCourseChange(course.course_id)}
                >
                    <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                        <input
                            type="checkbox"
                            checked={selectedCourses.includes(course.course_id)}
                            onChange={() => handleCourseChange(course.course_id)}
                        />
                    </td>
                    <td style={styles.tableCell}>
                        {course.course_name} {course.section_name}
                    </td>
                    <td style={styles.tableCell}>{course.degree.degree_name}</td>
                    <td style={styles.tableCell}>{course.semester.semester_name}</td>
                    <td style={styles.tableCell}>{course.assigned_faculty}</td>
                </tr>
            ))}
        </tbody>
    </table>
</div>
)}


                    <div style={{ marginBottom: '30px' }}>
                        <h3 style={{ marginBottom: '10px', color: '#555' }}>Select Faculty</h3>
                        <div style={{ position: 'relative', marginBottom: '10px' }}>
                            <input
                                type="text"
                                placeholder="Search faculty..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '10px 15px',
                                    border: '1px solid #ddd',
                                    borderRadius: '5px',
                                    marginBottom: '10px',
                                }}
                            />
                            <div style={{
                                maxHeight: '200px',
                                overflowY: 'auto',
                                border: '1px solid #ddd',
                                borderRadius: '5px',
                                backgroundColor: '#fff',
                                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                            }}>
                                {faculty
                                    .filter(f => f.user.username.toLowerCase().includes(searchTerm.toLowerCase()))
                                    .map(f => (
                                        <div
                                            key={f.faculty_id}
                                            style={{
                                                padding: '10px 15px',
                                                borderBottom: '1px solid #eee',
                                                cursor: 'pointer',
                                                backgroundColor: selectedFaculty?.faculty_id === f.faculty_id ? '#dff0d8' : '#fff',
                                                transition: 'background-color 0.3s ease',
                                            }}
                                            onClick={() => setSelectedFaculty(f)}
                                        >
                                            {/* {f.user.username} */}
                                            {f.user.first_name} {f.user.last_name}
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        style={{
                            width: '100%',
                            padding: '12px',
                            backgroundColor: '#007bff',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '5px',
                            fontSize: '16px',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            transition: 'background-color 0.3s ease',
                        }}
                        onMouseOver={(e) => (e.target.style.backgroundColor = '#0056b3')}
                        onMouseOut={(e) => (e.target.style.backgroundColor = '#007bff')}
                    >
                        Assign FYP Manager
                    </button>
                </form>
            </div>
        </Header>
    );
};

export default AssignFypManager;

// import React, { useEffect, useState, useContext } from 'react';
// import axios from 'axios';
// import AuthContext from '../../context/AuthContext';
// import Header from "../../components/Header";
// // import styles from '../commonCSS/supervisorStyles.js';
// import styles from '../commonCSS/fypmanagerstyles.js';

// const AssignFypManager = () => {
//     const { authTokens } = useContext(AuthContext);
//     const [courses, setCourses] = useState([]);
//     const [faculty, setFaculty] = useState([]);
//     const [selectedCourses, setSelectedCourses] = useState([]);
//     const [selectedFaculty, setSelectedFaculty] = useState(null);
//     const [searchTerm, setSearchTerm] = useState("");

//     useEffect(() => {
//         fetchCourses();
//         fetchFaculty();
//     }, []);

//     const fetchCourses = async () => {
//         try {
//             const response = await axios.get('http://127.0.0.1:8000/api/fyp/courses-director/', {
//                 headers: { Authorization: `Bearer ${authTokens.access}` },
//             });
//             setCourses(response.data);
//             console.log("fetched courses: ", response.data)
//         } catch (error) {
//             console.error('Error fetching courses:', error);
//         }
//     };

//     const fetchFaculty = async () => {
//         try {
//             const response = await axios.get('http://127.0.0.1:8000/api/fyp/faculties/', {
//                 headers: { Authorization: `Bearer ${authTokens.access}` },
//             });
//             setFaculty(response.data);
//         } catch (error) {
//             console.error('Error fetching faculty:', error);
//         }
//     };

//     const handleCourseChange = (courseId) => {
//         setSelectedCourses((prev) => {
//             if (prev.includes(courseId)) {
//                 return prev.filter(id => id !== courseId);
//             } else {
//                 return [...prev, courseId];
//             }
//         });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (!selectedFaculty) {
//             alert("Please select a faculty member.");
//             return;
//         }

//         const data = {
//             course: selectedCourses,
//             user: selectedFaculty.faculty_id,
//         };

//         try {
//             await axios.post('http://127.0.0.1:8000/api/fyp/fyp-managers/', data, {
//                 headers: { Authorization: `Bearer ${authTokens.access}` },
//             });
//             alert("FYP Manager assigned successfully!");
//             setSelectedCourses([]);
//             setSelectedFaculty(null);
//         } catch (error) {
//             console.error('Error assigning FYP manager:', error);
//         }
//     };

//     return (
//         <Header>
//             <div style={{
//                 display: 'flex',
//                 flexDirection: 'column',
//                 alignItems: 'center',
//                 maxWidth: '800px',
//                 margin: '0 auto',
//                 padding: '20px',
//                 border: '1px solid #ddd',
//                 borderRadius: '8px',
//                 backgroundColor: '#f9f9f9',
//                 boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
//             }}>
//                 <h2 style={{ fontSize: '24px', marginBottom: '20px', color: '#333' }}>Assign FYP Manager</h2>
//                 <form onSubmit={handleSubmit} style={{ width: '100%' }}>
//                 <div style={{ marginBottom: '30px' }}>
//     <h3 style={{ marginBottom: '10px', color: '#555' }}>Select Courses</h3>
//     <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
//         <thead>
//             <tr style={{ backgroundColor: '#f2f2f2', textAlign: 'left' }}>
//                 <th style={{ padding: '10px', border: '1px solid #ddd' }}>Select</th>
//                 <th style={{ padding: '10px', border: '1px solid #ddd' }}>Course Name</th>
//                 <th style={{ padding: '10px', border: '1px solid #ddd' }}>Degree</th>
//                 <th style={{ padding: '10px', border: '1px solid #ddd' }}>Semester</th>
//             </tr>
//         </thead>
//         <tbody>
//             {courses.map(course => (
//                 <tr
//                     key={course.course_id}
//                     style={{
//                         backgroundColor: selectedCourses.includes(course.course_id) ? '#dff0d8' : '#fff',
//                         cursor: 'pointer',
//                         transition: 'background-color 0.3s ease',
//                         textAlign: 'left'
//                     }}
//                     onClick={() => handleCourseChange(course.course_id)}
//                 >
//                     <td style={{ padding: '10px', border: '1px solid #ddd' }}>
//                         <input
//                             type="checkbox"
//                             checked={selectedCourses.includes(course.course_id)}
//                             onChange={() => handleCourseChange(course.course_id)}
//                         />
//                     </td>
//                     <td style={{ padding: '10px', border: '1px solid #ddd' }}>{course.course_name} {course.section_name}</td>
//                     <td style={{ padding: '10px', border: '1px solid #ddd' }}>{course.degree.degree_name}</td>
//                     <td style={{ padding: '10px', border: '1px solid #ddd' }}>{course.semester.semester_name}</td>
//                 </tr>
//             ))}
//         </tbody>
//     </table>
// </div>

//                     <div style={{ marginBottom: '30px' }}>
//                         <h3 style={{ marginBottom: '10px', color: '#555' }}>Select Faculty</h3>
//                         <div style={{ position: 'relative', marginBottom: '10px' }}>
//                             <input
//                                 type="text"
//                                 placeholder="Search faculty..."
//                                 value={searchTerm}
//                                 onChange={(e) => setSearchTerm(e.target.value)}
//                                 style={{
//                                     width: '100%',
//                                     padding: '10px 15px',
//                                     border: '1px solid #ddd',
//                                     borderRadius: '5px',
//                                     marginBottom: '10px',
//                                 }}
//                             />
//                             <div style={{
//                                 maxHeight: '200px',
//                                 overflowY: 'auto',
//                                 border: '1px solid #ddd',
//                                 borderRadius: '5px',
//                                 backgroundColor: '#fff',
//                                 boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
//                             }}>
//                                 {faculty
//                                     .filter(f => f.user.username.toLowerCase().includes(searchTerm.toLowerCase()))
//                                     .map(f => (
//                                         <div
//                                             key={f.faculty_id}
//                                             style={{
//                                                 padding: '10px 15px',
//                                                 borderBottom: '1px solid #eee',
//                                                 cursor: 'pointer',
//                                                 backgroundColor: selectedFaculty?.faculty_id === f.faculty_id ? '#dff0d8' : '#fff',
//                                                 transition: 'background-color 0.3s ease',
//                                             }}
//                                             onClick={() => setSelectedFaculty(f)}
//                                         >
//                                             {f.user.username}
//                                         </div>
//                                     ))}
//                             </div>
//                         </div>
//                     </div>

//                     <button
//                         type="submit"
//                         style={{
//                             width: '100%',
//                             padding: '12px',
//                             backgroundColor: '#007bff',
//                             color: '#fff',
//                             border: 'none',
//                             borderRadius: '5px',
//                             fontSize: '16px',
//                             fontWeight: 'bold',
//                             cursor: 'pointer',
//                             transition: 'background-color 0.3s ease',
//                         }}
//                         onMouseOver={(e) => (e.target.style.backgroundColor = '#0056b3')}
//                         onMouseOut={(e) => (e.target.style.backgroundColor = '#007bff')}
//                     >
//                         Assign FYP Manager
//                     </button>
//                 </form>
//             </div>
//         </Header>
//     );
// };

// export default AssignFypManager;

