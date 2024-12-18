// import React, { useEffect, useState, useContext } from 'react';
// import axios from 'axios';
// import AuthContext from '../../context/AuthContext'; // Import AuthContext
// import Header from "../../components/Header";
// import styles from '../commonCSS/supervisorStyles.js'; // Create a styles file similar to your backend

// const AssignFypManager = () => {
//     const { authTokens } = useContext(AuthContext); // Get token from context
//     const [courses, setCourses] = useState([]);
//     const [faculty, setFaculty] = useState([]);
//     const [selectedCourses, setSelectedCourses] = useState([]);
//     const [selectedFaculty, setSelectedFaculty] = useState(null);

//     useEffect(() => {
//         fetchCourses();
//         fetchFaculty();
//     }, []);

//     const fetchCourses = async () => {
//         try {
//             const response = await axios.get('http://127.0.0.1:8000/api/fyp/courses/', {
//                 headers: { Authorization: `Bearer ${authTokens.access}` }, // Include token in header
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
//                 headers: { Authorization: `Bearer ${authTokens.access}` }, // Include token in header
//             });
//             console.log("fetched faculty: ", response.data)
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
//         const data = {
//             courses: selectedCourses,  // array of selected course IDs
//             user: selectedFaculty,  // the entire faculty object
//         };
    
//         try {
//             await axios.post('http://127.0.0.1:8000/api/fyp/fyp-managers/', data, {
//                 headers: { Authorization: `Bearer ${authTokens.access}` },  // Include token in header
//             });
//             // Handle response and update UI as needed
//         } catch (error) {
//             console.error('Error assigning FYP manager:', error);
//         }
//     };
//     return (
//         <Header>
//             <div style={styles.container}>
//                 <h2 style={styles.header}>Assign FYP Manager</h2>
//                 <form onSubmit={handleSubmit} style={styles.form}>
//                     <div style={styles.section}>
//                         <h3>Select Courses</h3>
//                         {courses.map(course => (
//                             <div key={course.course_id}>
//                                 <input
//                                     type="checkbox"
//                                     value={course.course_id}
//                                     onChange={() => handleCourseChange(course.course_id)}
//                                 />
//                                 {course.course_name}
//                             </div>
//                         ))}
//                     </div>

//                     <div style={styles.section}>
//                         <h3>Select Faculty</h3>
//                         <select onChange={(e) => {
//     const facultyId = Number(e.target.value);
//     const selectedFaculty = faculty.find(f => f.id === facultyId); // Get the full faculty object
//     setSelectedFaculty(selectedFaculty); // Store the entire faculty object
// }} style={styles.select}>
//     <option value="">Select Faculty</option>
//     {faculty.map(faculty => (
//         <option key={faculty.id} value={faculty.user}>
//             {faculty.user.username}
//         </option>
//     ))}
// </select>
//                     </div>

//                     <button type="submit" style={styles.button}>Assign FYP Manager</button>
//                 </form>
//             </div>
//         </Header>
//     );
// };

// export default AssignFypManager;

import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../../context/AuthContext';
import Header from "../../components/Header";
import styles from '../commonCSS/supervisorStyles.js';

const AssignFypManager = () => {
    const { authTokens } = useContext(AuthContext);
    const [courses, setCourses] = useState([]);
    const [faculty, setFaculty] = useState([]);
    const [selectedCourses, setSelectedCourses] = useState([]);
    const [selectedFaculty, setSelectedFaculty] = useState(null);

    useEffect(() => {
        fetchCourses();
        fetchFaculty();
    }, []);

    const fetchCourses = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/fyp/courses-director/', {
                headers: { Authorization: `Bearer ${authTokens.access}` },
            });
            setCourses(response.data);
            console.log("Fetched courses: ", response.data);
        } catch (error) {
            console.error('Error fetching courses:', error);
        }
    };

    const fetchFaculty = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/fyp/faculties/', {
                headers: { Authorization: `Bearer ${authTokens.access}` },
            });
            console.log("Fetched faculty: ", response.data);
            setFaculty(response.data);
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

        // Check if selectedFaculty is defined
        if (!selectedFaculty) {
            alert("Please select a faculty member.");
            return;
        }

        const data = {
            course: selectedCourses,
            user: selectedFaculty.faculty_id, // Use faculty_id instead of user ID
        };

        try {
            await axios.post('http://127.0.0.1:8000/api/fyp/fyp-managers/', data, {
                headers: { Authorization: `Bearer ${authTokens.access}` },
            });
            console.log("FYP Manager assigned successfully");
            // Optionally, clear selections or show success message here
        } catch (error) {
            console.error('Error assigning FYP manager:', error);
        }
    };

    return (
        <Header>
            <div style={styles.container}>
                <h2 style={styles.header}>Assign FYP Manager</h2>
                <form onSubmit={handleSubmit} style={styles.form}>
                    <div style={styles.section}>
                        <h3>Select Courses</h3>
                        {courses.map(course => (
                            <div key={course.course_id}>
                                <input
                                    type="checkbox"
                                    value={course.course_id}
                                    onChange={() => handleCourseChange(course.course_id)}
                                />
                                {course.course_name}
                            </div>
                        ))}
                    </div>

                    <div style={styles.section}>
                        <h3>Select Faculty</h3>
                        <select onChange={(e) => {
                            const facultyId = e.target.value; // No need to convert to number
                            console.log("Selected Faculty ID: ", facultyId); // Log selected faculty ID
                            const selectedFaculty = faculty.find(f => f.faculty_id === Number(facultyId)); // Match by faculty_id
                            setSelectedFaculty(selectedFaculty); // Store the entire faculty object
                            console.log("Selected Faculty Object: ", selectedFaculty); // Log selected faculty object
                        }} style={styles.select}>
                            <option value="">Select Faculty</option>
                            {faculty.map(faculty => (
                                <option key={faculty.faculty_id} value={faculty.faculty_id}> {/* Use faculty.faculty_id */}
                                    {faculty.user.username}
                                </option>
                            ))}
                        </select>
                    </div>

                    <button type="submit" style={styles.button}>Assign FYP Manager</button>
                </form>
            </div>
        </Header>
    );
};

export default AssignFypManager;
