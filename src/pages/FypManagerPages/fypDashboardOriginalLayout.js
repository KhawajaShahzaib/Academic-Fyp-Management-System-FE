import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Header from '../../components/Header';
import AuthContext from '../../context/AuthContext';
import styles from '../commonCSS/fypmanagerstyles.js';
import Dropdown1 from "../../components/Dropdown1.js";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';
import Card from '../../components/Cards.js';
import { faUserGraduate, faUserTie, faUsers, faChalkboardTeacher, faUniversity } from '@fortawesome/free-solid-svg-icons';
import Announcements from '../../components/Announcements.js';
const DbFypInch = () => {
    const [rooms, setRooms] = useState([]);
    const [newRoomName, setNewRoomName] = useState("");
    const { user, authTokens, currentRole } = useContext(AuthContext);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
      const [groupsByDegree, setGroupsByDegree] = useState([]);
      const [assessmentByDegree, setAssessmentByDegree] = useState([]);
      const data = groupsByDegree.map((degree) => ({
        name: degree.degree_name,
        totalGroups: degree.total_groups,
        project1Groups: degree.project1_groups,
        project2Groups: degree.project2_groups,
    }));
      const totalGroupsAcrossDegrees = data.reduce((sum, degree) => sum + degree.totalGroups, 0);
    const fypsection = [
            {
              title: 'Assessment Management',
              options: [
                { name: 'Manage External Assessment', link: '/external-assessmentpage' },
                { name: 'Manage Internal Assessment Criterias', link: '/create-assessmentpage'},
        
                { name: 'Upload Timetable for suggestions..', link: '/TimetableUploadPage' },
                { name: 'ViewPBLManagement', link: '/ViewPBLManagement' }
              ],
            },
            {
              title: 'Schedule Management',
              options: [
                { name: 'Schedule Presentation', link: '/batch-page'},
                // { name: 'Schedule Presentation', link: '/schedule-presentation'},
                { name: 'Manage Presentations', link: '/manage-presentations'},
                // { name: 'Manage Assessments', link: '/manage-assessmentpage'},
                // { name: 'Panel', link: '/invite-panelmember' },
                // { name: 'Manage Panel', link: '/manage-panelmember' }
                
              ],
            },
            {
              title: 'Task Management',
              options: [
                { name: 'Create Submission', link: '/create-submission'},
                { name: 'Manage Submission', link: '/manage-submission' }
              ],
            },
          ];


const renderAssessmentGraph = () => {
  // Prepare data for the graph
  const data = assessmentByDegree.flatMap((degree) =>
    degree.courses.map((course) => ({
      degree: degree.degree_name,
      course: course.course_name,
      totalAssessments: course.total_assessments,
      completedAssessments: course.completed_assessments,
      remainingAssessments: course.remaining_assessments,
    }))
  );

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const { degree, course } = payload[0].payload; // Getting degree and course info from the payload
      return (
        <div className="custom-tooltip" style={{ backgroundColor: '#fff', padding: '5px', border: '1px solid #ccc' }}>
          <p>{`Degree: ${degree}`}</p>
          <p>{`Course: ${course}`}</p>
          <p>{`Total Assessments: ${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
      <BarChart
        width={800}
        height={400}
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="degree" type="category" />
        <YAxis type="number" />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Bar dataKey="totalAssessments" fill="#8884d8" name="Total Assessments" />
        <Bar dataKey="completedAssessments" fill="#82ca9d" name="Scheduled/Completed" />
        <Bar dataKey="remainingAssessments" fill="#ffc658" name="Remaining" />
      </BarChart>
    </div>
  );
};

          
const renderGroupGraph = () => {
    return (
        <div style={{  justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <div>
                <h2>Groups</h2>
                {renderGroups()}
            </div>
            <div>
                <h3>Assessments</h3>
                {renderAssessmentGraph()}
            </div>
        </div>
    );
};
    const renderGroups = () => {
        // Prepare data for the graph
        const data = groupsByDegree.map((degree) => ({
          name: degree.degree_name,
          totalGroups: degree.total_groups,
          project1Groups: degree.project1_groups,
          project2Groups: degree.project2_groups,
        }));
      
        return (
    
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            
            <BarChart width={600} height={300} data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="totalGroups" fill="#8884d8" name="Total Groups" />
              <Bar dataKey="project1Groups" fill="#82ca9d" name="FYP1" />
              <Bar dataKey="project2Groups" fill="#ffc658" name="FYP2" />
            </BarChart>
          </div>
        );
      }

      useEffect(() => {
        const fetchGroups = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/fyp/total-groups/", {
                    headers: { Authorization: `Bearer ${authTokens.access}` }
                });
                setGroupsByDegree(response.data.groups_by_degree);
                setAssessmentByDegree(response.data.course_by_degree);
                console.log("Fetched groups by degree: ", response.data.course_by_degree);
            } catch (error) {
                console.error("Error fetching total groups:", error);
            }
        };
        fetchGroups();
    }, []);
    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/fyp/rooms/", {
                    headers: { Authorization: `Bearer ${authTokens.access}` },
                });
                setRooms(response.data);
            } catch (error) {
                console.error("Error fetching rooms:", error);
            }
        };
        fetchRooms();
    }, []);

    const handleAddRoom = async () => {
        try {
            const newRoomData = { name: newRoomName };
            const response = await axios.post("http://127.0.0.1:8000/api/fyp/rooms/", newRoomData, {
                headers: { Authorization: `Bearer ${authTokens.access}` },
            });
            setRooms([...rooms, response.data]);
            setNewRoomName("");
            alert("Room added successfully!");
        } catch (error) {
            console.error("Error adding room:", error);
            alert("Failed to add room.");
        }
    };

    const handleDeleteRoom = async (roomId) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/api/fyp/rooms/${roomId}/`, {
                headers: { Authorization: `Bearer ${authTokens.access}` },
            });
            setRooms(rooms.filter((room) => room.id !== roomId));
            alert("Room deleted successfully!");
        } catch (error) {
            console.error("Error deleting room:", error);
            alert("Failed to delete room.");
        }
    };

    const handleEditRoom = async (roomId, newName) => {
        try {
            const updatedRoomData = { name: newName };
            const response = await axios.put(`http://127.0.0.1:8000/api/fyp/rooms/${roomId}/`, updatedRoomData, {
                headers: { Authorization: `Bearer ${authTokens.access}` },
            });
            setRooms(rooms.map((room) => (room.id === roomId ? response.data : room)));
            alert("Room updated successfully!");
        } catch (error) {
            console.error("Error updating room:", error);
            alert("Failed to update room.");
        }
    };

    const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

    return (
        <>
            <Header>
            <Announcements />
                <section style={styles.section}>
                    <h2 style={styles.sectionHeader}>Welcome to {currentRole} Dashboard</h2>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

<Card
  icon={faUserTie}
  title="Supervisors"
  available={30}
  styles={styles}
/>

<Card
  icon={faUsers}
  title="Fyp Groups"
  available={totalGroupsAcrossDegrees}
  styles={styles}
/>

          </div>
                    <div> 
            {renderGroupGraph()}
            
          </div>     
                </section>
                <section style={styles.section}>
                    <Dropdown1 title="Fyp-Incharge" sections={fypsection} />
                    <section style={styles.section}>
                    <h3 style={styles.header}>
                        <button
                            style={styles.roleButton}
                            onClick={toggleDropdown}
                            className="room-dropdown-button"
                        >
                            Manage Rooms
                        </button>
                    </h3>

                    {isDropdownOpen && (
                        <div style={styles.Dropdown1}>
                            <table style={styles.table}>
                                <thead>
                                    <tr style={styles.tableHeaderRow}>
                                        <th style={styles.tableHeader}>Room Name</th>
                                        <th style={styles.tableHeader}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
    {rooms.map((room) => (
        <tr key={room.id} style={styles.tableRow}>
            <td style={styles.tableCell}>
                {room.isEditing ? (
                    <input
                        type="text"
                        defaultValue={room.name}
                        onChange={(e) => {
                            const updatedRooms = rooms.map((r) =>
                                r.id === room.id ? { ...r, tempName: e.target.value } : r
                            );
                            setRooms(updatedRooms);
                        }}
                        style={styles.roomInput}
                    />
                ) : (
                    room.name
                )}
            </td>
            <td style={styles.tableCell}>
                {room.isEditing ? (
                    <>
                        <button
                            style={styles.saveButton}
                            onClick={() =>
                                handleEditRoom(room.id, room.tempName || room.name)
                            }
                        >
                            Save
                        </button>
                        <button
                            style={styles.cancelButton}
                            onClick={() =>
                                setRooms(
                                    rooms.map((r) =>
                                        r.id === room.id ? { ...r, isEditing: false } : r
                                    )
                                )
                            }
                        >
                            Cancel
                        </button>
                    </>
                ) : (
                    <>
                        <button
                            style={styles.editButton}
                            onClick={() =>
                                setRooms(
                                    rooms.map((r) =>
                                        r.id === room.id ? { ...r, isEditing: true } : r
                                    )
                                )
                            }
                        >
                            Edit
                        </button>
                        <button
                            style={styles.deleteButton}
                            onClick={() => handleDeleteRoom(room.id)}
                        >
                            Delete
                        </button>
                    </>
                )}
            </td>
        </tr>
    ))}
</tbody>

                            </table>

                            <h4 style={styles.sectionHeader}>Add a New Room</h4>
                            <div style={styles.inputWrapper}>
                                <input
                                    type="text"
                                    placeholder="Room Name"
                                    value={newRoomName}
                                    onChange={(e) => setNewRoomName(e.target.value)}
                                    style={styles.roomInput}
                                />
                                <button
                                    onClick={handleAddRoom}
                                    style={styles.actionButton}
                                >
                                    Add Room
                                </button>
                            </div>
                        </div>
                    )}
                </section>
                </section>

                
            </Header>
            
        </>
    );
};

export default DbFypInch;