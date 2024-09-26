import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import RouteGuard from './utils/RouteGuard';
import { AuthProvider } from './context/AuthContext';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import CoursePage from "./pages/CoursePage";
import AdminDashboard from './pages/AdminDashboard';
import FacultyDashboard from './pages/SupervisorPages/FacultyDashboard.js';
import StudentDashboard from './pages/StudentPages/StudentDashboard';
import PanelMember from './pages/PanelPages/PanelMember.js'
import DirectorDashboard from './pages/DirectorPages/DirectorDashboard.js'
import FypDasboard from './pages/FypManagerPages/FypDashboard.js'
//Supervisor Related Imports by Khwaja Shahzaib
import AssignedGroups from './pages/SupervisorPages/assigned-groups.js';
import ManageSpecialization from './pages/SupervisorPages/manage-specialization.js';
import SupervisionRequests from './pages/SupervisorPages/supervision-requests.js';
import ScheduleMeetings from './pages/SupervisorPages/schedule-meetings.js';
import GroupMeetings from './pages/SupervisorPages/view-meetings.js';
import ShareIdeas from './pages/SupervisorPages/share-ideas.js';
// Dont Bother Changing, Other NUBS


function App() {
    return (
        <div className="App">
            <Router>
                <AuthProvider>
                    <Routes>
                        {/* Paths for login, dashboard */}
                        <Route path="/" element={<RouteGuard element={<HomePage />} />} exact />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/course" element={<CoursePage />} />
                        <Route path="/admin-dashboard" element={<RouteGuard element={<AdminDashboard />} />} />
                        <Route path="/faculty-dashboard" element={<RouteGuard element={<FacultyDashboard />} />} />
                        <Route path="/student-dashboard" element={<RouteGuard element={<StudentDashboard />} />} />
                        <Route path="/panel-member-dashboard" element={<RouteGuard element={<PanelMember />} />} />
                        <Route path="/director-dashboard" element={<RouteGuard element={<DirectorDashboard />} />} />
                        <Route path="/fyp-dashboard" element={<RouteGuard element={<FypDasboard/>} />} />
                        
                        {/* Supervisor Pages Added */}
                        <Route path="/manage-specialization" element={<RouteGuard element={<ManageSpecialization/>} />} />
                        <Route path="/supervision-requests" element={<RouteGuard element={<SupervisionRequests/>} />} />
                        <Route path="/schedule-meetings" element={<RouteGuard element={<ScheduleMeetings/>} />} />
                        <Route path="/view-meetings" element={<RouteGuard element={<GroupMeetings/>} />} />
                        <Route path="/assigned-groups" element={<RouteGuard element={<AssignedGroups/>} />} />
                        <Route path="/share-ideas" element={<RouteGuard element={<ShareIdeas/>} />} />
                    </Routes>
                </AuthProvider>
            </Router>
        </div>
    );
}

export default App;

// import React, { useContext } from 'react';
// import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
// import AuthContext from './context/AuthContext';
// import LoginPage from './components/LoginPage';
// import AdminDashboard from './components/AdminDashboard';
// import FacultyDashboard from './components/FacultyDashboard';
// import StudentDashboard from './components/StudentDashboard';

// const App = () => {
//     const { user } = useContext(AuthContext);

//     // Function to return the correct dashboard based on user_type
//     const getDashboard = () => {
//         if (user?.user_type === 'admin') {
//             return <AdminDashboard />;
//         } else if (user?.user_type === 'faculty') {
//             return <FacultyDashboard />;
//         } else if (user?.user_type === 'student') {
//             return <StudentDashboard />;
//         } else {
//             return <Navigate to="/login" />;
//         }
//     };

//     return (
//         <Router>
//             <Routes>
//                 <Route path="/login" element={<LoginPage />} />
//                 {/* Only logged-in users can access dashboard */}
//                 <Route path="/dashboard" element={user ? getDashboard() : <Navigate to="/login" />} />
//             </Routes>
//         </Router>
//     );
// };

// export default App;

