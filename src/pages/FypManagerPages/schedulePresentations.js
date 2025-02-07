import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from "../../components/Header";
import styles from '../commonCSS/fypmanagerstyles';
import AuthContext from '../../context/AuthContext';
import Select from 'react-select';
import { FaBook } from 'react-icons/fa'; // Importing a book icon for degrees

import { faUserGraduate, faUserTie, faUsers, faChalkboardTeacher, faUniversity } from '@fortawesome/free-solid-svg-icons';
import Card from '../../components/Cards.js';

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
    const [degreesData, setDegreesData] = useState([]);
    const [selectedDegree, setSelectedDegree] = useState(null);
    const [loadingCourses, setLoadingCourses] = useState(false);
    const [loadingDegrees, setLoadingDegrees] = useState(true);

    const [presentation, setPresentation] = useState({
        course: '',
        assessment: '',
        group: [],
    });
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
      fetchFaculty();
    } catch (error) {
      console.error('Error fetching courses:', error);
      setCourses([]);
    } finally {
      setLoadingCourses(false);
    }
  }
  
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
    const handleCourseChange = (courseId) => {
        if (selectedCourse === courseId) {
            setSelectedCourse(null); // Deselect if clicked again
        } else {
            setSelectedCourse(courseId); // Select a new course
        }
    };
    return (
        <Header>
            <div style={styles.container}>
                <h1>FYP Scheduling</h1>


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
                     <div>
        <Card
  icon={faUsers}
  title="Total Groups"
  available={groups.length || 0}
  styles={styles}
/>
        </div>
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
                                    <th style={styles.tableHeader}>Action</th>
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
                    // <div key={i}>{member.student.username}</div>
                    <div key={i}>{member.student.user.first_name} {member.student.user.last_name}</div>
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
                        // label: facultyMember.user.username,
                        label: `${facultyMember.user.first_name} ${facultyMember.user.last_name}`,
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

