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
    // const renderPresentationTable = (presentations, title) => {
    //     return (
    //         <div style={styles.container}>
    //             <h2>{title}</h2>
    //             <table style={styles.table}>
    //                 <thead>
    //                     <tr style={styles.tableHeaderRow}>
    //                         <th style={styles.tableHeader}>Scheduled Time</th>
    //                         <th style={styles.tableHeader}>Course</th>
    //                         <th style={styles.tableHeader}>Student Group</th>
    //                     </tr>
    //                 </thead>
    //                 <tbody>
    //                     {presentations.map((presentation, index) => {
    //                         const isSelected = presentation.id === selectedPresentationId;
    //                         return (
    //                             <React.Fragment key={index}>
    //                                 <tr
    //                                     style={{
    //                                         ...styles.tableHeaderRow,
    //                                         backgroundColor: isSelected ? '#cce5ff' : 'transparent',
    //                                         cursor: 'pointer',
    //                                     }}
    //                                     onClick={() => handleRowClick(presentation)}
    //                                 >
    //                                     <td style={styles.tableCell}>
    //                                         {new Date(presentation.scheduled_time).toLocaleString()}
    //                                     </td>
    //                                     <td style={styles.tableCell}>{presentation.course.course_name}</td>
    //                                     <td style={styles.tableCell}>
    //                                         <strong>Project:</strong> {presentation.student_group.project_title}
    //                                     </td>
 
    //                                 </tr>
    //                                 {isSelected && (
    //                                     <tr>
    //                                         <td colSpan={9}>
    //                                             <div
    //                                                 style={{
    //                                                     padding: '20px',
    //                                                     backgroundColor: '#f9f9f9',
    //                                                     borderRadius: '8px',
    //                                                 }}
    //                                             >
    //                                                 <h2
    //                                                     style={{
    //                                                         textAlign: 'center',
    //                                                         marginBottom: '20px',
    //                                                         color: '#333',
    //                                                     }}
    //                                                 >
    //                                                     Evaluate Student
    //                                                 </h2>
    //                                                 {/* Shared Group Feedback Dropdown */}
    //                                                 <div>
    //                                                     <div
    //                                                         style={{
    //                                                             marginBottom: '15px',
    //                                                             border: '1px solid #ddd',
    //                                                             borderRadius: '8px',
    //                                                             overflow: 'hidden',
    //                                                             boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    //                                                         }}
    //                                                     >
    //                                                         <div
    //                                                             style={{
    //                                                                 padding: '15px 20px',
    //                                                                 width: '100%',
    //                                                                 backgroundColor: '#007bff',
    //                                                                 color: '#fff',
    //                                                                 cursor: 'pointer',
    //                                                                 justifyContent: 'space-between',
    //                                                                 alignItems: 'center',
    //                                                             }}
    //                                                             onClick={() => toggleAccordion('group')}
    //                                                         >
    //                                                             <div
    //                                                                 style={{
    //                                                                     display: 'flex',
    //                                                                     justifyContent: 'center',
    //                                                                     alignItems: 'center',
    //                                                                     height: '100%',
    //                                                                 }}
    //                                                             >
    //                                                                 <div style={{ textAlign: 'center' }}>
    //                                                                     <p style={{ margin: 0, fontSize: '24px' }}>
    //                                                                         Group: {presentation.student_group.project_title}
    //                                                                     </p>
    //                                                                 </div>
    //                                                             </div>
    //                                                             <span style={{ fontSize: '20px' }}>
    //                                                                 {accordionOpen['group'] ? '-' : '+'}
    //                                                             </span>
    //                                                         </div>
    //                                                         {accordionOpen['group'] && (
    //                                                             <div style={{ padding: '15px 20px', backgroundColor: '#fff' }}>
    //                                                                 <table style={{ width: '100%', borderCollapse: 'collapse' }}>
    //                                                                     <thead>
    //                                                                         <tr style={{ backgroundColor: '#f2f2f2' }}>
    //                                                                             <th style={tableHeaderStyle}>Criteria</th>
    //                                                                             <th style={tableHeaderStyle}>Max Score</th>
    //                                                                             <th style={tableHeaderStyle}>Marks</th>
    //                                                                         </tr>
    //                                                                     </thead>
    //                                                                     <tbody>
    //                                                                         {assessmentCriterias.map((criteria, criteriaIdx) => (
    //                                                                             <tr key={criteriaIdx}>
    //                                                                                 <td style={tableCellStyle}>{criteria.name}</td>
    //                                                                                 <td style={tableCellStyle}>
    //                                                                                     {criteria.max_score}
    //                                                                                 </td>
    //                                                                                 <td style={tableCellStyle}>
    //                                                                                     {presentation.student_group.members.map((student, idx) => (
    //                                                                                         <div key={idx} style={{ marginBottom: '10px' }}>
    //                                                                                             <p style={{ margin: '0', fontSize: '18px' }}>
    //                                                                                                 {student.student.username} - {student.student.sap_id}
    //                                                                                             </p>
    //                                                                                             <input
    //                                                                                                 type="number"
    //                                                                                                 min="0"
    //                                                                                                 max={criteria.max_score}
    //                                                                                                 value={evaluations[student.id]?.[criteria.id] || ''}
    //                                                                                                 onChange={(e) => {
    //                                                                                                     setEvaluations((prev) => ({
    //                                                                                                         ...prev,
    //                                                                                                         [student.id]: {
    //                                                                                                             ...prev[student.id],
    //                                                                                                             [criteria.id]: e.target.value,
    //                                                                                                         },
    //                                                                                                     }));
    //                                                                                                 }}
    //                                                                                                 placeholder="Enter Marks"
    //                                                                                                 style={{
    //                                                                                                     width: '80px',
    //                                                                                                     padding: '5px',
    //                                                                                                     border: '1px solid #ccc',
    //                                                                                                     borderRadius: '4px',
    //                                                                                                 }}
    //                                                                                             />
    //                                                                                         </div>
    //                                                                                     ))}
    //                                                                                 </td>
    //                                                                             </tr>
    //                                                                         ))}
    //                                                                     </tbody>
    //                                                                 </table>
    //                                                             </div>
    //                                                         )}
    //                                                     </div>
    //                                                 </div>
    
    //                                                 {/* Group Feedback Field */}
    //                                                 <div style={{ marginBottom: '15px' }}>
    //                                                     <label
    //                                                         style={{
    //                                                             fontSize: '16px',
    //                                                             marginBottom: '5px',
    //                                                             display: 'block',
    //                                                         }}
    //                                                     >
    //                                                         Group Feedback
    //                                                     </label>
    //                                                     <textarea
    //                                                         rows="4"
    //                                                         value={groupFeedback}
    //                                                         onChange={(e) => setGroupFeedback(e.target.value)}
    //                                                         placeholder="Provide feedback for the entire group"
    //                                                         style={{
    //                                                             width: '100%',
    //                                                             padding: '10px',
    //                                                             border: '1px solid #ccc',
    //                                                             borderRadius: '4px',
    //                                                         }}
    //                                                     />
    //                                                 </div>
    
    //                                                 {/* Save Evaluation Button */}
    //                                                 <button
    //                                                     onClick={() => {
    //                                                         const evaluationData = presentation.student_group.members.map(
    //                                                             (student) => ({
    //                                                                 sap_id: student.student.sap_id,
    //                                                                 marks: Object.entries(
    //                                                                     evaluations[student.id] || {}
    //                                                                 ).map(([criteriaId, marks]) => ({
    //                                                                     criteria_id: criteriaId,
    //                                                                     marks,
    //                                                                 })),
    //                                                             })
    //                                                         );
    
    //                                                         const dataToSend = {
    //                                                             evaluations: evaluationData,
    //                                                             group_feedback: groupFeedback,
    //                                                         };
    
    //                                                         console.log('Sending evaluations: ', dataToSend);
    //                                                         axios.post(
    //                                                             'http://127.0.0.1:8000/api/fyp/save-evaluation/',
    //                                                             dataToSend,
    //                                                             {
    //                                                                 headers: {
    //                                                                     Authorization: `Bearer ${authTokens.access}`,
    //                                                                 },
    //                                                             }
    //                                                         )
    //                                                             .then(() => alert('Evaluation saved successfully!'))
    //                                                             .catch(() => alert('Error saving evaluation.'));
    //                                                     }}
    //                                                     style={{
    //                                                         marginTop: '20px',
    //                                                         padding: '10px 20px',
    //                                                         backgroundColor: '#28a745',
    //                                                         color: '#fff',
    //                                                         border: 'none',
    //                                                         borderRadius: '4px',
    //                                                         cursor: 'pointer',
    //                                                         display: 'block',
    //                                                         width: '100%',
    //                                                     }}
    //                                                 >
    //                                                     Save Evaluation
    //                                                 </button>
    //                                             </div>
    //                                         </td>
    //                                     </tr>
    //                                 )}
    //                             </React.Fragment>
    //                         );
    //                     })}
    //                 </tbody>
    //             </table>
    //         </div>
    //     );
    // };
    
    const renderPresentationTable = (presentations, title) => {
        return (
            <div style={styles.container}>
                <h2>{title}</h2>
                <table style={styles.table}>
                    <thead>
                        <tr style={styles.tableHeaderRow}>
                            <th style={styles.tableHeader}>Scheduled Time</th>
                            <th style={styles.tableHeader}>Course</th>
                            <th style={styles.tableHeader}>Student Group</th>
                            <th style={styles.tableHeader}>Action</th>
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
                                        }}
                                    >
                                        <td style={styles.tableCell}>
                                            {new Date(presentation.scheduled_time).toLocaleString()}
                                        </td>
                                        <td style={styles.tableCell}>{presentation.course.course_name}</td>
                                        <td style={styles.tableCell}>
                                            <strong>Project:</strong> {presentation.student_group.project_title}
                                        </td>
                                        <td style={styles.tableCell}>
                                            <button
                                                onClick={() => handleRowClick(presentation)}
                                                style={{
                                                    padding: '8px 16px',
                                                    backgroundColor: '#007bff',
                                                    color: '#fff',
                                                    border: 'none',
                                                    borderRadius: '4px',
                                                    cursor: 'pointer',
                                                }}
                                            >
                                                Evaluate
                                            </button>
                                        </td>
                                    </tr>
                                    {isSelected && (
                                        <tr>
                                            <td colSpan={4}>
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
                                                        {/* Accordion code here */}
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
