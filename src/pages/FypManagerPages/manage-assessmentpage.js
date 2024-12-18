// import React from 'react';
// import Header from "../../components/Header";
// import styles from '../commonCSS/fypmanagerstyles';

// const ManageAssessmentPage = () => {
//     // Dummy data for assessments
//     const assessments = [
//         { id: 1, name: 'Proposal Defence', date: '2024-10-15', batch: '2024' },
//         { id: 2, name: 'Mid-Term Evaluation', date: '2024-11-01', batch: '2023' },
//         { id: 3, name: 'Final Defence', date: '2024-12-05', batch: '2022' },
//         { id: 4, name: 'Progress Evaluation', date: '2024-09-30', batch: '2024' }
//     ];

//     const downloadSheet = (assessmentId) => {
//         alert(`Downloading sheet for assessment ${assessmentId}`);
//         // Implement sheet download functionality here
//     };

//     const viewAssessment = (assessmentId) => {
//         alert(`Viewing assessment ${assessmentId}`);
//         // Implement view functionality here (e.g., navigate to detailed view page)
//     };

//     return (
//         <Header>
//             <div style={styles.container}>
//                 <h1>Manage Assessments</h1>
//                 <table style={styles.table}>
//                     <thead>
//                         <tr style={styles.tableHeaderRow}>
//                             <th style={styles.tableHeader}>Assessment Name</th>
//                             <th style={styles.tableHeader}>Batch</th>
//                             <th style={styles.tableHeader}>Date</th>
//                             <th style={styles.tableHeader}>Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {assessments.map(assessment => (
//                             <tr key={assessment.id} style={styles.tableRow}>
//                                 <td style={styles.tableCell}>{assessment.name}</td>
//                                 <td style={styles.tableCell}>{assessment.batch}</td>
//                                 <td style={styles.tableCell}>{assessment.date}</td>
//                                 <td style={styles.tableCell}>
//                                     <button 
//                                         onClick={() => downloadSheet(assessment.id)} 
//                                         style={styles.downloadButton}
//                                     >
//                                         Download Sheet
//                                     </button>
//                                     <button 
//                                         onClick={() => viewAssessment(assessment.id)} 
//                                         style={styles.dropdownButton} // Using existing style for View button
//                                     >
//                                         View
//                                     </button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </Header>
//     );
// };

// export default ManageAssessmentPage;


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from "../../components/Header";
import styles from '../commonCSS/fypmanagerstyles';

const ManageAssessmentPage = () => {
    // Dummy data for assessments
    const allAssessments = [
        { id: 1, name: 'Proposal Defence', date: '2024-10-15', batch: '2024' },
        { id: 2, name: 'Mid-Term Evaluation', date: '2024-11-01', batch: '2023' },
        { id: 3, name: 'Final Defence', date: '2024-12-05', batch: '2022' },
        { id: 4, name: 'Progress Evaluation', date: '2024-09-30', batch: '2024' }
    ];

    const [selectedBatch, setSelectedBatch] = useState('');
    const [assessments, setAssessments] = useState(allAssessments); // Initially show all assessments

    // Handle batch selection change
    const handleBatchChange = (e) => {
        const batch = e.target.value;
        setSelectedBatch(batch);
        if (batch) {
            setAssessments(allAssessments.filter(a => a.batch === batch));
        } else {
            setAssessments(allAssessments); // Reset to show all assessments if no batch is selected
        }
    };

    const downloadSheet = (assessmentId) => {
        alert(`Downloading sheet for assessment ${assessmentId}`);
        // Implement sheet download functionality here
    };

    const viewAssessment = (assessmentId) => {
        alert(`Viewing assessment ${assessmentId}`);
        // Implement view functionality here (e.g., navigate to detailed view page)
    };

    const createAssessment = (assessmentId) => {
        alert(`Creating assessment related to ${assessmentId}`);
        // Implement navigation to create assessment page for this specific assessment
    };

    return (
        <Header>
            <div style={styles.container}>
                <h1>Manage Assessments</h1>
                
                {/* Batch Selection Dropdown */}
                <div style={styles.batchSelector}>
                    <label style={styles.label}>Select Batch:</label>
                    <select 
                        value={selectedBatch} 
                        onChange={handleBatchChange} 
                        style={styles.input}
                    >
                        <option value="">All Batches</option>
                        <option value="2024">2024</option>
                        <option value="2023">2023</option>
                        <option value="2022">2022</option>
                    </select>
                </div>
                
                <table style={styles.table}>
                    <thead>
                        <tr style={styles.tableHeaderRow}>
                            <th style={styles.tableHeader}>Assessment Name</th>
                            <th style={styles.tableHeader}>Batch</th>
                            <th style={styles.tableHeader}>Date</th>
                            <th style={styles.tableHeader}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {assessments.map(assessment => (
                            <tr key={assessment.id} style={styles.tableRow}>
                                <td style={styles.tableCell}>{assessment.name}</td>
                                <td style={styles.tableCell}>{assessment.batch}</td>
                                <td style={styles.tableCell}>{assessment.date}</td>
                                <td style={styles.tableCell}>
                                    <button 
                                        onClick={() => downloadSheet(assessment.id)} 
                                        style={styles.downloadButton}
                                    >
                                        Download Sheet
                                    </button>
                                    <button 
                                        onClick={() => viewAssessment(assessment.id)} 
                                        style={styles.dropdownButton} // Using existing style for View button
                                    >
                                        View
                                    </button>
                                    <button 
                                        onClick={() => createAssessment(assessment.id)} 
                                        style={styles.createButton}
                                    >
                                        Create Assessment
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Header>
    );
};

export default ManageAssessmentPage;
