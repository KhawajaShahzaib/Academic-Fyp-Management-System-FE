import React, { useState } from 'react';
import styles from '../commonCSS/supervisorStyles'; // Ensure your CSS is applied
import Header from "../../components/Header";

const ManageInvitations = () => {
    // Dummy data for invitations
    const [invitations, setInvitations] = useState([
        { id: 1, panelMemberName: 'John Doe', details: 'Evaluate FYP Group 1 (Machine Learning)', status: 'accepted' },
        { id: 2, panelMemberName: 'Jane Smith', details: 'Evaluate FYP Group 2 (Web Development)', status: 'rejected' },
        { id: 3, panelMemberName: 'Samuel Green', details: 'Evaluate FYP Group 3 (Data Science)', status: 'accepted' },
        { id: 4, panelMemberName: 'Lisa Brown', details: 'Evaluate FYP Group 4 (Cybersecurity)', status: 'rejected' }
    ]);

    const handleResend = (invitationId) => {
        // Mocking resend logic for now
        alert(`Resending invitation for ID: ${invitationId}`);
        // Update the status of the rejected invitation to 'resent' (for display purposes)
        setInvitations(prevInvitations => prevInvitations.map(inv =>
            inv.id === invitationId ? { ...inv, status: 'resent' } : inv
        ));
    };

    return (
        <Header>
            <div style={styles.container}>
                <h1>Manage Panel Invitations</h1>
                {invitations.length > 0 ? invitations.map(invitation => (
                    <div key={invitation.id} style={styles.invitation}>
                        <p><strong>Panel Member:</strong> {invitation.panelMemberName}</p>
                        <p><strong>Details:</strong> {invitation.details}</p>
                        <p><strong>Status:</strong> {invitation.status}</p>
                        {/* Show "Resend" button only if status is 'rejected' */}
                        {invitation.status === 'rejected' && (
                            <button onClick={() => handleResend(invitation.id)} style={styles.button}>
                                Resend Invitation
                            </button>
                        )}
                    </div>
                )) : <p>No invitations found.</p>}
            </div>
        </Header>
    );
};

export default ManageInvitations;
