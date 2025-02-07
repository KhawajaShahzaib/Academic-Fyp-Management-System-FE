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
    const [selectedPresentationId, setSelectedPresentationId] = useState(null); 
    const [groupFeedback, setGroupFeedback] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility state
    const [selectedPresentation, setSelectedPresentation] = useState(null);

    // Toggle Modal visibility
    const toggleModal = () => setIsModalOpen(prev => !prev);

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
        setSelectedPresentationId(presentation.id);
        setSelectedPresentation(presentation);
        try {
            const response = await axios.get(
                `http://127.0.0.1:8000/api/fyp/evaluator-course-details/${presentation.course.course_id}/${presentation.assessment.assessment_id}/`,
                { headers: { Authorization: `Bearer ${authTokens.access}` } }
            );
            const { groups, criteria } = response.data;
            setAssessmentCriterias(criteria);
            console.log('Fetched Criterias: ', response.data)
            setSelectedPhase('');
            setSelectedCourse(presentation.course);
            setEvaluations([]);
        } catch (error) {
            console.error('Error fetching assessment criteria:', error);
        }
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
                            <th style={styles.tableHeader}>Student Group</th>
                            <th style={styles.tableHeader}>Action</th> {/* New column for the Evaluate button */}
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
                                        <td style={styles.tableCell}>
                                            <strong>Project:</strong> {presentation.student_group.project_title}
                                        </td>
                                        <td style={styles.tableCell}>
                                            <button 
                                                onClick={() => { 
                                                    handleRowClick(presentation); 
                                                    toggleModal(); 
                                                }}
                                                style={{
                                                    backgroundColor: '#007bff',
                                                    color: '#fff',
                                                    padding: '5px 10px',
                                                    border: 'none',
                                                    borderRadius: '4px',
                                                    cursor: 'pointer',
                                                }}
                                            >
                                                Evaluate
                                            </button>
                                        </td>
                                    </tr>
                                </React.Fragment>
                            );
                        })}
                    </tbody>
                </table>

                {/* Modal for evaluation */}
                {isModalOpen && (
    <div style={modalStyles.overlay}>
        <div style={modalStyles.modalContent}>
            <h2>{selectedPresentation?.student_group.project_title}</h2>
            {/* Scrollable content container */}
            <div
                style={{
                    maxHeight: '70vh', // Adjust the height limit as needed
                    overflowY: 'auto',
                    padding: '0 15px',
                    boxSizing: 'border-box',
                }}
            >
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
                            fontSize: '24px',
                        }}
                    />
                </div>

                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ backgroundColor: '#f2f2f2' }}>
                            <th style={styles.tableHeader}>Criteria</th>
                            <th style={styles.tableHeader}>Max Score</th>
                            <th style={styles.tableHeader}>Marks</th>
                        </tr>
                    </thead>
                    <tbody>
                        {assessmentCriterias.map((criteria, criteriaIdx) => (
                            <tr key={criteriaIdx}>
                                <td style={styles.tableCell}>{criteria.name}</td>
                                <td style={styles.tableCell}>{criteria.max_score}</td>
                                <td style={styles.tableCell}>
                                    {selectedPresentation?.student_group.members.map((student, idx) => (
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

            {/* Save Evaluation Button */}
            <button
                onClick={() => {
                    const evaluationData = selectedPresentation?.student_group.members.map(
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
                    {console.log('dataToSend: ', dataToSend)}
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
                    toggleModal(); // Close the modal after saving
                }}
                style={{
                    marginTop: '20px',
                    padding: '10px 20px',
                    backgroundColor: '#28a745',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                }}
            >
                Save Evaluation
            </button>

            <button
                onClick={toggleModal}
                style={{
                    marginTop: '20px',
                    padding: '10px 20px',
                    backgroundColor: '#dc3545',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                }}
            >
                Close
            </button>
        </div>
    </div>
)}

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

// Styles for the modal

const modalStyles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '8px',
        width: '60%',
        maxWidth: '70%',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    },
};

export default EvaluationSheet;
