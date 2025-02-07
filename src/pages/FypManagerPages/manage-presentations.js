// import React, { useState, useEffect, useContext } from 'react';
// import '../../components/HeaderMe.css'; // Ensure your CSS is applied
// import Header from "../../components/Header";
// import styles from '../commonCSS/fypmanagerstyles';
// import AuthContext from '../../context/AuthContext';
// import axios from 'axios'; // Import axios for API requests

// const ManagePresentations = () => {
//     const [upcomingPresentations, setUpcomingPresentations] = useState([]);
//     const [previousPresentations, setPreviousPresentations] = useState([]);
//     const [courses, setCourses] = useState([]);
//     const [assessments, setAssessments] = useState([]);
//     const { user, authTokens } = useContext(AuthContext);
//     const [selectedCourse, setSelectedCourse] = useState('');
//     const [selectedAssessment, setSelectedAssessment] = useState('');

//     useEffect(() => {
//         const fetchCourses = async () => {
//             try {
//                 const response = await axios.get('http://127.0.0.1:8000/api/fyp/courses/', {
//                     headers: { Authorization: `Bearer ${authTokens.access}` }
//                 });
//                 setCourses(response.data);
//             } catch (error) {
//                 console.error("Error fetching courses:", error);
//             }
//         };

//         fetchCourses();
//     }, []);

//     useEffect(() => {
//         if (selectedCourse) {
//             const fetchAssessments = async () => {
//                 try {
//                     const response = await axios.get(`http://127.0.0.1:8000/api/fyp/assessments/?course_id=${selectedCourse}`, {
//                         headers: { Authorization: `Bearer ${authTokens.access}` }
//                     });
//                     const filteredAssessments = response.data.filter(
//                         assessment => assessment.name.toLowerCase() !== 'attendance'.toLowerCase()
//                     );
//                     setAssessments(filteredAssessments);
//                 } catch (error) {
//                     console.error("Error fetching assessments:", error);
//                 }
//             };

//             fetchAssessments();
//         }
//     }, [selectedCourse]);

//     useEffect(() => {
//         if (selectedCourse && selectedAssessment) {
//             const fetchPresentations = async () => {
//                 try {
//                     const response = await axios.get(
//                         `http://127.0.0.1:8000/api/fyp/view-presentations/${selectedCourse}/${selectedAssessment}/`,
//                         { headers: { Authorization: `Bearer ${authTokens.access}` } }
//                     );

//                     const currentTime = new Date(); // Get the current time
//                     console.log("Received schedules: ", response.data);

//                     // Split presentations into upcoming and previous
//                     const upcoming = response.data.filter(presentation => new Date(presentation.scheduled_time) > currentTime);
//                     const previous = response.data.filter(presentation => new Date(presentation.scheduled_time) <= currentTime);

//                     setUpcomingPresentations(upcoming);
//                     setPreviousPresentations(previous);
//                 } catch (error) {
//                     console.error('Error fetching presentations:', error);
//                 }
//             };

//             fetchPresentations();
//         }
//     }, [selectedCourse, selectedAssessment]);

//     const renderPresentationTable = (presentations, title) => (
//         <div style={styles.container}>
//             <h2>{title}</h2>
//             <table style={styles.table}>
//                 <thead>
//                     <tr style={styles.tableHeaderRow}>
//                         <th style={styles.tableHeader}>Scheduled Time</th>
//                         <th style={styles.tableHeader}>Student Group</th>
//                         <th style={styles.tableHeader}>Room No</th>
//                         <th style={styles.tableHeader}>Panel Members</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {presentations.map((presentation, index) => (
//                         <tr key={index} style={styles.tableRow}>
//                             <td style={styles.tableCell}>
//                                 {new Date(presentation.scheduled_time).toLocaleString()}
//                             </td>
//                             <td style={styles.tableCell}>
//                                 <strong>Project:</strong> {presentation.student_group.project_title}
//                                 <br />
//                                 <strong>Members:</strong>
//                                 <ul>
//                                     {presentation.student_group.members.map((member, idx) => (
//                                         <li key={idx}>
//                                             {member.student.username} ({member.student.sap_id})
//                                         </li>
//                                     ))}
//                                 </ul>
//                             </td>
//                             <td style={styles.tableCell}>{presentation.room_no}</td>
//                             <td style={styles.tableCell}>
//                                 {presentation.panel_members.map((member, idx) => (
//                                     <div key={idx}>{member.user.username}</div>
//                                 ))}
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );

//     return (
//         <Header>
//             <section style={styles.section}>
//                 <h2 style={styles.sectionHeader}>Manage Presentations</h2>
//                 <div style={{ marginBottom: '20px' }}>
//                     <label style={styles.courseSelect}>Select Course:</label>
//                     <select
//                         value={selectedCourse}
//                         onChange={(e) => setSelectedCourse(e.target.value)}
//                         style={styles.inputField}
//                     >
//                         <option value="" disabled>Select a course</option>
//                         {courses.map((course) => (
//                             <option key={course.course_id} value={course.course_id}>
//                                 {course.course_name} {course.section_name} {course.degree.degree_name} {course.semester.semester_name}
//                             </option>
//                         ))}
//                     </select>
//                 </div>

//                 {selectedCourse && (
//                     <div style={{ marginTop: '20px' }}>
//                         <label style={styles.courseSelect}>Select Assessment:</label>
//                         <select
//                             value={selectedAssessment}
//                             onChange={(e) => setSelectedAssessment(e.target.value)}
//                             style={styles.inputField}
//                         >
//                             <option value="" disabled>Select an assessment</option>
//                             {assessments.map((assessment) => (
//                                 <option key={assessment.assessment_id} value={assessment.assessment_id}>
//                                     {assessment.name}
//                                 </option>
//                             ))}
//                         </select>
//                     </div>
//                 )}

//                 {upcomingPresentations.length > 0 &&
//                     renderPresentationTable(upcomingPresentations, 'Upcoming Presentations')}

//                 {previousPresentations.length > 0 &&
//                     renderPresentationTable(previousPresentations, 'Previous Presentations')}
//             </section>
//         </Header>
//     );
// };

// export default ManagePresentations;
// import Select from 'react-select';
// import React, { useState, useEffect, useContext } from 'react';
// import '../../components/HeaderMe.css'; // Ensure your CSS is applied
// import Header from "../../components/Header";
// import styles from '../commonCSS/fypmanagerstyles';
// import AuthContext from '../../context/AuthContext';
// import axios from 'axios'; // Import axios for API requests

// const ManagePresentations = () => {
//     const [upcomingPresentations, setUpcomingPresentations] = useState([]);
//     const [previousPresentations, setPreviousPresentations] = useState([]);
//     const [courses, setCourses] = useState([]);
//     const [assessments, setAssessments] = useState([]);
//     const { user, authTokens } = useContext(AuthContext);
//     const [selectedCourse, setSelectedCourse] = useState('');
//     const [selectedAssessment, setSelectedAssessment] = useState('');
//     const [editingPresentation, setEditingPresentation] = useState(null); // Track which presentation is being edited
//     const [updatedData, setUpdatedData] = useState({});
//     const [facultyMembers, setFacultyMembers] = useState([]);
//     const [selectedFaculty, setSelectedFaculty] = useState('');
//     const FacultySelect = ({ faculty, selectedPanelMembers, onChange }) => {
//         const options = faculty.map(facultyMember => ({
//             value: facultyMember.faculty_id,
//             label: facultyMember.user.username, // Display name
//         }));
//         return (
//             <Select
//                 isMulti
//                 name="panel_members"
//                 options={options}
//                 value={selectedPanelMembers.map(memberId => ({
//                     value: memberId,
//                     label: faculty.find(f => f.faculty_id === memberId)?.user.username || memberId,
//                 }))}
//                 onChange={selectedOptions => {
//                     const selectedFacultyIds = selectedOptions.map(option => option.value);
//                     onChange(selectedFacultyIds); // Call handler to update state
//                 }}
//                 styles={{
//                     control: (base) => ({
//                         ...base,
//                         ...styles.input,
//                         minHeight: '40px',
//                     }),
//                     menu: (base) => ({
//                         ...base,
//                         zIndex: 9999,
//                     }),
//                 }}
//                 placeholder="Select Teachers"
//                 closeMenuOnSelect={false}
//             />
//         );
//     };
//     useEffect(() => {
//         const fetchFacultyMembers = async () => {
//             try {
//                 const response = await axios.get('http://127.0.0.1:8000/api/fyp/faculties/', {
//                     headers: { Authorization: `Bearer ${authTokens.access}` }
//                 });
//                 setFacultyMembers(response.data);
//             } catch (error) {
//                 console.error("Error fetching faculty members:", error);
//             }
//         };
    
//         fetchFacultyMembers();
//     }, []);
//     useEffect(() => {
//         const fetchCourses = async () => {
//             try {
//                 const response = await axios.get('http://127.0.0.1:8000/api/fyp/courses/', {
//                     headers: { Authorization: `Bearer ${authTokens.access}` }
//                 });
//                 setCourses(response.data);
//             } catch (error) {
//                 console.error("Error fetching courses:", error);
//             }
//         };

//         fetchCourses();
//     }, []);

//     useEffect(() => {
//         if (selectedCourse) {
//             const fetchAssessments = async () => {
//                 try {
//                     const response = await axios.get(`http://127.0.0.1:8000/api/fyp/assessments/?course_id=${selectedCourse}`, {
//                         headers: { Authorization: `Bearer ${authTokens.access}` }
//                     });
//                     const filteredAssessments = response.data.filter(
//                         assessment => assessment.name.toLowerCase() !== 'attendance'.toLowerCase()
//                     );
//                     setAssessments(filteredAssessments);
//                 } catch (error) {
//                     console.error("Error fetching assessments:", error);
//                 }
//             };

//             fetchAssessments();
//         }
//     }, [selectedCourse]);

//     useEffect(() => {
//         if (selectedCourse && selectedAssessment) {
//             const fetchPresentations = async () => {
//                 try {
//                     const response = await axios.get(
//                         `http://127.0.0.1:8000/api/fyp/view-presentations/${selectedCourse}/${selectedAssessment}/`,
//                         { headers: { Authorization: `Bearer ${authTokens.access}` } }
//                     );

//                     const currentTime = new Date(); // Get the current time
//                     console.log("Received schedules: ", response.data);

//                     // Split presentations into upcoming and previous
//                     const upcoming = response.data.filter(presentation => new Date(presentation.scheduled_time) > currentTime);
//                     const previous = response.data.filter(presentation => new Date(presentation.scheduled_time) <= currentTime);

//                     setUpcomingPresentations(upcoming);
//                     setPreviousPresentations(previous);
//                 } catch (error) {
//                     console.error('Error fetching presentations:', error);
//                 }
//             };

//             fetchPresentations();
//         }
//     }, [selectedCourse, selectedAssessment]);

//     const handleEdit = (presentation) => {
//         console.log("Editing : ", presentation)
//         setEditingPresentation(presentation);
//         setUpdatedData({
//             scheduled_time: presentation.scheduled_time,
//             room_no: presentation.room_no,
//             panel_members: presentation.panel_members.map(member => member.faculty_id)
//         });
//     };

//     const handleUpdate = async () => {
//         try {
//             console.log("Updated data sending: ", updatedData, " PresiD: ", editingPresentation)
//             const response = await axios.put(
//                 `http://127.0.0.1:8000/api/fyp/update-presentation/${editingPresentation.id}/`,
//                 updatedData,
//                 { headers: { Authorization: `Bearer ${authTokens.access}` } }
//             );
//             console.log("Updated successfully:", response.data);
//             setEditingPresentation(null);
//             setUpcomingPresentations(upcomingPresentations.map(p => 
//                 p.id === editingPresentation.id ? response.data : p
//             ));
//         } catch (error) {
//             console.error('Error updating presentation:', error);
//         }
//     };

//       const renderPresentationTable = (presentations, title) => (
//     <div style={styles.container}>
//         <h2>{title}</h2>
//         <table style={styles.table}>
//             <thead>
//                 <tr style={styles.tableHeaderRow}>
//                     <th style={styles.tableHeader}>Scheduled Time</th>
//                     <th style={styles.tableHeader}>Student Group</th>
//                     <th style={styles.tableHeader}>Room No</th>
//                     <th style={styles.tableHeader}>Panel Members</th>
//                     <th style={styles.tableHeader}>Feedback</th>
//                     <th style={styles.tableHeader}>Actions</th>
//                 </tr>
//             </thead>
//             <tbody>
//                 {presentations.map((presentation, index) => {
//                     const isEditing = editingPresentation?.id === presentation.id;
//                     const currentTime = new Date();
//                     const isUpcoming = new Date(presentation.scheduled_time) > currentTime;

//                     return (
//                         <tr key={index} style={styles.tableRow}>
//                             <td style={styles.tableCell}>
//                                 {isEditing ? (
//                                     <input
//                                         type="datetime-local"
//                                         value={updatedData.scheduled_time}
//                                         onChange={(e) =>
//                                             setUpdatedData({ ...updatedData, scheduled_time: e.target.value })
//                                         }
//                                     />
//                                 ) : (
//                                     new Date(presentation.scheduled_time).toLocaleString()
//                                 )}
//                             </td>
//                             <td style={styles.tableCell}>
//                                 <strong>Project:</strong> {presentation.student_group.project_title}
//                             </td>
//                             <td style={styles.tableCell}>
//                                 {isEditing ? (
//                                     <input
//                                         type="text"
//                                         value={updatedData.room_no}
//                                         onChange={(e) =>
//                                             setUpdatedData({ ...updatedData, room_no: e.target.value })
//                                         }
//                                     />
//                                 ) : (
//                                     presentation.room_no
//                                 )}
//                             </td>
//                             <td style={styles.tableCell}>
//                                 {isEditing ? (
//                                     <FacultySelect
//                                         faculty={facultyMembers}
//                                         selectedPanelMembers={updatedData.panel_members || []}
//                                         onChange={(selectedFacultyIds) =>
//                                             setUpdatedData({ ...updatedData, panel_members: selectedFacultyIds })
//                                         }
//                                     />
//                                 ) : (
//                                     presentation.panel_members.map((member, idx) => (
//                                         <div key={idx}>{member.user.username}</div>
//                                     ))
//                                 )}
//                             </td>
//                             <td style={styles.tableCell}>{presentation.feedback}</td>
//                             <td style={styles.tableCell}>
//                                 {isEditing ? (
//                                     <>
//                                         <button style={styles.saveButton} onClick={handleUpdate}>
//                                             Save
//                                         </button>
//                                         <button
//                                             style={styles.cancelButton}
//                                             onClick={() => setEditingPresentation(null)}
//                                         >
//                                             Cancel
//                                         </button>
//                                     </>
//                                 ) : (
//                                     isUpcoming && (
//                                         <button
//                                             style={styles.editButton}
//                                             onClick={() => handleEdit(presentation)}
//                                         >
//                                             Edit
//                                         </button>
//                                     )
//                                 )}
//                             </td>
//                         </tr>
//                     );
//                 })}
//             </tbody>
//         </table>
//     </div>
// );

//     return (
//         <Header>
//             <section style={styles.section}>
//                 <h2 style={styles.sectionHeader}>Manage Presentations</h2>
//                 <div style={{ marginBottom: '20px' }}>
//                     <label style={styles.courseSelect}>Select Course:</label>
//                     <select
//                         value={selectedCourse}
//                         onChange={(e) => setSelectedCourse(e.target.value)}
//                         style={styles.inputField}
//                     >
//                         <option value="" disabled>Select a course</option>
//                         {courses.map((course) => (
//                             <option key={course.course_id} value={course.course_id}>
//                                 {course.course_name} {course.section_name} {course.degree.degree_name} {course.semester.semester_name}
//                             </option>
//                         ))}
//                     </select>
//                 </div>

//                 {selectedCourse && (
//                     <div style={{ marginTop: '20px' }}>
//                         <label style={styles.courseSelect}>Select Assessment:</label>
//                         <select
//                             value={selectedAssessment}
//                             onChange={(e) => setSelectedAssessment(e.target.value)}
//                             style={styles.inputField}
//                         >
//                             <option value="" disabled>Select an assessment</option>
//                             {assessments.map((assessment) => (
//                                 <option key={assessment.assessment_id} value={assessment.assessment_id}>
//                                     {assessment.name}
//                                 </option>
//                             ))}
//                         </select>
//                     </div>
//                 )}

//         {upcomingPresentations.length > 0 && renderPresentationTable(upcomingPresentations, 'Upcoming Presentations')}
                
//         {previousPresentations.length > 0 &&
//                     renderPresentationTable(previousPresentations, 'Previous Presentations')}
 
//                 {/* Edit Form */}
                
                 
//             </section>
           
//         </Header>
//     );
// };

// export default ManagePresentations;

import Select from 'react-select';
import React, { useState, useEffect, useContext } from 'react';
import '../../components/HeaderMe.css'; // Ensure your CSS is applied
import Header from "../../components/Header";
import styles from '../commonCSS/fypmanagerstyles';
import AuthContext from '../../context/AuthContext';
import axios from 'axios'; // Import axios for API requests
import { FaBook } from 'react-icons/fa'; // Importing a book icon for degrees

const ManagePresentations = () => {
    const [upcomingPresentations, setUpcomingPresentations] = useState([]);
    const [previousPresentations, setPreviousPresentations] = useState([]);
    const [courses, setCourses] = useState([]);
    const [assessments, setAssessments] = useState([]);
    const { user, authTokens } = useContext(AuthContext);
    const [selectedCourse, setSelectedCourse] = useState('');
    const [selectedAssessment, setSelectedAssessment] = useState('');
    const [editingPresentation, setEditingPresentation] = useState(null); // Track which presentation is being edited
    const [updatedData, setUpdatedData] = useState({});
    const [facultyMembers, setFacultyMembers] = useState([]);

    const [globalSchedule, setGlobalSchedule] = useState('');
    const [durationBetweenGroups, setDurationBetweenGroups] = useState(0); // in minutes
     const [degreesData, setDegreesData] = useState([]);
        const [selectedDegree, setSelectedDegree] = useState(null);
        const [loadingCourses, setLoadingCourses] = useState(false);
        const [loadingDegrees, setLoadingDegrees] = useState(true);
    const handleGlobalScheduleChange = async () => {
        try {
            const updatedPresentations = upcomingPresentations.map((presentation, index) => {
                const localDate = new Date(globalSchedule);
const newScheduledTime = new Date(localDate.getTime() - localDate.getTimezoneOffset() * 60000);
newScheduledTime.setMinutes(newScheduledTime.getMinutes() + index * durationBetweenGroups);
    
                return {
                    ...presentation,
                    scheduled_time: newScheduledTime.toISOString(),
                };
            });
    
            // Optimistically update the UI
            setUpcomingPresentations(updatedPresentations);
            console.log("Updated Presentations (local):", updatedPresentations);
    
            // Send bulk update to the server
            const response = await axios.put(
                'http://127.0.0.1:8000/api/fyp/update-presentations/',
                { presentations: updatedPresentations },
                { headers: { Authorization: `Bearer ${authTokens.access}` } }
            );
    
            console.log('All presentations updated successfully:', response.data);
    
            // Update state with server response (optional)
            setUpcomingPresentations(response.data);
        } catch (error) {
            console.error('Error updating all presentations:', error);
        }
    };
    

    const [selectedFaculty, setSelectedFaculty] = useState('');
    const FacultySelect = ({ faculty, selectedPanelMembers, onChange }) => {
        const options = faculty.map(facultyMember => ({
            value: facultyMember.faculty_id,
            label: facultyMember.user.username, // Display name
        }));
        return (
            <Select
                isMulti
                name="panel_members"
                options={options}
                value={selectedPanelMembers.map(memberId => ({
                    value: memberId,
                    label: faculty.find(f => f.faculty_id === memberId)?.user.username || memberId,
                }))}
                onChange={selectedOptions => {
                    const selectedFacultyIds = selectedOptions.map(option => option.value);
                    onChange(selectedFacultyIds); // Call handler to update state
                }}
                styles={{
                    control: (base) => ({
                        ...base,
                        ...styles.input,
                        minHeight: '40px',
                    }),
                    menu: (base) => ({
                        ...base,
                        zIndex: 9999,
                    }),
                }}
                placeholder="Select Teachers"
                closeMenuOnSelect={false}
            />
        );
    };
    useEffect(() => {
        const fetchFacultyMembers = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/fyp/faculties/', {
                    headers: { Authorization: `Bearer ${authTokens.access}` }
                });
                setFacultyMembers(response.data);
            } catch (error) {
                console.error("Error fetching faculty members:", error);
            }
        };
    
        fetchFacultyMembers();
    }, []);
    // useEffect(() => {
    //     const fetchCourses = async () => {
    //         try {
    //             const response = await axios.get('http://127.0.0.1:8000/api/fyp/courses/', {
    //                 headers: { Authorization: `Bearer ${authTokens.access}` }
    //             });
    //             setCourses(response.data);
    //         } catch (error) {
    //             console.error("Error fetching courses:", error);
    //         }
    //     };

    //     fetchCourses();
    // }, []);
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
        } else {
            setSelectedCourse(courseId); // Select a new course
        }
    };
    useEffect(() => {
        if (selectedCourse) {
            const fetchAssessments = async () => {
                try {
                    const response = await axios.get(`http://127.0.0.1:8000/api/fyp/assessments/?course_id=${selectedCourse}`, {
                        headers: { Authorization: `Bearer ${authTokens.access}` }
                    });
                    const filteredAssessments = response.data.filter(
                        assessment => assessment.name.toLowerCase() !== 'attendance'.toLowerCase()
                    );
                    setAssessments(filteredAssessments);
                } catch (error) {
                    console.error("Error fetching assessments:", error);
                }
            };

            fetchAssessments();
        }
    }, [selectedCourse]);

    useEffect(() => {
        if (selectedCourse && selectedAssessment) {
            const fetchPresentations = async () => {
                try {
                    const response = await axios.get(
                        `http://127.0.0.1:8000/api/fyp/view-presentations/${selectedCourse}/${selectedAssessment}/`,
                        { headers: { Authorization: `Bearer ${authTokens.access}` } }
                    );

                    const currentTime = new Date(); // Get the current time
                    console.log("Received schedules: ", response.data);

                    // Split presentations into upcoming and previous
                    const upcoming = response.data.filter(presentation => new Date(presentation.scheduled_time) > currentTime);
                    const previous = response.data.filter(presentation => new Date(presentation.scheduled_time) <= currentTime);
                    console.log("Upcoming Presentations: ", upcoming);

                    setUpcomingPresentations(upcoming);
                    setPreviousPresentations(previous);
                } catch (error) {
                    console.error('Error fetching presentations:', error);
                }
            };

            fetchPresentations();
        }
    }, [selectedCourse, selectedAssessment]);

    const handleEdit = (presentation) => {
        console.log("Editing : ", presentation)
        setEditingPresentation(presentation);
        setUpdatedData({
            scheduled_time: presentation.scheduled_time,
            room_no: presentation.room_no,
            panel_members: presentation.panel_members.map(member => member.faculty_id)
        });
    };

    const handleUpdate = async () => {
        try {
            console.log("Updated data sending: ", updatedData, " PresiD: ", editingPresentation)
            const response = await axios.put(
                `http://127.0.0.1:8000/api/fyp/update-presentation/${editingPresentation.id}/`,
                updatedData,
                { headers: { Authorization: `Bearer ${authTokens.access}` } }
            );
            console.log("Updated successfully:", response.data);
            setEditingPresentation(null);
            setUpcomingPresentations(upcomingPresentations.map(p => 
                p.id === editingPresentation.id ? response.data : p
            ));
        } catch (error) {
            console.error('Error updating presentation:', error);
        }
    };

      const renderPresentationTable = (presentations, title) => (
    <div style={styles.container}>
        <h2>{title}</h2>
        <div style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}>
    <h3>Global Schedule</h3>
    <div style={{ marginBottom: '10px' }}>
        <label style={styles.label}>Start Time:</label>
        <input
            type="datetime-local"
            value={globalSchedule}
            onChange={(e) => setGlobalSchedule(e.target.value)}
            style={styles.inputField}
        />
    </div>
    <div style={{ marginBottom: '10px' }}>
        <label style={styles.label}>Duration Between Groups (minutes):</label>
        <input
            type="number"
            value={durationBetweenGroups}
            onChange={(e) => setDurationBetweenGroups(Number(e.target.value))}
            style={styles.inputField}
            min="0"
        />
    </div>
    <button style={styles.updateButton} onClick={handleGlobalScheduleChange}>
        Apply Global Schedule
    </button>
</div>

        <table style={styles.table}>
            <thead>
                <tr style={styles.tableHeaderRow}>
                    <th style={styles.tableHeader}>Scheduled Time</th>
                    <th style={styles.tableHeader}>Student Group</th>
                    <th style={styles.tableHeader}>Room No</th>
                    <th style={styles.tableHeader}>Panel Members</th>
                    <th style={styles.tableHeader}>Feedback</th>
                    <th style={styles.tableHeader}>Actions</th>
                </tr>
            </thead>
            <tbody>
                {presentations.map((presentation, index) => {
                    const isEditing = editingPresentation?.id === presentation.id;
                    const currentTime = new Date();
                    const isUpcoming = new Date(presentation.scheduled_time) > currentTime;

                    return (
                        <tr key={index} style={styles.tableRow}>
                            <td style={styles.tableCell}>
                                {isEditing ? (
                                    <input
                                        type="datetime-local"
                                        value={updatedData.scheduled_time}
                                        onChange={(e) =>
                                            setUpdatedData({ ...updatedData, scheduled_time: e.target.value })
                                        }
                                    />
                                ) : (
                                    new Date(presentation.scheduled_time).toLocaleString()
                                )}
                            </td>
                            <td style={styles.tableCell}>
                                <strong>Project:</strong> {presentation.student_group.project_title}
                            </td>
                            <td style={styles.tableCell}>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        value={updatedData.room_no}
                                        onChange={(e) =>
                                            setUpdatedData({ ...updatedData, room_no: e.target.value })
                                        }
                                    />
                                ) : (
                                    presentation.room_no
                                )}
                            </td>
                            <td style={styles.tableCell}>
                                {isEditing ? (
                                    <FacultySelect
                                        faculty={facultyMembers}
                                        selectedPanelMembers={updatedData.panel_members || []}
                                        onChange={(selectedFacultyIds) =>
                                            setUpdatedData({ ...updatedData, panel_members: selectedFacultyIds })
                                        }
                                    />
                                ) : (
                                    presentation.panel_members.map((member, idx) => (
                                        <div key={idx}>{member.user.username}</div>
                                    ))
                                )}
                            </td>
                            <td style={styles.tableCell}>{presentation.feedback}</td>
                            <td style={styles.tableCell}>
                                {isEditing ? (
                                    <>
                                        <button style={styles.saveButton} onClick={handleUpdate}>
                                            Save
                                        </button>
                                        <button
                                            style={styles.cancelButton}
                                            onClick={() => setEditingPresentation(null)}
                                        >
                                            Cancel
                                        </button>
                                    </>
                                ) : (
                                    isUpcoming && (
                                        <button
                                            style={styles.editButton}
                                            onClick={() => handleEdit(presentation)}
                                        >
                                            Edit
                                        </button>
                                    )
                                )}
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
        
    </div>
);

    return (
        <Header>
            <section style={styles.section}>
                <h2 style={styles.sectionHeader}>Manage Presentations</h2>
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

                {selectedCourse && (
                    <div style={{ marginTop: '20px' }}>
                        <label style={styles.courseSelect}>Select Assessment:</label>
                        <select
                            value={selectedAssessment}
                            onChange={(e) => setSelectedAssessment(e.target.value)}
                            style={styles.inputField}
                        >
                            <option value="" disabled>Select an assessment</option>
                            {assessments.map((assessment) => (
                                <option key={assessment.assessment_id} value={assessment.assessment_id}>
                                    {assessment.name}
                                </option>
                            ))}
                        </select>
                    </div>
                )}

        {upcomingPresentations.length > 0 && renderPresentationTable(upcomingPresentations, 'Upcoming Presentations')}
                
        {previousPresentations.length > 0 &&
                    renderPresentationTable(previousPresentations, 'Previous Presentations')}
 
                {/* Edit Form */}
                
                 
            </section>
           
        </Header>
    );
};

export default ManagePresentations;


