// import React, { useState, useEffect, useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios'; // Import axios for API requests
// import Header from "../../components/Header";
// import styles from '../commonCSS/fypmanagerstyles';
// import AuthContext from '../../context/AuthContext';
// import Select from 'react-select';
// const dummyData = {
    
//     rooms: [
//         { id: 1, room_no: 'Room 101' },
//         { id: 2, room_no: 'Room 202' },
//     ]
// };

// const SchedulePresentations = () => {
//     const navigate = useNavigate();
//     const { user, authTokens } = useContext(AuthContext);
//     const [faculty, setFaculty] = useState([]);

//     const [selectedCourse, setSelectedCourse] = useState('');
//     const [selectedAssessment, setSelectedAssessment] = useState('');
//     const [courses, setCourses] = useState([]);
//     const [groups, setGroups] = useState([]);
//     const [assessments, setAssessments] = useState([]);
//     const [presentation, setPresentation] = useState({
//         course: '',
//         assessment: '',
//         group: [],
//     });
//     const [isModalOpen, setIsModalOpen] = useState(false);

//     useEffect(() => {
//         // Fetch courses assigned to the logged-in user
//         const fetchCourses = async () => {
//             try {
//                 const response = await axios.get('http://127.0.0.1:8000/api/fyp/courses/', {
//                     headers: { Authorization: `Bearer ${authTokens.access}` }
//                 });
//                 setCourses(response.data); // Set courses assigned to the user
//             } catch (error) {
//                 console.error("Error fetching courses:", error);
//             }
//         };

//         fetchCourses();
//         fetchFaculty();
//     }, []);

//     useEffect(() => {
//         if (selectedCourse) {
//             // Fetch groups and assessments for the selected course
//             const fetchGroupsAndAssessments = async () => {
//                 try {
//                     const [groupsResponse, assessmentsResponse] = await Promise.all([
//                         axios.get(`http://127.0.0.1:8000/api/fyp/${selectedCourse}/get-fyp-groups`, {
//                             headers: { Authorization: `Bearer ${authTokens.access}` }
//                         }),
//                         axios.get(`http://127.0.0.1:8000/api/fyp/assessments/?course_id=${selectedCourse}`, {
//                             headers: { Authorization: `Bearer ${authTokens.access}` }
//                         })
//                     ]);
//                     setGroups(groupsResponse.data);
//                     const filteredAssessments = assessmentsResponse.data.filter(assessment => assessment.name.toLowerCase() !== 'attendance'.toLowerCase());
//                     setAssessments(filteredAssessments);
//                     console.log("Group response: ", groupsResponse.data);
//                 } catch (error) {
//                     console.error("Error fetching groups or assessments:", error);
//                 }
//             };

//             fetchGroupsAndAssessments();
//         }
//     }, [selectedCourse]);

    
//     const [presentations, setPresentations] = useState([]);

// useEffect(() => {
//     if (selectedCourse) {
//         const fetchPresentations = async () => {
//             try {
//                 const response = await axios.get(
//                     `http://127.0.0.1:8000/api/fyp/view-presentations/${selectedCourse}/`,
//                     { headers: { Authorization: `Bearer ${authTokens.access}` } }
//                 );
//                 setPresentations(response.data);
//                 console.log('Fetched Presentations: ', response.data);
//             } catch (error) {
//                 console.error('Error fetching presentations:', error);
//             }
//         };

//         fetchPresentations();
//     }
// }, [selectedCourse]);
//     const fetchFaculty = async () => {
//         try {
//             const response = await axios.get('http://127.0.0.1:8000/api/fyp/faculties/', {
//                 headers: { Authorization: `Bearer ${authTokens.access}` },
//             });
//             console.log('fetched faculty users: ', response.data);
//             setFaculty(response.data);
//         } catch (error) {
//             console.error('Error fetching faculty:', error);
//         }
//     };

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setPresentation(prev => ({ ...prev, [name]: value }));
//         setPresentation(prev => ({ ...prev, course: e.target.value }));

//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         console.log("requested by user: ", user.username)
//         console.log("Selected course: ", selectedCourse)
        
//         presentation.course = selectedCourse
//         presentation.group = groups
//         // groups[0].assessment = presentation.assessment
//         console.log("Groups Data: ", groups)
//         console.log("Sending presentation schedule: ", presentation)
//         try {
//             const response = await axios.post(
//                 'http://127.0.0.1:8000/api/fyp/schedule-presentation/',
//                 presentation,
//                 {
//                     headers: { Authorization: `Bearer ${authTokens.access}` }
//                 }
//             );
//             alert('Presentation scheduled successfully!');

//             setPresentation({
//                 assessment: '',
//                 scheduled_time: '',
//                 student_group: '',
//                 room_no: '',
//                 panel_members: [],
//             });

//             setIsModalOpen(false);
//         } catch (error) {
//             console.error('Error scheduling presentation:', error);
//             alert('Failed to schedule presentation. Please try again.');
//         }
//     };
//     const updateGroupField = (groupId, field, value) => {
//         console.log('Update attempt for group ID:', groupId);
//         setGroups((prevGroups) => {
//             console.log("changing field: ", field)
//             console.log('Previous groups:', prevGroups);
//             return prevGroups.map((group) => {
//                 if (field =='room_no'){
//                     return { ...group, [field]: value }; 
//                 }
//                 // console.log('Current group:', group);
//                 if (group.group_id === groupId) {
//                 // if (true) {
//                     // console.log('Updating group:', groupId, { [field]: value });
//                     return { ...group, [field]: value };
//                 }
//                 return group;
//             });
//         });
//     };
    
//    return (
//         <Header>
//             <div style={styles.container}>
//                 <h1>FYP Scheduling</h1>

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
//                 <div style={{ marginTop: '20px' }}>
//                     <label style={styles.courseSelect}>Select Assessment:</label>
//                     <select
//                         name="assessment"
//                         value={presentation.assessment}
//                         onChange={handleChange}
//                         style={styles.inputField}
//                         required
//                     >
//                         <option value="">Select Assessment</option>
//                         {assessments.map(assessment => (
//                             <option key={assessment.assessment_id} value={assessment.assessment_id}>{assessment.name}</option>
//                         ))}
//                     </select>
//                 </div>

//                 {groups.length > 0 && selectedCourse && (
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
//     {groups.map((group, index) => (
//         <tr key={group.id} style={styles.tableRow}>
//             <td style={styles.tableCell}>{index + 1}</td>
//             <td style={styles.tableCell}>{group.project_title}</td>
//             <td style={styles.tableCell}>
//                 {group.supervisor?.username || 'N/A'}
//             </td>
//             <td style={styles.tableCell}>
//                 {group.members.map((member, i) => (
//                     <div key={i}>{member.student.username}</div>
//                 ))}
//             </td>
//             <td style={styles.tableCell}>
//                 {group.members.map((member, i) => (
//                     <div key={i}>{member.student.sap_id}</div>
//                 ))}
//             </td>
//             <td style={styles.tableCell}>
//                 <input
//                     type="datetime-local"
//                     name="scheduled_time"
//                     value={group.scheduled_time || ''}
//                     onChange={(e) =>
//                         updateGroupField(group.group_id, 'scheduled_time', e.target.value)
//                     }
//                     style={styles.input}
//                     required
//                 />
//                  <select
//                     name="room_no"
//                     value={group.room_no || ''}
//                     onChange={(e) =>
//                         updateGroupField(group.group_id, 'room_no', e.target.value)
//                     }
//                     style={styles.input}
//                     required
//                 >
//                     <option value="">Select Room</option>
//                     {dummyData.rooms.map((room) => (
//                         <option key={room.id} value={room.room_no}>
//                             {room.room_no}
//                         </option>
//                     ))}
//                 </select>
//                 <Select
//                     isMulti
//                     name="teachers"
//                     options={faculty.map((facultyMember) => ({
//                         value: facultyMember.faculty_id,
//                         label: facultyMember.user.username,
//                     }))}
//                     value={
//                         group.panel_members
//                             ? group.panel_members.map((teacher) => ({
//                                   value: teacher,
//                                   label:
//                                       faculty.find(
//                                           (f) => f.faculty_id === teacher
//                                       )?.user.username || teacher,
//                               }))
//                             : []
//                     }
//                     onChange={(selected) =>
//                         updateGroupField(
//                             group.group_id,
//                             'panel_members',
//                             selected.map((option) => option.value)
//                         )
//                     }
//                     styles={{
//                         control: (base) => ({
//                             ...base,
//                             ...styles.input,
//                             minHeight: '40px',
//                         }),
//                         menu: (base) => ({
//                             ...base,
//                             zIndex: 9999,
//                         }),
//                     }}
//                     placeholder="Select Teachers"
//                     closeMenuOnSelect={false}
//                 />
//             </td>
//         </tr>
//     ))}
// </tbody>

//                     </table>
//                 )}

              
//             </div>
           
//            {/* FJISF 
//            FEFE */}
//            {presentations.length > 0 && (
//     <div style={styles.container}>
//         <h2>Scheduled Presentations</h2>
//         <table style={styles.table}>
//             <thead>
//                 <tr style={styles.tableHeaderRow}>
//                     <th style={styles.tableHeader}>Scheduled Time</th>
//                     <th style={styles.tableHeader}>Student Group</th>
//                     <th style={styles.tableHeader}>Room No</th>
//                     <th style={styles.tableHeader}>Panel Members</th>
//                 </tr>
//             </thead>
//             <tbody>
//                 {presentations.map((presentation, index) => (
//                     <tr key={index} style={styles.tableRow}>
//                         <td style={styles.tableCell}>{new Date(presentation.scheduled_time).toLocaleString()}</td>
//                         <td style={styles.tableCell}>{presentation.student_group}</td>
//                         <td style={styles.tableCell}>{presentation.room_no}</td>
//                         <td style={styles.tableCell}>
//                             {presentation.panel_members.map((member, idx) => (
//                                 <div key={idx}>{member}</div>
//                             ))}
//                         </td>
//                     </tr>
//                 ))}
//             </tbody>
//         </table>
//     </div>
    
// )}
//           <button onClick={handleSubmit} style={styles.submitButton}>
//                 Submit Schedule
//             </button>   
//         </Header>
//     );
// };

// export default SchedulePresentations;


//Before Up Down
// import React, { useState, useEffect, useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import Header from "../../components/Header";
// import styles from '../commonCSS/fypmanagerstyles';
// import AuthContext from '../../context/AuthContext';
// import Select from 'react-select';



// const SchedulePresentations = () => {
//     const navigate = useNavigate();
//     const { user, authTokens } = useContext(AuthContext);
//     const [faculty, setFaculty] = useState([]);
//     const [selectedCourse, setSelectedCourse] = useState('');
//     const [selectedAssessment, setSelectedAssessment] = useState('');
//     const [courses, setCourses] = useState([]);
//     const [groups, setGroups] = useState([]);
//     const [assessments, setAssessments] = useState([]);
//     const [rooms, setRooms] = useState([]);
//     const [presentation, setPresentation] = useState({
//         course: '',
//         assessment: '',
//         group: [],
//     });

//     useEffect(() => {
//         const fetchRooms = async () => {
//             try {
//                 const response = await axios.get("http://127.0.0.1:8000/api/fyp/rooms/", {
//                     headers: { Authorization: `Bearer ${authTokens.access}` }
//                 });
//                 setRooms(response.data);
//                 console.log("fetched rooms: ", response.data)
//             } catch (error) {
//                 console.error("Error fetching rooms:", error);
//             }
//         };
//         fetchRooms();
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
//         fetchFaculty();
//     }, []);

//     // useEffect(() => {
//     //     if (selectedCourse) {
//     //         const fetchGroupsAndAssessments = async () => {
//     //             try {
//     //                 const [groupsResponse, assessmentsResponse] = await Promise.all([
//     //                     axios.get(`http://127.0.0.1:8000/api/fyp/${selectedCourse}/get-fyp-groups`, {
//     //                         headers: { Authorization: `Bearer ${authTokens.access}` }
//     //                     }),
//     //                     axios.get(`http://127.0.0.1:8000/api/fyp/assessments/?course_id=${selectedCourse}`, {
//     //                         headers: { Authorization: `Bearer ${authTokens.access}` }
//     //                     })
//     //                 ]);
//     //                 console.log("Assessments fetched: ", assessmentsResponse.data)
//     //                 setGroups(groupsResponse.data);
//     //                 const filteredAssessments = assessmentsResponse.data.filter(assessment => assessment.name.toLowerCase() !== 'attendance'.toLowerCase());
//     //                 setAssessments(filteredAssessments);
//     //             } catch (error) {
//     //                 console.error("Error fetching groups or assessments:", error);
//     //             }
//     //         };
//     //         fetchGroupsAndAssessments();
//     //     }
//     // }, [selectedCourse]);


//     //
//     useEffect(() => {
//         if (selectedCourse) {
//             const fetchAssessments = async () => {
//                 try {
//                     const assessmentsResponse = await axios.get(`http://127.0.0.1:8000/api/fyp/assessments/?course_id=${selectedCourse}`, {
//                         headers: { Authorization: `Bearer ${authTokens.access}` }
//                     });
//                     const filteredAssessments = assessmentsResponse.data.filter(
//                         assessment => assessment.name.toLowerCase() !== 'attendance'.toLowerCase()
//                     );
//                     setAssessments(filteredAssessments);
//                     console.log("Assessments fetched: ", filteredAssessments);
//                 } catch (error) {
//                     console.error("Error fetching assessments:", error);
//                 }
//             };
//             fetchAssessments();
//         }
//     }, [selectedCourse]);
//     useEffect(() => {
//         if (selectedCourse && presentation.assessment) {
//             const fetchGroups = async () => {
//                 try {
//                     const groupsResponse = await axios.get(`http://127.0.0.1:8000/api/fyp/get-fyp-groups/${selectedCourse}/${presentation.assessment}/`, {
//                         headers: { Authorization: `Bearer ${authTokens.access}` }
//                     });
//                     setGroups(groupsResponse.data);
//                 } catch (error) {
//                     console.error("Error fetching groups:", error);
//                 }
//             };
//             fetchGroups();
//         }
//     }, [presentation.assessment]);
//     //

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

//     const handleChange = (e) => {

//         const { name, value } = e.target;
//         setPresentation(prev => ({ ...prev, [name]: value }));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         presentation.course = selectedCourse;
//         presentation.group = groups;
//         console.log("Sending presentation: ", presentation)

//         try {
//             const response = await axios.post(
//                 'http://127.0.0.1:8000/api/fyp/schedule-presentation/',
//                 presentation,
//                 {
//                     headers: { Authorization: `Bearer ${authTokens.access}` }
//                 }
//             );
//             alert('Presentation scheduled successfully!');

//             // setIsModalOpen(false);
//         } catch (error) {
//             console.error('Error scheduling presentation:', error);
//             alert('Failed to schedule presentation. Please try again.');
//         }
//     };

//     const updateGroupField = (groupId, field, value) => {
//         setGroups((prevGroups) => {
//             return prevGroups.map((group) => {
//                 if (field=='room_no'){
//                     return { ...group, [field]: value };

//                 }
//                 if (group.group_id === groupId) {
//                     return { ...group, [field]: value };
//                 }
//                 return group;
//             });
//         });
//     };

//     return (
//         <Header>
//             <div style={styles.container}>
//                 <h1>FYP Scheduling</h1>

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

//                 <div style={{ marginTop: '20px' }}>
//                     <label style={styles.courseSelect}>Select Assessment:</label>
//                     <select
//                         name="assessment"
//                         value={presentation.assessment}
//                         onChange={handleChange}
//                         style={styles.inputField}
//                         required
//                     >
//                         <option value="">Select Assessment</option>
//                         {assessments.map(assessment => (
//                             <option key={assessment.assessment_id} value={assessment.assessment_id}>{assessment.name}</option>
//                         ))}
//                     </select>
//                 </div>

//                 {groups.length > 0 && selectedCourse && (
//                     <>
//                         <div style={{ marginTop: '20px' }}>
//                             <label style={styles.courseSelect}>Scheduled Time:</label>
//                             <input
//                                 type="datetime-local"
//                                 name="scheduled_time"
//                                 value={presentation.scheduled_time || ''}
//                                 onChange={handleChange}
//                                 style={styles.inputField}
//                                 required
//                             />
//                         </div>

//                         <table style={styles.table}>
//                             <thead>
//                                 <tr style={styles.tableHeaderRow}>
//                                     <th style={styles.tableHeader}>Group No</th>
//                                     <th style={styles.tableHeader}>Project Title</th>
//                                     <th style={styles.tableHeader}>Supervisor</th>
//                                     <th style={styles.tableHeader}>Group Members</th>
//                                     <th style={styles.tableHeader}>SAP IDs</th>
//                                     <th style={styles.tableHeader}>Room No</th>
//                                     <th style={styles.tableHeader}>Panel Members</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {groups.map((group, index) => (
//                                     <tr key={group.id} style={styles.tableRow}>
//                                         <td style={styles.tableCell}>{index + 1}</td>
//                                         <td style={styles.tableCell}>{group.project_title}</td>
//                                         <td style={styles.tableCell}>{group.supervisor?.username || 'N/A'}</td>
//                                         <td style={styles.tableCell}>
//                                             {group.members.map((member, i) => (
//                                                 <div key={i}>{member.student.username}</div>
//                                             ))}
//                                         </td>
//                                         <td style={styles.tableCell}>
//                                             {group.members.map((member, i) => (
//                                                 <div key={i}>{member.student.sap_id}</div>
//                                             ))}
//                                         </td>
//                                         <td style={styles.tableCell}>
//                                             <select
//                                                 name="room_no"
//                                                 value={group.room_no || ''}
//                                                 onChange={(e) =>
//                                                     updateGroupField(group.group_id, 'room_no', e.target.value)
//                                                 }
//                                                 style={styles.input}
//                                                 required
//                                             >
//                                                 <option value="">Select Room</option>
//                                                 {rooms.map((room) => (
//                                                     <option key={room.id} value={room.name}>
//                                                         {room.name}
//                                                     </option>
//                                                 ))}
//                                             </select>
//                                         </td>
//                                         <td style={styles.tableCell}>
//                                             <Select
//                                                 isMulti
//                                                 name="teachers"
//                                                 options={faculty.map((facultyMember) => ({
//                                                     value: facultyMember.faculty_id,
//                                                     label: facultyMember.user.username,
//                                                 }))}
//                                                 value={
//                                                     group.panel_members
//                                                         ? group.panel_members.map((teacher) => ({
//                                                               value: teacher,
//                                                               label:
//                                                                   faculty.find(
//                                                                       (f) => f.faculty_id === teacher
//                                                                   )?.user.username || teacher,
//                                                           }))
//                                                         : []
//                                                 }
//                                                 onChange={(selected) =>
//                                                     updateGroupField(
//                                                         group.group_id,
//                                                         'panel_members',
//                                                         selected.map((option) => option.value)
//                                                     )
//                                                 }
//                                                 styles={{
//                                                     control: (base) => ({
//                                                         ...base,
//                                                         ...styles.input,
//                                                         minHeight: '40px',
//                                                     }),
//                                                     menu: (base) => ({
//                                                         ...base,
//                                                         zIndex: 9999,
//                                                     }),
//                                                 }}
//                                                 placeholder="Select Teachers"
//                                                 closeMenuOnSelect={false}
//                                             />
//                                         </td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     </>
//                 )}

//                 <button onClick={handleSubmit} style={styles.submitButton}>
//                     Submit Schedule
//                 </button>
//             </div>
//         </Header>
//     );
// };

// export default SchedulePresentations;



// Move UP Down
// import React, { useState, useEffect, useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios'; // Import axios for API requests
// import Header from "../../components/Header";
// import styles from '../commonCSS/fypmanagerstyles';
// import AuthContext from '../../context/AuthContext';
// import Select from 'react-select';
// const dummyData = {
    
//     rooms: [
//         { id: 1, room_no: 'Room 101' },
//         { id: 2, room_no: 'Room 202' },
//     ]
// };

// const SchedulePresentations = () => {
//     const navigate = useNavigate();
//     const { user, authTokens } = useContext(AuthContext);
//     const [faculty, setFaculty] = useState([]);

//     const [selectedCourse, setSelectedCourse] = useState('');
//     const [selectedAssessment, setSelectedAssessment] = useState('');
//     const [courses, setCourses] = useState([]);
//     const [groups, setGroups] = useState([]);
//     const [assessments, setAssessments] = useState([]);
//     const [presentation, setPresentation] = useState({
//         course: '',
//         assessment: '',
//         group: [],
//     });
//     const [isModalOpen, setIsModalOpen] = useState(false);

//     useEffect(() => {
//         // Fetch courses assigned to the logged-in user
//         const fetchCourses = async () => {
//             try {
//                 const response = await axios.get('http://127.0.0.1:8000/api/fyp/courses/', {
//                     headers: { Authorization: `Bearer ${authTokens.access}` }
//                 });
//                 setCourses(response.data); // Set courses assigned to the user
//             } catch (error) {
//                 console.error("Error fetching courses:", error);
//             }
//         };

//         fetchCourses();
//         fetchFaculty();
//     }, []);

//     useEffect(() => {
//         if (selectedCourse) {
//             // Fetch groups and assessments for the selected course
//             const fetchGroupsAndAssessments = async () => {
//                 try {
//                     const [groupsResponse, assessmentsResponse] = await Promise.all([
//                         axios.get(`http://127.0.0.1:8000/api/fyp/${selectedCourse}/get-fyp-groups`, {
//                             headers: { Authorization: `Bearer ${authTokens.access}` }
//                         }),
//                         axios.get(`http://127.0.0.1:8000/api/fyp/assessments/?course_id=${selectedCourse}`, {
//                             headers: { Authorization: `Bearer ${authTokens.access}` }
//                         })
//                     ]);
//                     setGroups(groupsResponse.data);
//                     const filteredAssessments = assessmentsResponse.data.filter(assessment => assessment.name.toLowerCase() !== 'attendance'.toLowerCase());
//                     setAssessments(filteredAssessments);
//                     console.log("Group response: ", groupsResponse.data);
//                 } catch (error) {
//                     console.error("Error fetching groups or assessments:", error);
//                 }
//             };

//             fetchGroupsAndAssessments();
//         }
//     }, [selectedCourse]);

    
//     const [presentations, setPresentations] = useState([]);

// useEffect(() => {
//     if (selectedCourse) {
//         const fetchPresentations = async () => {
//             try {
//                 const response = await axios.get(
//                     `http://127.0.0.1:8000/api/fyp/view-presentations/${selectedCourse}/`,
//                     { headers: { Authorization: `Bearer ${authTokens.access}` } }
//                 );
//                 setPresentations(response.data);
//                 console.log('Fetched Presentations: ', response.data);
//             } catch (error) {
//                 console.error('Error fetching presentations:', error);
//             }
//         };

//         fetchPresentations();
//     }
// }, [selectedCourse]);
//     const fetchFaculty = async () => {
//         try {
//             const response = await axios.get('http://127.0.0.1:8000/api/fyp/faculties/', {
//                 headers: { Authorization: `Bearer ${authTokens.access}` },
//             });
//             console.log('fetched faculty users: ', response.data);
//             setFaculty(response.data);
//         } catch (error) {
//             console.error('Error fetching faculty:', error);
//         }
//     };

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setPresentation(prev => ({ ...prev, [name]: value }));
//         setPresentation(prev => ({ ...prev, course: e.target.value }));

//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         console.log("requested by user: ", user.username)
//         console.log("Selected course: ", selectedCourse)
        
//         presentation.course = selectedCourse
//         presentation.group = groups
//         // groups[0].assessment = presentation.assessment
//         console.log("Groups Data: ", groups)
//         console.log("Sending presentation schedule: ", presentation)
//         try {
//             const response = await axios.post(
//                 'http://127.0.0.1:8000/api/fyp/schedule-presentation/',
//                 presentation,
//                 {
//                     headers: { Authorization: `Bearer ${authTokens.access}` }
//                 }
//             );
//             alert('Presentation scheduled successfully!');

//             setPresentation({
//                 assessment: '',
//                 scheduled_time: '',
//                 student_group: '',
//                 room_no: '',
//                 panel_members: [],
//             });

//             setIsModalOpen(false);
//         } catch (error) {
//             console.error('Error scheduling presentation:', error);
//             alert('Failed to schedule presentation. Please try again.');
//         }
//     };
//     const updateGroupField = (groupId, field, value) => {
//         console.log('Update attempt for group ID:', groupId);
//         setGroups((prevGroups) => {
//             console.log("changing field: ", field)
//             console.log('Previous groups:', prevGroups);
//             return prevGroups.map((group) => {
//                 if (field =='room_no'){
//                     return { ...group, [field]: value }; 
//                 }
//                 // console.log('Current group:', group);
//                 if (group.group_id === groupId) {
//                 // if (true) {
//                     // console.log('Updating group:', groupId, { [field]: value });
//                     return { ...group, [field]: value };
//                 }
//                 return group;
//             });
//         });
//     };
    
//    return (
//         <Header>
//             <div style={styles.container}>
//                 <h1>FYP Scheduling</h1>

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
//                 <div style={{ marginTop: '20px' }}>
//                     <label style={styles.courseSelect}>Select Assessment:</label>
//                     <select
//                         name="assessment"
//                         value={presentation.assessment}
//                         onChange={handleChange}
//                         style={styles.inputField}
//                         required
//                     >
//                         <option value="">Select Assessment</option>
//                         {assessments.map(assessment => (
//                             <option key={assessment.assessment_id} value={assessment.assessment_id}>{assessment.name}</option>
//                         ))}
//                     </select>
//                 </div>

//                 {groups.length > 0 && selectedCourse && (
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
//     {groups.map((group, index) => (
//         <tr key={group.id} style={styles.tableRow}>
//             <td style={styles.tableCell}>{index + 1}</td>
//             <td style={styles.tableCell}>{group.project_title}</td>
//             <td style={styles.tableCell}>
//                 {group.supervisor?.username || 'N/A'}
//             </td>
//             <td style={styles.tableCell}>
//                 {group.members.map((member, i) => (
//                     <div key={i}>{member.student.username}</div>
//                 ))}
//             </td>
//             <td style={styles.tableCell}>
//                 {group.members.map((member, i) => (
//                     <div key={i}>{member.student.sap_id}</div>
//                 ))}
//             </td>
//             <td style={styles.tableCell}>
//                 <input
//                     type="datetime-local"
//                     name="scheduled_time"
//                     value={group.scheduled_time || ''}
//                     onChange={(e) =>
//                         updateGroupField(group.group_id, 'scheduled_time', e.target.value)
//                     }
//                     style={styles.input}
//                     required
//                 />
//                  <select
//                     name="room_no"
//                     value={group.room_no || ''}
//                     onChange={(e) =>
//                         updateGroupField(group.group_id, 'room_no', e.target.value)
//                     }
//                     style={styles.input}
//                     required
//                 >
//                     <option value="">Select Room</option>
//                     {dummyData.rooms.map((room) => (
//                         <option key={room.id} value={room.room_no}>
//                             {room.room_no}
//                         </option>
//                     ))}
//                 </select>
//                 <Select
//                     isMulti
//                     name="teachers"
//                     options={faculty.map((facultyMember) => ({
//                         value: facultyMember.faculty_id,
//                         label: facultyMember.user.username,
//                     }))}
//                     value={
//                         group.panel_members
//                             ? group.panel_members.map((teacher) => ({
//                                   value: teacher,
//                                   label:
//                                       faculty.find(
//                                           (f) => f.faculty_id === teacher
//                                       )?.user.username || teacher,
//                               }))
//                             : []
//                     }
//                     onChange={(selected) =>
//                         updateGroupField(
//                             group.group_id,
//                             'panel_members',
//                             selected.map((option) => option.value)
//                         )
//                     }
//                     styles={{
//                         control: (base) => ({
//                             ...base,
//                             ...styles.input,
//                             minHeight: '40px',
//                         }),
//                         menu: (base) => ({
//                             ...base,
//                             zIndex: 9999,
//                         }),
//                     }}
//                     placeholder="Select Teachers"
//                     closeMenuOnSelect={false}
//                 />
//             </td>
//         </tr>
//     ))}
// </tbody>

//                     </table>
//                 )}

              
//             </div>
           
//            {/* FJISF 
//            FEFE */}
//            {presentations.length > 0 && (
//     <div style={styles.container}>
//         <h2>Scheduled Presentations</h2>
//         <table style={styles.table}>
//             <thead>
//                 <tr style={styles.tableHeaderRow}>
//                     <th style={styles.tableHeader}>Scheduled Time</th>
//                     <th style={styles.tableHeader}>Student Group</th>
//                     <th style={styles.tableHeader}>Room No</th>
//                     <th style={styles.tableHeader}>Panel Members</th>
//                 </tr>
//             </thead>
//             <tbody>
//                 {presentations.map((presentation, index) => (
//                     <tr key={index} style={styles.tableRow}>
//                         <td style={styles.tableCell}>{new Date(presentation.scheduled_time).toLocaleString()}</td>
//                         <td style={styles.tableCell}>{presentation.student_group}</td>
//                         <td style={styles.tableCell}>{presentation.room_no}</td>
//                         <td style={styles.tableCell}>
//                             {presentation.panel_members.map((member, idx) => (
//                                 <div key={idx}>{member}</div>
//                             ))}
//                         </td>
//                     </tr>
//                 ))}
//             </tbody>
//         </table>
//     </div>
    
// )}
//           <button onClick={handleSubmit} style={styles.submitButton}>
//                 Submit Schedule
//             </button>   
//         </Header>
//     );
// };

// export default SchedulePresentations;

import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from "../../components/Header";
import styles from '../commonCSS/fypmanagerstyles';
import AuthContext from '../../context/AuthContext';
import Select from 'react-select';



const SchedulePresentations = () => {
    const navigate = useNavigate();
    const { user, authTokens } = useContext(AuthContext);
    const [faculty, setFaculty] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState('');
    const [selectedAssessment, setSelectedAssessment] = useState('');
    const [courses, setCourses] = useState([]);
    const [groups, setGroups] = useState([]);
    const [assessments, setAssessments] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [presentation, setPresentation] = useState({
        course: '',
        assessment: '',
        group: [],
    });

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/fyp/rooms/", {
                    headers: { Authorization: `Bearer ${authTokens.access}` }
                });
                setRooms(response.data);
                console.log("fetched rooms: ", response.data)
            } catch (error) {
                console.error("Error fetching rooms:", error);
            }
        };
        fetchRooms();
    }, []);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/fyp/courses/', {
                    headers: { Authorization: `Bearer ${authTokens.access}` }
                });
                setCourses(response.data);
            } catch (error) {
                console.error("Error fetching courses:", error);
            }
        };
        fetchCourses();
        fetchFaculty();
    }, []);


    useEffect(() => {
        if (selectedCourse) {
            const fetchAssessments = async () => {
                try {
                    const assessmentsResponse = await axios.get(`http://127.0.0.1:8000/api/fyp/assessments/?course_id=${selectedCourse}`, {
                        headers: { Authorization: `Bearer ${authTokens.access}` }
                    });
                    const filteredAssessments = assessmentsResponse.data.filter(
                        assessment => assessment.name.toLowerCase() !== 'attendance'.toLowerCase()
                    );
                    setAssessments(filteredAssessments);
                    console.log("Assessments fetched: ", filteredAssessments);
                } catch (error) {
                    console.error("Error fetching assessments:", error);
                }
            };
            fetchAssessments();
        }
    }, [selectedCourse]);
    useEffect(() => {
        if (selectedCourse && presentation.assessment) {
            const fetchGroups = async () => {
                try {
                    const groupsResponse = await axios.get(`http://127.0.0.1:8000/api/fyp/get-fyp-groups/${selectedCourse}/${presentation.assessment}/`, {
                        headers: { Authorization: `Bearer ${authTokens.access}` }
                    });
                    setGroups(groupsResponse.data);
                } catch (error) {
                    console.error("Error fetching groups:", error);
                }
            };
            fetchGroups();
        }
    }, [presentation.assessment]);
    //

    const fetchFaculty = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/fyp/faculties/', {
                headers: { Authorization: `Bearer ${authTokens.access}` },
            });
            setFaculty(response.data);
        } catch (error) {
            console.error('Error fetching faculty:', error);
        }
    };

    const handleChange = (e) => {

        const { name, value } = e.target;
        setPresentation(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        presentation.course = selectedCourse;
        presentation.group = groups;
        console.log("Sending presentation: ", presentation)

        try {
            const response = await axios.post(
                'http://127.0.0.1:8000/api/fyp/schedule-presentation/',
                presentation,
                {
                    headers: { Authorization: `Bearer ${authTokens.access}` }
                }
            );
            alert('Presentation scheduled successfully!');

            // setIsModalOpen(false);
        } catch (error) {
            console.error('Error scheduling presentation:', error);
            alert('Failed to schedule presentation. Please try again.');
        }
    };

    const updateGroupField = (groupId, field, value) => {
        setGroups((prevGroups) => {
            return prevGroups.map((group) => {
                if (field=='room_no'){
                    return { ...group, [field]: value };

                }
                if (group.group_id === groupId) {
                    return { ...group, [field]: value };
                }
                return group;
            });
        });
    };
    const moveRow = (index, direction) => {
        setGroups((prevGroups) => {
            const newGroups = [...prevGroups];
            const targetIndex = index + direction;
    
            // Swap the elements
            [newGroups[index], newGroups[targetIndex]] = [
                newGroups[targetIndex],
                newGroups[index],
            ];
    
            return newGroups;
        });
    };
    
    return (
        <Header>
            <div style={styles.container}>
                <h1>FYP Scheduling</h1>

                <div style={{ marginBottom: '20px' }}>
                    <label style={styles.courseSelect}>Select Course:</label>
                    <select
                        value={selectedCourse}
                        onChange={(e) => setSelectedCourse(e.target.value)}
                        style={styles.inputField}
                    >
                        <option value="" disabled>Select a course</option>
                        {courses.map((course) => (
                            <option key={course.course_id} value={course.course_id}>
                                {course.course_name} {course.section_name} {course.degree.degree_name} {course.semester.semester_name}
                            </option>
                        ))}
                    </select>
                </div>

                <div style={{ marginTop: '20px' }}>
                    <label style={styles.courseSelect}>Select Assessment:</label>
                    <select
                        name="assessment"
                        value={presentation.assessment}
                        onChange={handleChange}
                        style={styles.inputField}
                        required
                    >
                        <option value="">Select Assessment</option>
                        {assessments.map(assessment => (
                            <option key={assessment.assessment_id} value={assessment.assessment_id}>{assessment.name}</option>
                        ))}
                    </select>
                </div>

                {groups.length > 0 && selectedCourse && (
                    <>
                        <div style={{ marginTop: '20px' }}>
                            <label style={styles.courseSelect}>Scheduled Time:</label>
                            <input
                                type="datetime-local"
                                name="scheduled_time"
                                value={presentation.scheduled_time || ''}
                                onChange={handleChange}
                                style={styles.inputField}
                                required
                            />
                        </div>

                        <table style={styles.table}>
                            <thead>
                                <tr style={styles.tableHeaderRow}>
                                    <th style={styles.tableHeader}>Group No</th>
                                    <th style={styles.tableHeader}>Project Title</th>
                                    <th style={styles.tableHeader}>Supervisor</th>
                                    <th style={styles.tableHeader}>Group Members</th>
                                    <th style={styles.tableHeader}>SAP IDs</th>
                                    <th style={styles.tableHeader}>Room No</th>
                                    <th style={styles.tableHeader}>Panel Members</th>
                                </tr>
                            </thead>
                            <tbody>
    {groups.map((group, index) => (
        <tr key={group.id} style={styles.tableRow}>
            <td style={styles.tableCell}>{index + 1}</td>
            <td style={styles.tableCell}>{group.project_title}</td>
            <td style={styles.tableCell}>{group.supervisor?.username || 'N/A'}</td>
            <td style={styles.tableCell}>
                {group.members.map((member, i) => (
                    <div key={i}>{member.student.username}</div>
                ))}
            </td>
            <td style={styles.tableCell}>
                {group.members.map((member, i) => (
                    <div key={i}>{member.student.sap_id}</div>
                ))}
            </td>
            <td style={styles.tableCell}>
                <select
                    name="room_no"
                    value={group.room_no || ''}
                    onChange={(e) =>
                        updateGroupField(group.group_id, 'room_no', e.target.value)
                    }
                    style={styles.input}
                    required
                >
                    <option value="">Select Room</option>
                    {rooms.map((room) => (
                        <option key={room.id} value={room.name}>
                            {room.name}
                        </option>
                    ))}
                </select>
            </td>
            <td style={styles.tableCell}>
                <Select
                    isMulti
                    name="teachers"
                    options={faculty.map((facultyMember) => ({
                        value: facultyMember.faculty_id,
                        label: facultyMember.user.username,
                    }))}
                    value={
                        group.panel_members
                            ? group.panel_members.map((teacher) => ({
                                  value: teacher,
                                  label:
                                      faculty.find((f) => f.faculty_id === teacher)?.user.username ||
                                      teacher,
                              }))
                            : []
                    }
                    onChange={(selected) =>
                        updateGroupField(
                            group.group_id,
                            'panel_members',
                            selected.map((option) => option.value)
                        )
                    }
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
            </td>
            <td style={styles.tableCell}>
                <button
                    onClick={() => moveRow(index, -1)}
                    disabled={index === 0}
                    style={styles.moveButton}
                >
                    Move Up
                </button>
                <button
                    onClick={() => moveRow(index, 1)}
                    disabled={index === groups.length - 1}
                    style={styles.moveButton}
                >
                    Move Down
                </button>
            </td>
        </tr>
    ))}
</tbody>

                        </table>
                    </>
                )}

                <button onClick={handleSubmit} style={styles.submitButton}>
                    Submit Schedule
                </button>
            </div>
        </Header>
    );
};

export default SchedulePresentations;

