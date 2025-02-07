import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import './panelmembercss.css';
import Header from '../../components/Header';
import AuthContext from '../../context/AuthContext.js';
import styles from '../commonCSS/fypmanagerstyles';

const EvaluationSheet = () => {
    const { authTokens } = useContext(AuthContext);

    const [coursesData, setCoursesData] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [assessmentCriterias, setAssessmentCriterias] = useState([]);
    const [selectedPhase, setSelectedPhase] = useState('');
    const [evaluations, setEvaluations] = useState([]);
    const [upcomingPresentations, setUpcomingPresentations] = useState([]);
    const [ongoingPresentations, setOngoingPresentations] = useState([]);
    const [previousPresentations, setPreviousPresentations] = useState([]);
    const [selectedPresentationId, setSelectedPresentationId] = useState(null); // New state
    const [groupFeedback, setGroupFeedback] = useState(''); // Added state for group feedback
    const tableHeaderStyle = {
        padding: '10px',
        textAlign: 'left',
        fontWeight: 'bold',
        backgroundColor: '#e9ecef',
        borderBottom: '1px solid #ddd',
    };
    
    const tableCellStyle = {
        padding: '10px',
        borderBottom: '1px solid #ddd',
    };
    useEffect(() => {
        const fetchPresentations = async () => {
            try {
                const response = await axios.get(
                    `http://127.0.0.1:8000/api/fyp/view-presentations-user/`,
                    { headers: { Authorization: `Bearer ${authTokens.access}` } }
                );

                const currentTime = new Date();
                const todayStart = new Date(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate());
                const todayEnd = new Date(todayStart);
                todayEnd.setDate(todayEnd.getDate() + 1);

                const upcoming = response.data.filter(
                    presentation => new Date(presentation.scheduled_time) > currentTime
                );

                const ongoing = response.data.filter(presentation => {
                    const scheduledTime = new Date(presentation.scheduled_time);
                    return (
                        scheduledTime >= todayStart &&
                        scheduledTime < todayEnd &&
                        scheduledTime <= currentTime
                    );
                });

                const previous = response.data.filter(
                    presentation => new Date(presentation.scheduled_time) < todayStart
                );

                setUpcomingPresentations(upcoming);
                setOngoingPresentations(ongoing);
                setPreviousPresentations(previous);
            } catch (error) {
                console.error('Error fetching presentations:', error);
            }
        };

        fetchPresentations();
    }, [authTokens]);

    const handleRowClick = async (presentation) => {
        console.log("Presentation Selected: ", presentation.course);
        setSelectedPresentationId(presentation.id); // Set selected presentation ID

        try {
            const response = await axios.get(
                `http://127.0.0.1:8000/api/fyp/evaluator-course-details/${presentation.course.course_id}/${presentation.assessment.assessment_id}/`,
                { headers: { Authorization: `Bearer ${authTokens.access}` } }
            );
            const { groups, criteria } = response.data;
            setAssessmentCriterias(criteria);
            setSelectedPhase('');
            setSelectedCourse(presentation.course);
            setEvaluations([]);
        } catch (error) {
            console.error('Error fetching assessment criteria:', error);
        }
    };
    const [accordionOpen, setAccordionOpen] = useState({});

    // Toggle function to open/close the accordion for a student
    const toggleAccordion = (index) => {
        setAccordionOpen((prevState) => ({
            ...prevState,
            [index]: !prevState[index], // Toggle the open state for the student at the given index
        }));
    };
    const renderPresentationTable = (presentations, title) => {
        return (
            <div style={styles.container}>
                <h2>{title}</h2>
                <table style={styles.table}>
                    <thead>
                        <tr style={styles.tableHeaderRow}>
                            <th style={styles.tableHeader}>Scheduled Time</th>
                            <th style={styles.tableHeader}>Course</th>
                            <th style={styles.tableHeader}>Degree</th>
                            <th style={styles.tableHeader}>Section</th>
                            {/* <th style={styles.tableHeader}>Semester</th> */}
                            <th style={styles.tableHeader}>Student Group</th>
                            {/* <th style={styles.tableHeader}>Room No</th> */}
                            {/* <th style={styles.tableHeader}>Panel Members</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {presentations.map((presentation, index) => {
                            const isSelected = presentation.id === selectedPresentationId;
                            return (
                                <React.Fragment key={index}>
                                    <tr
                                        style={{
                                            ...styles.tableHeaderRow,
                                            backgroundColor: isSelected ? '#cce5ff' : 'transparent',
                                            cursor: 'pointer',
                                        }}
                                        onClick={() => handleRowClick(presentation)}
                                    >
                                        <td style={styles.tableCell}>
                                            {new Date(presentation.scheduled_time).toLocaleString()}
                                        </td>
                                        <td style={styles.tableCell}>{presentation.course.course_name}</td>
                                        <td style={styles.tableCell}>{presentation.course.degree.degree_name}</td>
                                        <td style={styles.tableCell}>{presentation.course.section_name}</td>
                                        {/* <td style={styles.tableCell}>{presentation.course.semester.semester_name}</td> */}
                                        <td style={styles.tableCell}>
                                            <strong>Project:</strong> {presentation.student_group.project_title}
                                        </td>
                                        {/* <td style={styles.tableCell}>{presentation.room_no}</td> */}
                                        {/* <td style={styles.tableCell}>
                                            {presentation.panel_members.map((member, idx) => (
                                                <div key={idx}>{member.user.username}</div>
                                            ))}
                                        </td> */}
                                    </tr>
                                    {isSelected && (
                                        <tr>
                                            <td colSpan={9}>
                                                <div
                                                    style={{
                                                        padding: '20px',
                                                        backgroundColor: '#f9f9f9',
                                                        borderRadius: '8px',
                                                    }}
                                                >
                                                    <h2
                                                        style={{
                                                            textAlign: 'center',
                                                            marginBottom: '20px',
                                                            color: '#333',
                                                        }}
                                                    >
                                                        Evaluate Student
                                                    </h2>
                                                    {/* Shared Group Feedback Dropdown */}
                                                    <div>
                                                        <div
                                                            style={{
                                                                marginBottom: '15px',
                                                                border: '1px solid #ddd',
                                                                borderRadius: '8px',
                                                                overflow: 'hidden',
                                                                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                                                            }}
                                                        >
                                                            <div
                                                                style={{
                                                                    padding: '15px 20px',
                                                                    width: '100%',
                                                                    backgroundColor: '#007bff',
                                                                    color: '#fff',
                                                                    cursor: 'pointer',
                                                                    justifyContent: 'space-between',
                                                                    alignItems: 'center',
                                                                }}
                                                                onClick={() => toggleAccordion('group')}
                                                            >
                                                                <div
                                                                    style={{
                                                                        display: 'flex',
                                                                        justifyContent: 'center',
                                                                        alignItems: 'center',
                                                                        height: '100%',
                                                                    }}
                                                                >
                                                                    <div style={{ textAlign: 'center' }}>
                                                                        <p style={{ margin: 0, fontSize: '24px' }}>
                                                                            Group: {presentation.student_group.project_title}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                                <span style={{ fontSize: '20px' }}>
                                                                    {accordionOpen['group'] ? '-' : '+'}
                                                                </span>
                                                            </div>
                                                            {accordionOpen['group'] && (
                                                                <div style={{ padding: '15px 20px', backgroundColor: '#fff' }}>
                                                                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                                                        <thead>
                                                                            <tr style={{ backgroundColor: '#f2f2f2' }}>
                                                                                <th style={tableHeaderStyle}>Criteria</th>
                                                                                <th style={tableHeaderStyle}>Max Score</th>
                                                                                <th style={tableHeaderStyle}>Marks</th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            {assessmentCriterias.map((criteria, criteriaIdx) => (
                                                                                <tr key={criteriaIdx}>
                                                                                    <td style={tableCellStyle}>{criteria.name}</td>
                                                                                    <td style={tableCellStyle}>
                                                                                        {criteria.max_score}
                                                                                    </td>
                                                                                    <td style={tableCellStyle}>
                                                                                        {presentation.student_group.members.map((student, idx) => (
                                                                                            <div key={idx} style={{ marginBottom: '10px' }}>
                                                                                                <p style={{ margin: '0', fontSize: '18px' }}>
                                                                                                    {student.student.username} - {student.student.sap_id}
                                                                                                </p>
                                                                                                <input
                                                                                                    type="number"
                                                                                                    min="0"
                                                                                                    max={criteria.max_score}
                                                                                                    value={evaluations[student.id]?.[criteria.id] || ''}
                                                                                                    onChange={(e) => {
                                                                                                        setEvaluations((prev) => ({
                                                                                                            ...prev,
                                                                                                            [student.id]: {
                                                                                                                ...prev[student.id],
                                                                                                                [criteria.id]: e.target.value,
                                                                                                            },
                                                                                                        }));
                                                                                                    }}
                                                                                                    placeholder="Enter Marks"
                                                                                                    style={{
                                                                                                        width: '80px',
                                                                                                        padding: '5px',
                                                                                                        border: '1px solid #ccc',
                                                                                                        borderRadius: '4px',
                                                                                                    }}
                                                                                                />
                                                                                            </div>
                                                                                        ))}
                                                                                    </td>
                                                                                </tr>
                                                                            ))}
                                                                        </tbody>
                                                                    </table>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
    
                                                    {/* Group Feedback Field */}
                                                    <div style={{ marginBottom: '15px' }}>
                                                        <label
                                                            style={{
                                                                fontSize: '16px',
                                                                marginBottom: '5px',
                                                                display: 'block',
                                                            }}
                                                        >
                                                            Group Feedback
                                                        </label>
                                                        <textarea
                                                            rows="4"
                                                            value={groupFeedback}
                                                            onChange={(e) => setGroupFeedback(e.target.value)}
                                                            placeholder="Provide feedback for the entire group"
                                                            style={{
                                                                width: '100%',
                                                                padding: '10px',
                                                                border: '1px solid #ccc',
                                                                borderRadius: '4px',
                                                            }}
                                                        />
                                                    </div>
    
                                                    {/* Save Evaluation Button */}
                                                    <button
                                                        onClick={() => {
                                                            const evaluationData = presentation.student_group.members.map(
                                                                (student) => ({
                                                                    sap_id: student.student.sap_id,
                                                                    marks: Object.entries(
                                                                        evaluations[student.id] || {}
                                                                    ).map(([criteriaId, marks]) => ({
                                                                        criteria_id: criteriaId,
                                                                        marks,
                                                                    })),
                                                                })
                                                            );
    
                                                            const dataToSend = {
                                                                evaluations: evaluationData,
                                                                group_feedback: groupFeedback,
                                                            };
    
                                                            console.log('Sending evaluations: ', dataToSend);
                                                            axios.post(
                                                                'http://127.0.0.1:8000/api/fyp/save-evaluation/',
                                                                dataToSend,
                                                                {
                                                                    headers: {
                                                                        Authorization: `Bearer ${authTokens.access}`,
                                                                    },
                                                                }
                                                            )
                                                                .then(() => alert('Evaluation saved successfully!'))
                                                                .catch(() => alert('Error saving evaluation.'));
                                                        }}
                                                        style={{
                                                            marginTop: '20px',
                                                            padding: '10px 20px',
                                                            backgroundColor: '#28a745',
                                                            color: '#fff',
                                                            border: 'none',
                                                            borderRadius: '4px',
                                                            cursor: 'pointer',
                                                            display: 'block',
                                                            width: '100%',
                                                        }}
                                                    >
                                                        Save Evaluation
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </React.Fragment>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        );
    };
    
    

    return (
        <Header>
            <div>
                <h1>Presentation Evaluation</h1>
                {renderPresentationTable(ongoingPresentations, 'Ongoing Presentations')}
                </div>
               
        </Header>
    );
};

export default EvaluationSheet;

//
// {isSelected && (
//     <tr>
//         <td colSpan={9}>
//             <div>
//                 <h2>Student Group Evaluation</h2>
//                 <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
//                     {presentation.student_group.members.map((student, idx) => (
//                         <div
//                             key={idx}
//                             style={{
//                                 border: '1px solid #ddd',
//                                 borderRadius: '8px',
//                                 padding: '20px',
//                                 width: '300px',
//                                 boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
//                                 backgroundColor: '#fff',
//                             }}
//                         >
//                             <h3>{student.student.username}</h3>
//                             <p><strong>Roll No:</strong> {student.student.sap_id}</p>
//                             <ul style={{ padding: 0, listStyle: 'none' }}>
//                                 {assessmentCriterias.map((criteria, criteriaIdx) => (
//                                     <li key={criteriaIdx} style={{ marginBottom: '10px' }}>
//                                         <label style={{ display: 'block', marginBottom: '5px' }}>
//                                             {criteria.name} ({criteria.max_score} max)
//                                         </label>
//                                         <input
//                                             type="number"
//                                             min="0"
//                                             max={criteria.max_score}
//                                             value={
//                                                 evaluations[student.id]?.[criteria.id] || ''
//                                             }
//                                             onChange={(e) => {
//                                                 setEvaluations((prev) => ({
//                                                     ...prev,
//                                                     [student.id]: {
//                                                         ...prev[student.id],
//                                                         [criteria.id]: e.target.value,
//                                                     },
//                                                 }));
//                                             }}
//                                             placeholder="Enter Marks"
//                                             style={{
//                                                 width: '100%',
//                                                 padding: '8px',
//                                                 border: '1px solid #ddd',
//                                                 borderRadius: '4px',
//                                             }}
//                                         />
//                                     </li>
//                                 ))}
//                             </ul>
//                         </div>
//                     ))}
//                 </div>
//                 <button
//                     onClick={() => {
//                         const evaluationData = presentation.student_group.members.map(
//                             (student) => ({
//                                 sap_id: student.student.sap_id,
//                                 marks: Object.entries(
//                                     evaluations[student.id] || {}
//                                 ).map(([criteriaId, marks]) => ({
//                                     criteria_id: criteriaId,
//                                     marks,
//                                 })),
//                             })
//                         );

//                         console.log('Sending evaluations: ', evaluationData);
//                         axios.post(
//                             'http://127.0.0.1:8000/api/fyp/save-evaluation/',
//                             { evaluations: evaluationData },
//                             {
//                                 headers: {
//                                     Authorization: `Bearer ${authTokens.access}`,
//                                 },
//                             }
//                         )
//                             .then(() => alert('Evaluation saved successfully!'))
//                             .catch(() => alert('Error saving evaluation.'));
//                     }}
//                     style={{
//                         marginTop: '20px',
//                         padding: '10px 20px',
//                         backgroundColor: '#007bff',
//                         color: '#fff',
//                         border: 'none',
//                         borderRadius: '4px',
//                         cursor: 'pointer',
//                     }}
//                 >
//                     Save Evaluation
//                 </button>
//             </div>
//         </td>
//     </tr>

                                      
//                                 )}
//Working ok flow but no highlight
// import React, { useState, useEffect, useContext } from 'react';
// import axios from 'axios';
// import './panelmembercss.css';
// import Header from '../../components/Header';
// import AuthContext from '../../context/AuthContext.js';
// import styles from '../commonCSS/fypmanagerstyles';

// const EvaluationSheet = () => {
//     const { authTokens } = useContext(AuthContext);

//     const [coursesData, setCoursesData] = useState([]);
//     const [selectedCourse, setSelectedCourse] = useState(null);
//     const [assessmentCriterias, setAssessmentCriterias] = useState([]);
//     const [selectedPhase, setSelectedPhase] = useState('');
//     const [evaluations, setEvaluations] = useState([]);
//     const [upcomingPresentations, setUpcomingPresentations] = useState([]);
//     const [ongoingPresentations, setOngoingPresentations] = useState([]);
//     const [previousPresentations, setPreviousPresentations] = useState([]);

//     useEffect(() => {
//         const fetchPresentations = async () => {
//             try {
//                 const response = await axios.get(
//                     `http://127.0.0.1:8000/api/fyp/view-presentations-user/`,
//                     { headers: { Authorization: `Bearer ${authTokens.access}` } }
//                 );

//                 const currentTime = new Date();
//                 const todayStart = new Date(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate());
//                 const todayEnd = new Date(todayStart);
//                 todayEnd.setDate(todayEnd.getDate() + 1); // Midnight of the next day

//                 // Filter presentations
//                 const upcoming = response.data.filter(
//                     presentation => new Date(presentation.scheduled_time) > currentTime
//                 );

//                 const ongoing = response.data.filter(presentation => {
//                     const scheduledTime = new Date(presentation.scheduled_time);
//                     return (
//                         scheduledTime >= todayStart &&
//                         scheduledTime < todayEnd && // Scheduled today
//                         scheduledTime <= currentTime // Started already
//                     );
//                 });

//                 const previous = response.data.filter(
//                     presentation => new Date(presentation.scheduled_time) < todayStart
//                 );

//                 setUpcomingPresentations(upcoming);
//                 setOngoingPresentations(ongoing);
//                 setPreviousPresentations(previous);
//             } catch (error) {
//                 console.error('Error fetching presentations:', error);
//             }
//         };

//         fetchPresentations();
//     }, [authTokens]);

//     useEffect(() => {
//         // Fetch evaluator-specific courses
//         axios.get('http://127.0.0.1:8000/api/fyp/evaluator-courses/', {
//             headers: { Authorization: `Bearer ${authTokens.access}` },
//         })
//         .then(response => setCoursesData(response.data))
//         .catch(error => console.error("Error fetching evaluator's courses:", error));
//     }, [authTokens]);

//     useEffect(() => {
//         if (selectedCourse && ongoingPresentations.length > 0) {
//             // Automatically select the course for ongoing presentations
//             const selectedPresentation = ongoingPresentations.find(presentation => presentation.course.course_id === selectedCourse.course_id);
    
//             if (selectedPresentation) {
//                 axios.get(`http://127.0.0.1:8000/api/fyp/evaluator-course-details/${selectedCourse.course_id}/${selectedPresentation.assessment.assessment_id}/`, {
//                     headers: { Authorization: `Bearer ${authTokens.access}` },
//                 })
//                 .then(response => {
//                     const { groups, criteria } = response.data;
//                     setAssessmentCriterias(criteria);  // Assuming criteria are phase-specific
//                     selectedCourse.groups = groups; // Store groups in selectedCourse
//                 })
//                 .catch(error => console.error("Error fetching groups/criteria:", error));
//             }
//         }
//     }, [selectedCourse, ongoingPresentations, authTokens]);

//     const handleCourseChange = (e) => {
//         const courseId = e.target.value;
//         const course = coursesData.find(c => c.course_id === parseInt(courseId));
//         // setSelectedCourse(course);
//         setSelectedPhase('');
//         setEvaluations([]);
//     };

//     const loadEvaluations = () => {
//         if (!selectedCourse || !selectedCourse.projects || !selectedPhase) {
//             alert("Please select a course, a phase, and ensure projects are available.");
//             return;
//         }

//         const evaluationsForPhase = selectedCourse.projects.map(project => ({
//             group_id: project.group_id,
//             project_title: project.project_title,
//             members: project.members.map(member => ({ ...member, marks: '' })),
//         }));

//         setEvaluations(evaluationsForPhase);
//     };

//     const saveEvaluations = () => {
//         if (!selectedCourse || !selectedPhase) {
//             alert("No course or evaluation phase selected.");
//             return;
//         }

//         const updatedEvaluations = evaluations.map(evalItem => ({
//             course: selectedCourse.course_id,
//             phase: selectedPhase,
//             group: evalItem.group_id,
//             students: evalItem.members.map(member => ({
//                 student: member.student.sap_id,
//                 marks: member.marks || 0,
//             })),
//         }));

//         axios.post('http://127.0.0.1:8000/api/fyp/save-evaluations/', updatedEvaluations, {
//             headers: {
//                 'Authorization': `Bearer ${authTokens.access}`,
//                 'Content-Type': 'application/json',
//             },
//         })
//         .then(response => {
//             alert("Evaluations saved successfully!");
//         })
//         .catch(error => {
//             alert("Error saving evaluations.");
//         });
//     };

//     const renderPresentationTable = (presentations, title) => (
//         <div style={styles.container}>
//             <h2>{title}</h2>
//             <table style={styles.table}>
//                 <thead>
//                     <tr style={styles.tableHeaderRow}>
//                         <th style={styles.tableHeader}>Scheduled Time</th>
//                         <th style={styles.tableHeader}>Course</th>
//                         <th style={styles.tableHeader}>Degree</th>
//                         <th style={styles.tableHeader}>Section</th>
//                         <th style={styles.tableHeader}>Semester</th>
//                         <th style={styles.tableHeader}>Student Group</th>
//                         <th style={styles.tableHeader}>Room No</th>
//                         <th style={styles.tableHeader}>Panel Members</th>
//                         <th style={styles.tableHeader}>Feedback</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {presentations.map((presentation, index) => {
//                         const currentTime = new Date();
//                         const isUpcoming = new Date(presentation.scheduled_time) > currentTime;
//                         return (
//                             <tr
//                                 key={index}
//                                 style={styles.tableRow}
//                                 onClick={() => handleRowClick(presentation)}
//                             >
//                                 <td style={styles.tableCell}>
//                                     {new Date(presentation.scheduled_time).toLocaleString()}
//                                 </td>
//                                 <td style={styles.tableCell}>
//                                     {presentation.course.course_name}
//                                 </td>
//                                 <td style={styles.tableCell}>
//                                     {presentation.course.degree.degree_name}
//                                 </td>
//                                 <td style={styles.tableCell}>
//                                     {presentation.course.section_name}
//                                 </td>
//                                 <td style={styles.tableCell}>
//                                     {presentation.course.semester.semester_name}
//                                 </td>






//                                 <td style={styles.tableCell}>
//                                     <strong>Project:</strong> {presentation.student_group.project_title}
//                                 </td>
//                                 <td style={styles.tableCell}>{presentation.room_no}</td>
//                                 <td style={styles.tableCell}>
//                                     {presentation.panel_members.map((member, idx) => (
//                                         <div key={idx}>{member.user.username}</div>
//                                     ))}
//                                 </td>
//                                 <td style={styles.tableCell}>{presentation.feedback}</td>
//                             </tr>
//                         );
//                     })}
//                 </tbody>
//             </table>
//         </div>
//     );

//     const handleRowClick = async (presentation) => {
//         console.log("Presentation Selected: ", presentation.course)

//         try {
//             const response = await axios.get(
//                 `http://127.0.0.1:8000/api/fyp/evaluator-course-details/${presentation.course.course_id}/${presentation.assessment.assessment_id}/`,
//                 { headers: { Authorization: `Bearer ${authTokens.access}` } }
//             );
//             const { groups, criteria } = response.data;
//             setAssessmentCriterias(criteria);
//             setSelectedPhase('');
//             setSelectedCourse(presentation.course)
//             setEvaluations([]);
//         } catch (error) {
//             console.error('Error fetching assessment criteria:', error);
//         }
//     };

//     return (
//         <Header>
//             <div style={{ padding: '20px', backgroundColor: '#f4f4f4' }}>
//                 <h1>PBL Management System</h1>
//                 <div>
//                     {/* {ongoingPresentations.length === 0 ? (
//                         <>
//                             <label htmlFor="course-select">Select Course:</label>
//                             <select id="course-select" onChange={handleCourseChange}>
//                                 <option value="">--Select a Course--</option>
//                                 {coursesData.map(course => (
//                                     <option key={course.course_id} value={course.course_id}>
//                                         {course.course_name} {course.section_name} {course.degree.degree_name} {course.semester.semester_name}
//                                     </option>
//                                 ))}
//                             </select>
//                         </>
//                     ) : (
//                         <div><strong>Select an ongoing presentation to begin the evaluation.</strong></div>
//                     )} */}
//                 </div>

//                 {/* Render Presentation Table */}
//                 {renderPresentationTable(ongoingPresentations, 'Ongoing Presentations')}

//                 {/* Render Assessment Criteria and Marks Input */}
//                 {assessmentCriterias.length > 0 && (
//     <div>
//         <h2>Assessment Criteria</h2>
//         <table style={styles.table}>
//             <thead>
//                 <tr>
//                     <th>Criteria</th>
//                     <th>Max Score (%)</th>
//                     <th>Marks Awarded</th>
//                 </tr>
//             </thead>
//             <tbody>
//                 {assessmentCriterias.map((criteria, index) => (
//                     <tr key={index}>
//                         <td>{criteria.name}</td>
//                         <td>{criteria.max_score}</td>
//                         <td>
//                             <input
//                                 type="number"
//                                 min="0"
//                                 max={criteria.max_score}
//                                 value={criteria.marks || ''}
//                                 onChange={(e) => {
//                                     const updatedCriterias = assessmentCriterias.map((item, idx) =>
//                                         idx === index ? { ...item, marks: e.target.value } : item
//                                     );
//                                     setAssessmentCriterias(updatedCriterias);
//                                 }}
//                                 placeholder="Enter Marks"
//                                 style={{ width: '80px' }}
//                             />
//                         </td>
//                     </tr>
//                 ))}
//             </tbody>
//         </table>
//         <button
//             onClick={() => {
//                 const evaluationData = assessmentCriterias.map((criteria) => ({
//                     criteria_id: criteria.id,
//                     marks: criteria.marks || 0,
//                 }));
//                 axios.post('http://127.0.0.1:8000/api/fyp/save-evaluation/', evaluationData, {
//                     headers: { Authorization: `Bearer ${authTokens.access}` },
//                 })
//                 .then(() => alert('Evaluation saved successfully!'))
//                 .catch(() => alert('Error saving evaluation.'));
//             }}
//             style={{
//                 marginTop: '20px',
//                 padding: '10px 20px',
//                 backgroundColor: '#007bff',
//                 color: '#fff',
//                 border: 'none',
//                 borderRadius: '4px',
//                 cursor: 'pointer',
//             }}
//         >
//             Save Evaluation
//         </button>
//     </div>
// )}


//                 {evaluations.length > 0 && (
//                     <div>
//                         <h2>Evaluation</h2>
//                         <table>
//                             <thead>
//                                 <tr>
//                                     <th>Group No</th>
//                                     <th>Project Title</th>
//                                     <th>Members</th>
//                                     <th>Marks</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {evaluations.map((evalItem, index) => (
//                                     <tr key={index}>
//                                         <td>{evalItem.group_id}</td>
//                                         <td>{evalItem.project_title}</td>
//                                         <td>
//                                             {evalItem.members.map((member, memberIndex) => (
//                                                 <div key={memberIndex}>
//                                                     {member.student.username} ({member.student.sap_id})
//                                                     <input
//                                                         type="number"
//                                                         min="0"
//                                                         max="100"
//                                                         value={member.marks || ''}
//                                                         onChange={(e) => {
//                                                             const updatedEvaluations = evaluations.map((item, idx) =>
//                                                                 idx === index
//                                                                     ? {
//                                                                         ...item,
//                                                                         members: item.members.map((m, mIdx) =>
//                                                                             mIdx === memberIndex
//                                                                                 ? { ...m, marks: e.target.value }
//                                                                                 : m
//                                                                         ),
//                                                                     }
//                                                                     : item
//                                                             );
//                                                             setEvaluations(updatedEvaluations);
//                                                         }}
//                                                         placeholder="Enter Marks"
//                                                     />
//                                                 </div>
//                                             ))}
//                                         </td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                         <button onClick={saveEvaluations}>Save Evaluations</button>
//                     </div>
//                 )}
//             </div>
//         </Header>
//     );
// };

// export default EvaluationSheet;

//Working wrong Flow:
// import React, { useState, useEffect, useContext } from 'react';
// import axios from 'axios';
// import './panelmembercss.css';
// import Header from '../../components/Header';
// import AuthContext from '../../context/AuthContext.js';
// import styles from '../commonCSS/fypmanagerstyles';

// const EvaluationSheet = () => {
//     const { authTokens } = useContext(AuthContext);

//     const [coursesData, setCoursesData] = useState([]);
//     const [selectedCourse, setSelectedCourse] = useState(null);
//     const [assessmentCriterias, setAssessmentCriterias] = useState([]);
//     const [selectedPhase, setSelectedPhase] = useState('');
//     const [evaluations, setEvaluations] = useState([]);
//     const [upcomingPresentations, setUpcomingPresentations] = useState([]);
//     const [ongoingPresentations, setOngoingPresentations] = useState([]);
//     const [previousPresentations, setPreviousPresentations] = useState([]);

//     useEffect(() => {
//         const fetchPresentations = async () => {
//             try {
//                 const response = await axios.get(
//                     `http://127.0.0.1:8000/api/fyp/view-presentations-user/`,
//                     { headers: { Authorization: `Bearer ${authTokens.access}` } }
//                 );

//                 const currentTime = new Date();
//                 const todayStart = new Date(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate());
//                 const todayEnd = new Date(todayStart);
//                 todayEnd.setDate(todayEnd.getDate() + 1); // Midnight of the next day

//                 console.log("Received Presentations: ", response.data);

//                 // Filter presentations
//                 const upcoming = response.data.filter(
//                     presentation => new Date(presentation.scheduled_time) > currentTime
//                 );

//                 const ongoing = response.data.filter(presentation => {
//                     const scheduledTime = new Date(presentation.scheduled_time);
//                     return (
//                         scheduledTime >= todayStart &&
//                         scheduledTime < todayEnd && // Scheduled today
//                         scheduledTime <= currentTime // Started already
//                     );
//                 });

//                 const previous = response.data.filter(
//                     presentation => new Date(presentation.scheduled_time) < todayStart
//                 );

//                 setUpcomingPresentations(upcoming);
//                 console.log("Ongoing: ", ongoing)
//                 setOngoingPresentations(ongoing);
//                 setPreviousPresentations(previous);
//             } catch (error) {
//                 console.error('Error fetching presentations:', error);
//             }
//         };

//         fetchPresentations();
//     }, []);
//     // const [loading, setLoading] = useState(false);

//     useEffect(() => {
//         // Fetch evaluator-specific courses
//         axios.get('http://127.0.0.1:8000/api/fyp/evaluator-courses/', {
//             headers: { Authorization: `Bearer ${authTokens.access}` },
//         })
//         .then(response => setCoursesData(response.data),

//     )
//         .catch(error => console.error("Error fetching evaluator's courses:", error));
//     }, [authTokens]);
//     console.log('Course details: ', coursesData)
    
//     useEffect(() => {
//         console.log("Selected course before sending: ", selectedCourse)
//         if (selectedCourse && ongoingPresentations.length > 0) {
//             // Assuming each ongoing presentation has a unique course or assessment ID
//             const selectedPresentation = ongoingPresentations.find(presentation => presentation.course.course_id === selectedCourse.course_id);
    
//             if (selectedPresentation) {
//                 console.log("Selected Ongoing Presentation: ", selectedPresentation);
//                 console.log("Sending presentation: ", selectedPresentation.assessment.assessment_id);
    
//                 // Fetch groups and assessment criteria for the selected ongoing presentation
//                 axios.get(`http://127.0.0.1:8000/api/fyp/evaluator-course-details/${selectedCourse.course_id}/${selectedPresentation.assessment.assessment_id}/`, {
//                     headers: { Authorization: `Bearer ${authTokens.access}` },
//                 })
//                 .then(response => {
//                     console.log("phase-Response: ", response.data);
//                     const { groups, criteria } = response.data;
//                     setAssessmentCriterias(criteria);  // Assuming criteria are phase-specific
//                     selectedCourse.groups = groups; // Store groups in selectedCourse
//                 })
//                 .catch(error => console.error("Error fetching groups/criteria:", error));
//             } else {
//                 console.error('No matching ongoing presentation found for the selected course.');
//             }
//         }
//     }, [selectedCourse, ongoingPresentations, authTokens]);
    


//     const handleCourseChange = (e) => {
//         const courseId = e.target.value;
//         const course = coursesData.find(c => c.course_id === parseInt(courseId));
//         console.log("selected course: ", course)
//         setSelectedCourse(course);
//         setSelectedPhase('');
//         setEvaluations([]);
//     };

//     const loadEvaluations = () => {
//         if (!selectedCourse || !selectedCourse.projects || !selectedPhase) {
//             alert("Please select a course, a phase, and ensure projects are available.");
//             return;
//         }
    
//         const evaluationsForPhase = selectedCourse.projects.map(project => ({
//             group_id: project.group_id,
//             project_title: project.project_title,
//             members: project.members.map(member => ({ ...member, marks: '' })),
//         }));
    
//         setEvaluations(evaluationsForPhase);
//     };

//     const saveEvaluations = () => {
//         if (!selectedCourse || !selectedPhase) {
//             alert("No course or evaluation phase selected.");
//             return;
//         }
//         console.log("Selected Phase: ",selectedPhase)

//         const updatedEvaluations = evaluations.map(evalItem => ({
//             course: selectedCourse.course_id, // Ensure course_id exists in selectedCourse
//             phase: selectedPhase, // Ensure selectedPhase is not empty
//             group: evalItem.group_id, // Ensure evalItem.groupNo exists
//             students: evalItem.members.map(member => ({
//                 student: member.student.sap_id, // Ensure member.sapId exists
//                 marks: member.marks || 0, // Ensure marks default to 0 if not provided
//             })),
//         }));
    
//         // Log the payload
//         console.log("Payload to be sent:", JSON.stringify(updatedEvaluations, null, 2));
    
//         axios.post('http://127.0.0.1:8000/api/fyp/save-evaluations/', updatedEvaluations, {
//             headers: {
//                 'Authorization': `Bearer ${authTokens.access}`,
//                 'Content-Type': 'application/json',
//             },
//         })
//         .then(response => {
//             console.log("Evaluations saved successfully:", response.data);
//             alert("Evaluations saved successfully!");
//         })
//         .catch(error => {
//             // console.error("Error saving evaluations:", error.response?.data || error.message);
//             alert("Error saving evaluations. Check console for details.");
//         });
//     };
    
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
//                         <th style={styles.tableHeader}>Feedback</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//     {presentations.map((presentation, index) => {
//         const currentTime = new Date();
//         const isUpcoming = new Date(presentation.scheduled_time) > currentTime;
//         return (
//             <tr
//                 key={index}
//                 style={styles.tableRow}
//                 onClick={() => handleRowClick(presentation)}
//             >
//                 <td style={styles.tableCell}>
//                     {new Date(presentation.scheduled_time).toLocaleString()}
//                 </td>
//                 <td style={styles.tableCell}>
//                     <strong>Project:</strong> {presentation.student_group.project_title}
//                 </td>
//                 <td style={styles.tableCell}>{presentation.room_no}</td>
//                 <td style={styles.tableCell}>
//                     {presentation.panel_members.map((member, idx) => (
//                         <div key={idx}>{member.user.username}</div>
//                     ))}
//                 </td>
//                 <td style={styles.tableCell}>{presentation.feedback}</td>
//             </tr>
//         );
//     })}
// </tbody>
//             </table>
//         </div>
//     );
//     const handleRowClick = async (presentation) => {
//         try {
//             const response = await axios.get(
//                 `http://127.0.0.1:8000/api/fyp/evaluator-course-details/${presentation.course_id}/${presentation.assessment.assessment_id}/`,
//                 { headers: { Authorization: `Bearer ${authTokens.access}` } }
//             );
//             const { groups, criteria } = response.data;
//             // console.log("present")
//             // setSelectedCourse({ ...presentation.course, groups });
//             setAssessmentCriterias(criteria);
//             setSelectedPhase('');
//             setEvaluations([]);
//         } catch (error) {
//             console.error('Error fetching assessment criteria:', error);
//         }
//     };
    
//     return (
//         <Header>
//             <div style={{ padding: '20px', backgroundColor: '#f4f4f4' }}>
//                 <h1>PBL Management System</h1>
//                 <div>
//                     <label htmlFor="course-select">Select Course:</label>
//                     <select id="course-select" onChange={handleCourseChange}>
//                         <option value="">--Select a Course--</option>
//                         {coursesData.map(course => (
//                             <option key={course.course_id} value={course.course_id}>
//                                 {course.course_name} {course.section_name} {course.degree.degree_name} {course.semester.semester_name}
//                             </option>
//                         ))}
//                     </select>
//                 </div>
    
//                 {/* Render Presentation Table */}
//                 {renderPresentationTable(ongoingPresentations, 'Ongoing Presentations')}
    
//                 {/* Render Assessment Criteria and Marks Input */}
//                 {assessmentCriterias.length > 0 && (
//                     <div>
//                         <h2>Assessment Criteria</h2>
//                         <ul>
//                             {assessmentCriterias.map((criteria, index) => (
//                                 <li key={index}>{criteria.name} ({criteria.max_score}%)</li>
//                             ))}
//                         </ul>
//                     </div>
//                 )}
    
//                 {evaluations.length > 0 && (
//                     <div>
//                         <h2>Evaluation</h2>
//                         <table>
//                             <thead>
//                                 <tr>
//                                     <th>Group No</th>
//                                     <th>Project Title</th>
//                                     <th>Members</th>
//                                     <th>Marks</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {evaluations.map((evalItem, index) => (
//                                     <tr key={index}>
//                                         <td>{evalItem.group_id}</td>
//                                         <td>{evalItem.project_title}</td>
//                                         <td>
//                                             {evalItem.members.map((member, memberIndex) => (
//                                                 <div key={memberIndex}>
//                                                     {member.student.username} ({member.student.sap_id})
//                                                     <input
//                                                         type="number"
//                                                         min="0"
//                                                         max="100"
//                                                         value={member.marks || ''}
//                                                         onChange={(e) => {
//                                                             const updatedEvaluations = evaluations.map((item, idx) =>
//                                                                 idx === index
//                                                                     ? {
//                                                                         ...item,
//                                                                         members: item.members.map((m, mIdx) =>
//                                                                             mIdx === memberIndex
//                                                                                 ? { ...m, marks: e.target.value }
//                                                                                 : m
//                                                                         ),
//                                                                     }
//                                                                     : item
//                                                             );
//                                                             setEvaluations(updatedEvaluations);
//                                                         }}
//                                                         placeholder="Enter Marks"
//                                                     />
//                                                 </div>
//                                             ))}
//                                         </td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                         <button onClick={saveEvaluations}>Save Evaluations</button>
//                     </div>
//                 )}
//             </div>
//         </Header>
//     );
    
// };

// export default EvaluationSheet;







// import React, { useState, useEffect, useContext } from 'react';
// import axios from 'axios';
// import './panelmembercss.css';
// import Header from '../../components/Header';
// import AuthContext from '../../context/AuthContext.js';

// const EvaluationSheet = () => {
//     const { authTokens } = useContext(AuthContext);

//     const [coursesData, setCoursesData] = useState([]);
//     const [selectedCourse, setSelectedCourse] = useState(null);
//     const [phases, setPhases] = useState([]);
//     const [selectedPhase, setSelectedPhase] = useState('');
//     const [evaluations, setEvaluations] = useState([]);
//     // const [loading, setLoading] = useState(false);

//     useEffect(() => {
//         // setLoading(true);
//         axios.get('http://127.0.0.1:8000/api/fyp/courses-with-projects/', {
//             headers: {
//                 'Authorization': `Bearer ${authTokens.access}`,
//             },
//         })
//         .then(response => {
//             console.log("Fetched courses: ", response.data)
//             setCoursesData(response.data);
//             // setLoading(false);
//         })
//         .catch(error => {
//             console.error("Error fetching courses:", error);
//             // setLoading(false);
//         });
//     }, [authTokens]);

//     useEffect(() => {
//         if (selectedCourse) {
//             // setLoading(true);
//             axios.get(`http://127.0.0.1:8000/api/fyp/phases/?course=${selectedCourse.course_id}`, {
//                 headers: {
//                     'Authorization': `Bearer ${authTokens.access}`,
//                 },
//             })
//             .then(response => {
//                 console.log("fetched phases: ", response.data)
//                 setPhases(response.data);
//                 // setLoading(false);
//             })
//             .catch(error => {
//                 console.error("Error fetching phases:", error);
//                 // setLoading(false);
//             });
//         }
//     }, [selectedCourse, authTokens]);

//     useEffect(() => {
//         if (selectedCourse) {
//             axios.get(`http://127.0.0.1:8000/api/fyp/${selectedCourse.course_id}/get-projects/`, {
//                 headers: {
//                     'Authorization': `Bearer ${authTokens.access}`,
//                 }
//             })
//             .then(response => {
//                 console.log("group Projects: ", response.data)
//                 selectedCourse.projects = response.data;
//                 setEvaluations([]); 
//             })
//             .catch(error => console.error("Error fetching projects:", error));
//         }
//     }, [selectedCourse, authTokens]);

//     const handleCourseChange = (e) => {
//         const courseId = e.target.value;
//         const course = coursesData.find(c => c.course_id === parseInt(courseId));
//         setSelectedCourse(course);
//         setSelectedPhase('');
//         setEvaluations([]);
//     };

//     const loadEvaluations = () => {
//         if (!selectedCourse || !selectedCourse.projects || !selectedPhase) {
//             alert("Please select a course, a phase, and ensure projects are available.");
//             return;
//         }
    
//         const evaluationsForPhase = selectedCourse.projects.map(project => ({
//             group_id: project.group_id,
//             project_title: project.project_title,
//             members: project.members.map(member => ({ ...member, marks: '' })),
//         }));
    
//         setEvaluations(evaluationsForPhase);
//     };

//     const saveEvaluations = () => {
//         if (!selectedCourse || !selectedPhase) {
//             alert("No course or evaluation phase selected.");
//             return;
//         }
//         console.log("Selected Phase: ",selectedPhase)

//         const updatedEvaluations = evaluations.map(evalItem => ({
//             course: selectedCourse.course_id, // Ensure course_id exists in selectedCourse
//             phase: selectedPhase, // Ensure selectedPhase is not empty
//             group: evalItem.group_id, // Ensure evalItem.groupNo exists
//             students: evalItem.members.map(member => ({
//                 student: member.student.sap_id, // Ensure member.sapId exists
//                 marks: member.marks || 0, // Ensure marks default to 0 if not provided
//             })),
//         }));
    
//         // Log the payload
//         console.log("Payload to be sent:", JSON.stringify(updatedEvaluations, null, 2));
    
//         axios.post('http://127.0.0.1:8000/api/fyp/save-evaluations/', updatedEvaluations, {
//             headers: {
//                 'Authorization': `Bearer ${authTokens.access}`,
//                 'Content-Type': 'application/json',
//             },
//         })
//         .then(response => {
//             console.log("Evaluations saved successfully:", response.data);
//             alert("Evaluations saved successfully!");
//         })
//         .catch(error => {
//             // console.error("Error saving evaluations:", error.response?.data || error.message);
//             alert("Error saving evaluations. Check console for details.");
//         });
//     };
    
    

//     return (
//         <Header>
//             <div style={{ padding: '20px', backgroundColor: '#f4f4f4' }}>
//                 <h1>PBL Management System</h1>
//                     <div>
//                         <label htmlFor="course-select">Select Course:</label>
//                         <select id="course-select" onChange={handleCourseChange}>
//                             <option value="">--Select a Course--</option>
//                             {coursesData.map(course => (
//                                 <option key={course.course_id} value={course.course_id}>
//                                     {course.course_name} {course.section_name} {course.degree.degree_name} {course.semester.semester_name}
                                    
//                                 </option>
                                
//                             ))}
//                         </select>

//                         {selectedCourse && (
//                             <div>
//                                 <label htmlFor="phase-select">Select Phase:</label>
//                                 <select id="phase-select" onChange={e => setSelectedPhase(e.target.value)}>
//                                     <option value="">--Select a Phase--</option>
//                                     {phases.map((phase, index) => (
//                                         <option key={index} value={phase.id}>
//                                             {phase.name}
//                                         </option>
//                                     ))}
//                                 </select>

//                                 <button onClick={loadEvaluations}>Load Evaluation</button>

//                                 <div>
//                                     <h2>Evaluation</h2>
//                                     <table>
//                                         <thead>
//                                             <tr>
//                                                 <th>Group No</th>
//                                                 <th>Project Title</th>
//                                                 <th>Members</th>
//                                                 <th>/10</th>
//                                             </tr>
//                                         </thead>
//                                         <tbody>
//                                             {evaluations.map((evalItem, index) => (
//                                                 <tr key={index}>
//                                                     <td>{evalItem.group_id}</td>
//                                                     <td>{evalItem.project_title}</td>
//                                                     <td>
//                                                         {evalItem.members.map((member, memberIndex) => (
//                                                             console.log('evaluations: ', evaluations),
//                                                             <div key={memberIndex}>
//                                                                 {member.student.username} {member.student.sap_id}
//                                                                 <input
//                                                                     type="number"
//                                                                     min="0"
//                                                                     max="100"
//                                                                     value={member.marks || ''}
//                                                                     onChange={e => {
//                                                                         const updatedEvaluations = evaluations.map((item, idx) =>
//                                                                             idx === index
//                                                                                 ? {
//                                                                                     ...item,
//                                                                                     members: item.members.map((m, mIdx) =>
//                                                                                         mIdx === memberIndex
//                                                                                             ? { ...m, marks: e.target.value }
//                                                                                             : m
//                                                                                     ),
//                                                                                 }
//                                                                                 : item
//                                                                         );
//                                                                         setEvaluations(updatedEvaluations);
//                                                                     }}
//                                                                     placeholder="Enter Marks"
//                                                                 />
//                                                             </div>
//                                                         ))}
//                                                     </td>
//                                                 </tr>
//                                             ))}
//                                         </tbody>
//                                     </table>
//                                     <button onClick={saveEvaluations}>Save Evaluations</button>
//                                 </div>
//                             </div>
//                         )}
//                     </div>
                
//             </div>
//         </Header>
//     );
// };

// export default EvaluationSheet;
