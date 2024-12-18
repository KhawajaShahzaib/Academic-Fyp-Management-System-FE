// import React, { useState } from 'react';
// import axios from 'axios';
// import styles from '../commonCSS/supervisorStyles.js';
// import Header from '../../components/Header'; // Ensure you have a header component

// const SchedulePresentation = () => {
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [presentation, setPresentation] = useState({
//         title: '',
//         scheduled_time: '',
//         batch: '',
//         student_group: '', // New field for project group name
//         panel_members: [], // Array to store selected panel members' IDs
//         room_no: '', // New field for room number
//     });

//     const handleChange = (e) => {
//         setPresentation({ ...presentation, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         axios.post('/api/presentations/', presentation)
//             .then(response => {
//                 alert('Presentation scheduled successfully!');
//                 setPresentation({
//                     title: '',
//                     scheduled_time: '',
//                     batch: '',
//                     student_group: '',
//                     panel_members: [],
//                     room_no: '',
//                 });
//                 setIsModalOpen(false); // Close the modal after successful submission
//             })
//             .catch(error => {
//                 console.error('Error scheduling presentation:', error);
//             });
//     };

//     return (
//         <Header>
//             <section style={styles.section}>
//                 <h2 style={styles.sectionHeader}>Schedule Presentation</h2>
//                 <button onClick={() => setIsModalOpen(true)} style={styles.button}>
//                     Schedule New Presentation
//                 </button>

//                 {/* Modal for scheduling presentation */}
//                 {isModalOpen && (
//                     <div className="modal" style={styles.modal}>
//                         <div className="modal-content" style={styles.modalContent}>
//                             <span className="close" onClick={() => setIsModalOpen(false)}>&times;</span>
//                             <h2>Schedule Presentation</h2>
//                             <form onSubmit={handleSubmit}>
//                                 <input
//                                     name="title"
//                                     value={presentation.title}
//                                     onChange={handleChange}
//                                     placeholder="Title"
//                                     style={styles.input}
//                                     required
//                                 />
//                                 <input
//                                     type="datetime-local"
//                                     name="scheduled_time"
//                                     value={presentation.scheduled_time}
//                                     onChange={handleChange}
//                                     style={styles.input}
//                                     required
//                                 />
//                                 <select
//                                     style={styles.input}
//                                     name="batch"
//                                     value={presentation.batch}
//                                     onChange={handleChange}
//                                     required
//                                 >
//                                     <option value="">Select Batch</option>
//                                     <option value="Bachelor's">Batch Fall 2021</option>
//                                     <option value="Master's">Batch Spring 2021</option>
//                                 </select>
//                                 <input
//                                     name="student_group"
//                                     value={presentation.student_group}
//                                     onChange={handleChange}
//                                     placeholder="Project Group Name"
//                                     style={styles.input}
//                                     required
//                                 />
//                                 <input
//                                     name="room_no"
//                                     value={presentation.room_no}
//                                     onChange={handleChange}
//                                     placeholder="Room Number"
//                                     style={styles.input}
//                                     required
//                                 />
//                                 {/* Add a selection for panel members here if needed */}
//                                 <button type="submit" style={styles.button}>Schedule Presentation</button>
//                             </form>
//                         </div>
//                     </div>
//                 )}
//             </section>
//         </Header>
//     );
// };

// export default SchedulePresentation;



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import styles from '../commonCSS/supervisorStyles.js';
// import Header from '../../components/Header';

// const SchedulePresentation = () => {
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [projects, setProjects] = useState([]);
//     const [teachers, setTeachers] = useState([]);
//     const [rooms, setRooms] = useState([]);
//     const [panelMembers, setPanelMembers] = useState([]);
//     const [filteredPanelMembers, setFilteredPanelMembers] = useState([]);
//     const [expertise, setExpertise] = useState('');

//     const [presentation, setPresentation] = useState({
//         title: '',
//         scheduled_time: '',
//         student_group: '',
//         room_no: '',
//         panel_members: [],
//         teacher: '',
//     });

//     useEffect(() => {
//         // Dummy data for demonstration
//         setProjects([
//             { id: 1, title: 'AI for Healthcare' },
//             { id: 2, title: 'E-commerce System' },
//             { id: 3, title: 'IoT Smart Home' },
//         ]);

//         setTeachers([
//             { id: 1, name: 'Dr. Smith' },
//             { id: 2, name: 'Prof. Allen' },
//         ]);

//         setRooms([
//             { id: 1, room_no: 'Room 101' },
//             { id: 2, room_no: 'Room 202' },
//         ]);

//         setPanelMembers([
//             { id: 1, name: 'Mr. Brown', expertise: 'AI' },
//             { id: 2, name: 'Ms. Green', expertise: 'E-commerce' },
//             { id: 3, name: 'Dr. White', expertise: 'IoT' },
//         ]);
//     }, []);

//     const handleDateChange = async (e) => {
//         const scheduled_time = e.target.value;
//         setPresentation({ ...presentation, scheduled_time });

//         // Fetch available teachers and rooms for the selected date
//         try {
//             const response = await axios.get(`/api/availability/?date=${scheduled_time}`);
//             setTeachers(response.data.teachers);
//             setRooms(response.data.rooms);
//         } catch (error) {
//             console.error('Error fetching availability:', error);
//         }
//     };

//     const handleChange = (e) => {
//         setPresentation({ ...presentation, [e.target.name]: e.target.value });
//     };

//     const handleExpertiseChange = (e) => {
//         const selectedExpertise = e.target.value;
//         setExpertise(selectedExpertise);

//         const filteredMembers = panelMembers.filter(
//             member => member.expertise === selectedExpertise
//         );
//         setFilteredPanelMembers(filteredMembers);
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         axios.post('/api/presentations/', presentation)
//             .then(response => {
//                 alert('Presentation scheduled successfully!');
//                 setPresentation({
//                     title: '',
//                     scheduled_time: '',
//                     student_group: '',
//                     room_no: '',
//                     panel_members: [],
//                     teacher: '',
//                 });
//                 setIsModalOpen(false);
//             })
//             .catch(error => {
//                 console.error('Error scheduling presentation:', error);
//             });
//     };

//     return (
//         <Header>
//             <section style={styles.section}>
//                 <h2 style={styles.sectionHeader}>Schedule Presentation</h2>
//                 <button onClick={() => setIsModalOpen(true)} style={styles.button}>
//                     Schedule New Presentation
//                 </button>

//                 {isModalOpen && (
//                     <div className="modal" style={styles.modal}>
//                         <div className="modal-content" style={styles.modalContent}>
//                             <span className="close" onClick={() => setIsModalOpen(false)}>&times;</span>
//                             <h2>Schedule Presentation</h2>
//                             <form onSubmit={handleSubmit}>
//                                 {/* Title Dropdown */}
//                                 <select
//                                     name="title"
//                                     value={presentation.title}
//                                     onChange={handleChange}
//                                     style={styles.input}
//                                     required
//                                 >
//                                     <option value="">Select Project Title</option>
//                                     {projects.map(project => (
//                                         <option key={project.id} value={project.title}>{project.title}</option>
//                                     ))}
//                                 </select>

//                                 {/* Date and Time Selection */}
//                                 <input
//                                     type="datetime-local"
//                                     name="scheduled_time"
//                                     value={presentation.scheduled_time}
//                                     onChange={handleDateChange}
//                                     style={styles.input}
//                                     required
//                                 />

//                                 {/* Student Group (auto-fetched) */}
//                                 <input
//                                     name="student_group"
//                                     value={presentation.student_group}
//                                     readOnly
//                                     style={styles.input}
//                                     placeholder="Auto-fetched Project Group"
//                                 />

//                                 {/* Suggested Teachers */}
//                                 <select
//                                     name="teacher"
//                                     value={presentation.teacher}
//                                     onChange={handleChange}
//                                     style={styles.input}
//                                 >
//                                     <option value="">Select Available Teacher</option>
//                                     {teachers.map(teacher => (
//                                         <option key={teacher.id} value={teacher.id}>{teacher.name}</option>
//                                     ))}
//                                 </select>

//                                 {/* Mandatory Room Number */}
//                                 <select
//                                     name="room_no"
//                                     value={presentation.room_no}
//                                     onChange={handleChange}
//                                     style={styles.input}
//                                     required
//                                 >
//                                     <option value="">Select Available Room</option>
//                                     {rooms.map(room => (
//                                         <option key={room.id} value={room.room_no}>{room.room_no}</option>
//                                     ))}
//                                 </select>

//                                 {/* Panel Member Expertise Filter */}
//                                 <select
//                                     name="expertise"
//                                     value={expertise}
//                                     onChange={handleExpertiseChange}
//                                     style={styles.input}
//                                 >
//                                     <option value="">Select Panel Expertise</option>
//                                     {Array.from(new Set(panelMembers.map(member => member.expertise))).map(expertiseOption => (
//                                         <option key={expertiseOption} value={expertiseOption}>{expertiseOption}</option>
//                                     ))}
//                                 </select>

//                                 {/* Filtered Panel Members based on Expertise */}
//                                 <select
//                                     multiple
//                                     name="panel_members"
//                                     value={presentation.panel_members}
//                                     onChange={(e) =>
//                                         setPresentation({
//                                             ...presentation,
//                                             panel_members: Array.from(e.target.selectedOptions, option => option.value)
//                                         })
//                                     }
//                                     style={styles.input}
//                                 >
//                                     {filteredPanelMembers.map(member => (
//                                         <option key={member.id} value={member.id}>{member.name}</option>
//                                     ))}
//                                 </select>

//                                 <button type="submit" style={styles.button}>Schedule Presentation</button>
//                             </form>
//                         </div>
//                     </div>
//                 )}
//             </section>
//         </Header>
//     );
// };

// export default SchedulePresentation;



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../commonCSS/supervisorStyles.js';
import Header from '../../components/Header';

const SchedulePresentation = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [projects, setProjects] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [panelMembers, setPanelMembers] = useState([]);
    const [filteredPanelMembers, setFilteredPanelMembers] = useState([]);
    const [expertise, setExpertise] = useState('');

    const [presentation, setPresentation] = useState({
        title: '',
        scheduled_time: '',
        student_group: '',
        room_no: '',
        panel_members: [],
        teacher: '',
    });

    useEffect(() => {
        // Load initial data for projects and panel members
        const fetchData = async () => {
            try {
                const projectsResponse = await axios.get('http://127.0.0.1:8000/api/fyp/projects/');
                setProjects(projectsResponse.data);
                const panelMembersResponse = await axios.get('http://127.0.0.1:8000/api/fyp/panel_members/');
                setPanelMembers(panelMembersResponse.data);
            } catch (error) {
                console.error('Error fetching initial data:', error);
            }
        };
        fetchData();
    }, []);

    const handleDateChange = async (e) => {
        const scheduled_time = e.target.value;
        setPresentation({ ...presentation, scheduled_time });

        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/fyp/availability/?date=${scheduled_time}`);
            setTeachers(response.data.teachers);
            setRooms(response.data.rooms);
        } catch (error) {
            console.error('Error fetching availability:', error);
        }
    };

    const handleChange = (e) => {
        setPresentation({ ...presentation, [e.target.name]: e.target.value });
    };

    const handleExpertiseChange = (e) => {
        const selectedExpertise = e.target.value;
        setExpertise(selectedExpertise);

        const filteredMembers = panelMembers.filter(member => member.expertise === selectedExpertise);
        setFilteredPanelMembers(filteredMembers);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://127.0.0.1:8000/api/fyp/presentations/', presentation)
            .then(response => {
                alert('Presentation scheduled successfully!');
                setPresentation({
                    title: '',
                    scheduled_time: '',
                    student_group: '',
                    room_no: '',
                    panel_members: [],
                    teacher: '',
                });
                setIsModalOpen(false);
            })
            .catch(error => {
                console.error('Error scheduling presentation:', error);
            });
    };

    return (
        <Header>
            <section style={styles.section}>
                <h2 style={styles.sectionHeader}>Schedule Presentation</h2>
                <button onClick={() => setIsModalOpen(true)} style={styles.button}>
                    Schedule New Presentation
                </button>

                {isModalOpen && (
                    <div className="modal" style={styles.modal}>
                        <div className="modal-content" style={styles.modalContent}>
                            <span className="close" onClick={() => setIsModalOpen(false)}>&times;</span>
                            <h2>Schedule Presentation</h2>
                            <form onSubmit={handleSubmit}>
                                <select
                                    name="title"
                                    value={presentation.title}
                                    onChange={handleChange}
                                    style={styles.input}
                                    required
                                >
                                    <option value="">Select Project Title</option>
                                    {projects.map(project => (
                                        <option key={project.id} value={project.title}>{project.title}</option>
                                    ))}
                                </select>

                                <input
                                    type="datetime-local"
                                    name="scheduled_time"
                                    value={presentation.scheduled_time}
                                    onChange={handleDateChange}
                                    style={styles.input}
                                    required
                                />

                                <input
                                    name="student_group"
                                    value={presentation.student_group}
                                    readOnly
                                    style={styles.input}
                                    placeholder="Auto-fetched Project Group"
                                />

                                <select
                                    name="teacher"
                                    value={presentation.teacher}
                                    onChange={handleChange}
                                    style={styles.input}
                                    required
                                >
                                    <option value="">Select Available Teacher</option>
                                    {teachers.map(teacher => (
                                        <option key={teacher.id} value={teacher.id}>{teacher.name}</option>
                                    ))}
                                </select>

                                <select
                                    name="room_no"
                                    value={presentation.room_no}
                                    onChange={handleChange}
                                    style={styles.input}
                                    required
                                >
                                    <option value="">Select Available Room</option>
                                    {rooms.map(room => (
                                        <option key={room.id} value={room.room_no}>{room.room_no}</option>
                                    ))}
                                </select>

                                <select
                                    name="expertise"
                                    value={expertise}
                                    onChange={handleExpertiseChange}
                                    style={styles.input}
                                >
                                    <option value="">Select Panel Expertise</option>
                                    {Array.from(new Set(panelMembers.map(member => member.expertise))).map(expertiseOption => (
                                        <option key={expertiseOption} value={expertiseOption}>{expertiseOption}</option>
                                    ))}
                                </select>

                                <select
                                    multiple
                                    name="panel_members"
                                    value={presentation.panel_members}
                                    onChange={(e) =>
                                        setPresentation({
                                            ...presentation,
                                            panel_members: Array.from(e.target.selectedOptions, option => option.value)
                                        })
                                    }
                                    style={styles.input}
                                >
                                    {filteredPanelMembers.map(member => (
                                        <option key={member.id} value={member.id}>{member.name}</option>
                                    ))}
                                </select>

                                <button type="submit" style={styles.button}>Schedule Presentation</button>
                            </form>
                        </div>
                    </div>
                )}
            </section>
        </Header>
    );
};

export default SchedulePresentation;
