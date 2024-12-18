// src/App.js
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react'; // Import useState here
import RouteGuard from './utils/RouteGuard';
import { AuthProvider } from './context/AuthContext';
import RoleSelectionPage from './pages/roleSelection.js';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import CoursePage from './pages/CoursePage';
import AdminDashboard from './pages/AdminDashboard';
import FacultyDashboard from './pages/SupervisorPages/FacultyDashboard.js';
import StudentDashboard from './pages/StudentPages/StudentDashboard';
import PanelMember from './pages/PanelPages/PanelMember.js';
import DirectorDashboard from './pages/DirectorPages/DirectorDashboard.js';
import FypDasboard from './pages/FypManagerPages/FypDashboard.js';

// Supervisor Related Imports
import AssignedGroups from './pages/SupervisorPages/assigned-groups.js';
import ManageSpecialization from './pages/SupervisorPages/manage-specialization.js';
import SupervisionRequests from './pages/SupervisorPages/supervision-requests.js';
import ScheduleMeetings from './pages/SupervisorPages/schedule-meetings.js';
import GroupMeetings from './pages/SupervisorPages/view-meetings.js';
import ShareIdeas from './pages/SupervisorPages/share-ideas.js';

// Director
import AssignFypManager from './pages/DirectorPages/AssignFypManager.js';
import ViewProgress from './pages/DirectorPages/ViewProgress.js';

// Student Pages
import ProjectSubmissions from './pages/StudentPages/ProjectSubmissions';
import ProjectIdeas from './pages/StudentPages/ProjectIdeas';
import CreateGroup from './pages/StudentPages/CreateGroup';
import AddGroupMember from './pages/StudentPages/AddGroupMember.js';

import ViewGroupInvitation from './pages/StudentPages/ViewGroupInvitation.js';
import RequestSupervisor from './pages/StudentPages/RequestSupervisor.js';
import ScheduleSupervisorMeeting from './pages/StudentPages/ScheduleSupervisorMeeting.js';
function App() {
    const [members, setMembers] = useState([]); // State for group members
    const [groups, setGroups] = useState([]); // Ensure invitations are always initialized as an empty array if no invitations exist
    
  
    // Function to add a new member
    const handleCreateGroup = (newMember) => {
      setMembers((prevMembers) => [...prevMembers, newMember]); // Add new member to the list
    };
  
    // Function to remove a member
    const handleRemoveMember = (groupIndex) => {
      setMembers((prevMembers) => prevMembers.filter((member, index) => index !== groupIndex)); // Remove member from list
    };
  
    // Function to create a group
    const handleAddMember = (groupData) => {
      setGroups((prevGroups) => [...prevGroups, groupData]); // Add a new group to the list
    };
  
    // Function to accept a group invitation (add group to members)
    const acceptGroupInvitation = (group) => {
      setMembers((prevMembers) => [...prevMembers, group]); // Add the group to the members
      // Optionally, you can also update the groups state to indicate the invitation is accepted
      setGroups((prevGroups) => prevGroups.filter((g) => g !== group)); // Remove group from the invitations
    };
  
    // Function to reject a group invitation (remove from groups)
    const rejectGroupInvitation = (group) => {
      setGroups((prevGroups) => prevGroups.filter((g) => g !== group)); // Remove group from invitations
    };

    return (
        <div className="App">
            <Router>
                <AuthProvider>
                    <Routes>
                        {/* Paths for login, dashboard */}
                        <Route path="/" element={<RouteGuard element={<HomePage />} />} exact />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/role-selection" element={<RoleSelectionPage />} />
                        <Route path="/course" element={<CoursePage />} />
                        <Route path="/admin-dashboard" element={<RouteGuard element={<AdminDashboard />} />} />
                        <Route path="/faculty-dashboard" element={<RouteGuard element={<FacultyDashboard />} />} />
                        <Route path="/student-dashboard" element={<RouteGuard element={<StudentDashboard />} />} />
                        <Route path="/panel-member-dashboard" element={<RouteGuard element={<PanelMember />} />} />
                        <Route path="/director-dashboard" element={<RouteGuard element={<DirectorDashboard />} />} />
                        <Route path="/fyp-dashboard" element={<RouteGuard element={<FypDasboard />} />} />

                        {/* Supervisor Pages */}
                        <Route path="/manage-specialization" element={<RouteGuard element={<ManageSpecialization />} />} />
                        <Route path="/supervision-requests" element={<RouteGuard element={<SupervisionRequests />} />} />
                        <Route path="/schedule-meetings" element={<RouteGuard element={<ScheduleMeetings />} />} />
                        <Route path="/view-meetings" element={<RouteGuard element={<GroupMeetings />} />} />
                        <Route path="/assigned-groups" element={<RouteGuard element={<AssignedGroups />} />} />
                        <Route path="/share-ideas" element={<RouteGuard element={<ShareIdeas />} />} />

                        {/* Director Pages */}
                        <Route path="/AssignFypManager" element={<RouteGuard element={<AssignFypManager />} />} />
                        <Route path="/ViewProgress" element={<RouteGuard element={<ViewProgress />} />} />
                        
                        {/* Student Pages */}
                        <Route path="/project-submissions" element={<RouteGuard element={<ProjectSubmissions />} />} />
                        <Route path="/project-ideas" element={<RouteGuard element={<ProjectIdeas />} />} />
                        <Route path="/create-group" element={<RouteGuard element={<CreateGroup />} />} />
                        <Route path="/add-group-member" element={<RouteGuard element={<AddGroupMember onAddGroupMember={handleAddMember} />} />} />
           
            
            <Route
              path="/view-group-invitation" element={<RouteGuard element={<ViewGroupInvitation groups={groups} setMembers={setMembers} 
                      acceptInvitation={acceptGroupInvitation}
                      rejectInvitation={rejectGroupInvitation}
                    />
                  }
                />
              }
            />
             <Route path="/request-supervisor" element={<RouteGuard element={<RequestSupervisor />} />} />
             <Route path="/schedule-supervisor-meeting" element={<RouteGuard element={<ScheduleSupervisorMeeting />} />} />
                    </Routes>
                </AuthProvider>
            </Router>
        </div>
    );
}

export default App;
