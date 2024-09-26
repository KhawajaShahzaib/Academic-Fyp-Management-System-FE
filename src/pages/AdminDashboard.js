import React, { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import Header from "../components/Header";

const AdminDashboard = () => {
    const { user } = useContext(AuthContext);


    return (
        <Header user={user}>
        
            
            <h1>Welcome {user.username} to the {user.user_type} Dashboard</h1>
        </Header>
    );
};


export default AdminDashboard;
