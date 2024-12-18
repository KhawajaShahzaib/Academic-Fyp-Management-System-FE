// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Header from "../../components/Header";
// import styles from '../commonCSS/fypmanagerstyles';

// const dummyData = {
//     groups: [
//         {
//             id: 1,
//             projectName: 'AI-Powered Chatbot',
//             supervisor: 'Dr. Smith',
//             members: [
//                 { name: 'Alice', sapId: '1001' },
//                 { name: 'Bob', sapId: '1002' },
//                 { name: 'Charlie', sapId: '1003' }
//             ]
//         },
//         // Add other groups as needed
//     ],
//     projects: [
//         { id: 1, title: 'AI for Healthcare' },
//         { id: 2, title: 'E-commerce System' },
//         { id: 3, title: 'IoT Smart Home' },
//     ],
//     teachers: [
//         { id: 1, name: 'Dr. Smith' },
//         { id: 2, name: 'Prof. Allen' },
//     ],
//     rooms: [
//         { id: 1, room_no: 'Room 101' },
//         { id: 2, room_no: 'Room 202' },
//     ],
//     panelMembers: [
//         { id: 1, name: 'Mr. Brown', expertise: 'AI' },
//         { id: 2, name: 'Ms. Green', expertise: 'E-commerce' },
//         { id: 3, name: 'Dr. White', expertise: 'IoT' },
//     ],
//     assessments: [
//         { id: 1, name: 'Midterm Assessment' },
//         { id: 2, name: 'Final Assessment' }
//     ]
// };

// const BatchPage = () => {
//     const navigate = useNavigate();
//     const [selectedCourse, setSelectedCourse] = useState('');
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [presentation, setPresentation] = useState({
//         title: '',
//         scheduled_time: '',
//         student_group: '',
//         room_no: '',
//         panel_members: [],
//         teacher: '',
//         assessment: ''
//     });

//     const handleSchedulePresentation = (groupId) => {
//         setPresentation({ ...presentation, student_group: groupId });
//         setIsModalOpen(true);
//     };

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setPresentation(prev => ({ ...prev, [name]: value }));
//     };

//     const handleExpertiseChange = (e) => {
//         const expertise = e.target.value;
//         setPresentation(prev => ({
//             ...prev,
//             panel_members: dummyData.panelMembers
//                 .filter(member => member.expertise === expertise)
//                 .map(member => member.name)
//         }));
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         alert('Presentation scheduled successfully!');
//         setPresentation({
//             title: '',
//             scheduled_time: '',
//             student_group: '',
//             room_no: '',
//             panel_members: [],
//             teacher: '',
//             assessment: ''
//         });
//         setIsModalOpen(false);
//     };

//     return (
//         <Header>
//             <div style={styles.container}>
//                 <h1>FYP Project List</h1>

//                 <div style={{ marginBottom: '20px' }}>
//                     <label style={styles.label}>Select Course: </label>
//                     <select
//                         value={selectedCourse}
//                         onChange={(e) => setSelectedCourse(e.target.value)}
//                         style={styles.dropdown}
//                     >
//                         <option value="">-- Select a Course --</option>
//                         <option value="AI">Artificial Intelligence</option>
//                         <option value="Blockchain">Blockchain Technology</option>
//                         <option value="Web Development">Web Development</option>
//                     </select>
//                 </div>

//                 <button
//                     style={styles.createAssessmentButton}
//                     onClick={() => navigate('/external-assessmentpage')}
//                 >
//                     Create Assessment
//                 </button>

//                 {dummyData.groups.length > 0 ? (
//                     <table style={styles.table}>
//                         <thead>
//                             <tr style={styles.tableHeaderRow}>
//                                 <th style={styles.tableHeader}>Group No</th>
//                                 <th style={styles.tableHeader}>Project Title</th>
//                                 <th style={styles.tableHeader}>Supervisor</th>
//                                 <th style={styles.tableHeader}>Group Members</th>
//                                 <th style={styles.tableHeader}>SAP IDs</th>
//                                 <th style={styles.tableHeader}>Actions</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {dummyData.groups.map((group, index) => (
//                                 <tr key={group.id} style={styles.tableRow}>
//                                     <td style={styles.tableCell}>{index + 1}</td>
//                                     <td style={styles.tableCell}>{group.projectName}</td>
//                                     <td style={styles.tableCell}>{group.supervisor}</td>
//                                     <td style={styles.tableCell}>
//                                         {group.members.map((member, i) => (
//                                             <div key={i}>{member.name}</div>
//                                         ))}
//                                     </td>
//                                     <td style={styles.tableCell}>
//                                         {group.members.map((member, i) => (
//                                             <div key={i}>{member.sapId}</div>
//                                         ))}
//                                     </td>
//                                     <td style={styles.tableCell}>
//                                         <button
//                                             onClick={() => handleSchedulePresentation(group.id)}
//                                             style={styles.actionButton}
//                                         >
//                                             Schedule
//                                         </button>
//                                         <button
//                                             onClick={() => handleSchedulePresentation(group.id)}
//                                             style={styles.actionButton}
//                                         >
//                                             Edit
//                                         </button>
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 ) : (
//                     <p>No groups found for this course.</p>
//                 )}

//                 {isModalOpen && (
//                     <div className="modal" style={styles.modal}>
//                         <div className="modal-content" style={styles.modalContent}>
//                             <span className="close" onClick={() => setIsModalOpen(false)}>&times;</span>
//                             <h2>Schedule Presentation</h2>
//                             <form onSubmit={handleSubmit}>
//                                 <select
//                                     name="assessment"
//                                     value={presentation.assessment}
//                                     onChange={handleChange}
//                                     style={styles.input}
//                                     required
//                                 >
//                                     <option value="">Select Assessment</option>
//                                     {dummyData.assessments.map(assessment => (
//                                         <option key={assessment.id} value={assessment.name}>{assessment.name}</option>
//                                     ))}
//                                 </select>

//                                 <input
//                                     type="datetime-local"
//                                     name="scheduled_time"
//                                     value={presentation.scheduled_time}
//                                     onChange={handleChange}
//                                     style={styles.input}
//                                     required
//                                 />

//                                 <select
//                                     name="room_no"
//                                     value={presentation.room_no}
//                                     onChange={handleChange}
//                                     style={styles.input}
//                                     required
//                                 >
//                                     <option value="">Select Room</option>
//                                     {dummyData.rooms.map(room => (
//                                         <option key={room.id} value={room.room_no}>{room.room_no}</option>
//                                     ))}
//                                 </select>

//                                 <select
//                                     name="teacher"
//                                     value={presentation.teacher}
//                                     onChange={handleChange}
//                                     style={styles.input}
//                                     required
//                                 >
//                                     <option value="">Select Teacher</option>
//                                     {dummyData.teachers.map(teacher => (
//                                         <option key={teacher.id} value={teacher.name}>{teacher.name}</option>
//                                     ))}
//                                 </select>

//                                 <select
//                                     onChange={handleExpertiseChange}
//                                     style={styles.input}
//                                     required
//                                 >
//                                     <option value="">Select Panel Member Expertise</option>
//                                     <option value="AI">AI</option>
//                                     <option value="E-commerce">E-commerce</option>
//                                     <option value="IoT">IoT</option>
//                                 </select>

//                                 <button type="submit" style={styles.submitButton}>
//                                     Schedule
//                                 </button>
//                             </form>
//                         </div>
//                     </div>
//                 )}
//             </div>
//         </Header>
//     );
// };

// export default BatchPage;
//Working
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios for API requests
import Header from "../../components/Header";
import styles from '../commonCSS/fypmanagerstyles';
import AuthContext from '../../context/AuthContext';
const dummyData = {
    groups: [
        {
            id: 1,
            projectName: 'AI-Powered Chatbot',
            supervisor: 'Dr. Smith',
            members: [
                { name: 'Alice', sapId: '1001' },
                { name: 'Bob', sapId: '1002' },
                { name: 'Charlie', sapId: '1003' }
            ]
        },
        // Add other groups as needed
    ],
    projects: [
        { id: 1, title: 'AI for Healthcare' },
        { id: 2, title: 'E-commerce System' },
        { id: 3, title: 'IoT Smart Home' },
    ],
    teachers: [
        { id: 1, name: 'Dr. Smith' },
        { id: 2, name: 'Prof. Allen' },
    ],
    rooms: [
        { id: 1, room_no: 'Room 101' },
        { id: 2, room_no: 'Room 202' },
    ],
    panelMembers: [
        { id: 1, name: 'Mr. Brown', expertise: 'AI' },
        { id: 2, name: 'Ms. Green', expertise: 'E-commerce' },
        { id: 3, name: 'Dr. White', expertise: 'IoT' },
    ],
    assessments: [
        { id: 1, name: 'Midterm Assessment' },
        { id: 2, name: 'Final Assessment' }
    ]
};
const BatchPage = () => {
    const navigate = useNavigate();
    const { authTokens } = useContext(AuthContext);

    const [selectedCourse, setSelectedCourse] = useState('');
    const [courses, setCourses] = useState([]);
    const [groups, setGroups] = useState([]);
    const [assessments, setAssessments] = useState([]);
    const [presentation, setPresentation] = useState({
        title: '',
        scheduled_time: '',
        student_group: '',
        room_no: '',
        panel_members: [],
        teacher: '',
        assessment: ''
    });
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        // Fetch courses assigned to the logged-in user
        const fetchCourses = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/fyp/courses/', {
                    headers: { Authorization: `Bearer ${authTokens.access}` }
                });
                setCourses(response.data); // Set courses assigned to the user
            } catch (error) {
                console.error("Error fetching courses:", error);
            }
        };

        fetchCourses();
    }, []);

    useEffect(() => {
        if (selectedCourse) {
            // Fetch groups and assessments for the selected course
            const fetchGroupsAndAssessments = async () => {
                try {
                    console.log("Selected course: ", selectedCourse)
                    const [groupsResponse, assessmentsResponse] = await Promise.all([
                        axios.get(`http://127.0.0.1:8000/api/fyp/${selectedCourse}/get-fyp-groups`, {
                            headers: { Authorization: `Bearer ${authTokens.access}` }
                        }),
                        axios.get(`http://127.0.0.1:8000/api/fyp/assessments/?course_id=${selectedCourse}`, {
                            headers: { Authorization: `Bearer ${authTokens.access}` }
                        })
                    ]);
                    setGroups(groupsResponse.data);
                    setAssessments(assessmentsResponse.data);
                    console.log("Assessment response: ", assessmentsResponse.data)
                    console.log("Groups Response: ", groupsResponse.data)
                } catch (error) {
                    console.error("Error fetching groups or assessments:", error);
                }
            };

            fetchGroupsAndAssessments();
        }
    }, [selectedCourse]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPresentation(prev => ({ ...prev, [name]: value }));
    };

    const handleExpertiseChange = (e) => {
        const expertise = e.target.value;
        setPresentation(prev => ({
            ...prev,
            panel_members: dummyData.panelMembers
                .filter(member => member.expertise === expertise)
                .map(member => member.name)
        }));
    };

    const handleSchedulePresentation = (groupId) => {
        setPresentation({ ...presentation, student_group: groupId });
        setIsModalOpen(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Presentation scheduled successfully!');
        setPresentation({
            title: '',
            scheduled_time: '',
            student_group: '',
            room_no: '',
            panel_members: [],
            teacher: '',
            assessment: ''
        });
        setIsModalOpen(false);
    };

    return (
        <Header>
            <div style={styles.container}>
                <h1>FYP Project List</h1>

                <div style={{ marginBottom: '20px' }}>
                    <label style={styles.label}>Select Course: </label>
                    <select
                        value={selectedCourse}
                        onChange={(e) => setSelectedCourse(e.target.value)}
                        style={styles.dropdown}
                    >
                        <option value="">-- Select a Course --</option>
                        {courses.map(course => (
                            <option key={course.id} value={course.course_id}>{course.course_name}</option>
                        ))}
                    </select>
                </div>

                {groups.length > 0 && selectedCourse && (
                    <table style={styles.table}>
                        <thead>
                            <tr style={styles.tableHeaderRow}>
                                <th style={styles.tableHeader}>Group No</th>
                                <th style={styles.tableHeader}>Project Title</th>
                                <th style={styles.tableHeader}>Supervisor</th>
                                <th style={styles.tableHeader}>Group Members</th>
                                <th style={styles.tableHeader}>SAP IDs</th>
                                <th style={styles.tableHeader}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {groups.map((group, index) => (
                                <tr key={group.id} style={styles.tableRow}>
                                    <td style={styles.tableCell}>{index + 1}</td>
                                    <td style={styles.tableCell}>{group.projectName}</td>
                                    <td style={styles.tableCell}>{group.supervisor}</td>
                                    <td style={styles.tableCell}>
                                        {group.members.map((member, i) => (
                                            <div key={i}>{member.name}</div>
                                        ))}
                                    </td>
                                    <td style={styles.tableCell}>
                                        {group.members.map((member, i) => (
                                            <div key={i}>{member.sapId}</div>
                                        ))}
                                    </td>
                                    <td style={styles.tableCell}>
                                        <button
                                            onClick={() => handleSchedulePresentation(group.id)}
                                            style={styles.actionButton}
                                        >
                                            Schedule
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}

                {isModalOpen && (
                    <div className="modal" style={styles.modal}>
                        <div className="modal-content" style={styles.modalContent}>
                            <span className="close" onClick={() => setIsModalOpen(false)}>&times;</span>
                            <h2>Schedule Presentation</h2>
                            <form onSubmit={handleSubmit}>
                                <select
                                    name="assessment"
                                    value={presentation.assessment}
                                    onChange={handleChange}
                                    style={styles.input}
                                    required
                                >
                                    <option value="">Select Assessment</option>
                                    {assessments.map(assessment => (
                                        <option key={assessment.id} value={assessment.name}>{assessment.name}</option>
                                    ))}
                                </select>

                                <input
                                    type="datetime-local"
                                    name="scheduled_time"
                                    value={presentation.scheduled_time}
                                    onChange={handleChange}
                                    style={styles.input}
                                    required
                                />

                                <select
                                    name="room_no"
                                    value={presentation.room_no}
                                    onChange={handleChange}
                                    style={styles.input}
                                    required
                                >
                                    <option value="">Select Room</option>
                                    {dummyData.rooms.map(room => (
                                        <option key={room.id} value={room.room_no}>{room.room_no}</option>
                                    ))}
                                </select>

                                <select
                                    name="teacher"
                                    value={presentation.teacher}
                                    onChange={handleChange}
                                    style={styles.input}
                                    required
                                >
                                    <option value="">Select Teacher</option>
                                    {dummyData.teachers.map(teacher => (
                                        <option key={teacher.id} value={teacher.name}>{teacher.name}</option>
                                    ))}
                                </select>

                                <select
                                    onChange={handleExpertiseChange}
                                    style={styles.input}
                                    required
                                >
                                    <option value="">Select Panel Member Expertise</option>
                                    <option value="AI">AI</option>
                                    <option value="E-commerce">E-commerce</option>
                                    <option value="IoT">IoT</option>
                                </select>

                                <button type="submit" style={styles.submitButton}>
                                    Schedule
                                </button>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </Header>
    );
};

export default BatchPage;

