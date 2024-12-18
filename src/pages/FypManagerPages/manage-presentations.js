import React, { useState } from 'react';
import styles from '../commonCSS/supervisorStyles'; // Using the same CSS you provided
import '../../components/HeaderMe.css'; // Ensure your CSS is applied
import Header from "../../components/Header";

const ManagePresentations = () => {
    const [presentations, setPresentations] = useState([
        // Dummy data for example purposes
        { id: 1, title: 'Presentation 1', scheduled_time: '2024-09-30T10:00', batch: 'Fall 2021', student_group: 'Group A', room_no: '101' },
        { id: 2, title: 'Presentation 2', scheduled_time: '2024-10-05T11:00', batch: 'Spring 2021', student_group: 'Group B', room_no: '102' }
    ]);

    const [selectedBatch, setSelectedBatch] = useState('');

    // Functions to handle actions
    const handleEdit = (id) => {
        alert(`Editing presentation with id ${id}`);
    };

    const filteredPresentations = presentations.filter(presentation => 
        selectedBatch === '' || presentation.batch === selectedBatch
    );

    return (
        <Header>
            <section style={styles.section}>
                <h2 style={styles.sectionHeader}>Manage Presentations</h2>
                <select
                    style={styles.input}
                    value={selectedBatch}
                    onChange={(e) => setSelectedBatch(e.target.value)}
                >
                    <option value="">All Batches</option>
                    <option value="Fall 2021">Batch Fall 2021</option>
                    <option value="Spring 2021">Batch Spring 2021</option>
                </select>

                <div style={styles.cardContainer}>
                    {filteredPresentations.map(presentation => (
                        <div key={presentation.id} style={styles.card}>
                            <h3>{presentation.title}</h3>
                            <p><strong>Scheduled Time:</strong> {new Date(presentation.scheduled_time).toLocaleString()}</p>
                            <p><strong>Batch:</strong> {presentation.batch}</p>
                            <p><strong>Student Group:</strong> {presentation.student_group}</p>
                            <p><strong>Room Number:</strong> {presentation.room_no}</p>
                            <button style={styles.button} onClick={() => handleEdit(presentation.id)}>Edit</button>
                        </div>
                    ))}
                </div>
            </section>
        </Header>
    );
};

export default ManagePresentations;
