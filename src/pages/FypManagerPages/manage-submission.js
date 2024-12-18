import React, { useState } from 'react';
import styles from '../commonCSS/supervisorStyles'; // Using the same CSS you provided
import '../../components/HeaderMe.css'; // Ensure your CSS is applied

// import ExcelGenerator from "../components/excelGenerator.js";
import Header from "../../components/Header";

const ManageSubmissions = () => {
    const [submissions, setSubmissions] = useState([
        // Dummy data for example purposes
        { id: 1, title: 'Project 1', description: 'Description 1', batch: "Fall 2021", file: 'file1.pdf', deadline: '2024-09-30' },
        { id: 2, title: 'Project 2', description: 'Description 2', batch: "Spring 2021", file: 'file2.pdf', deadline: '2024-10-05' }
    ]);

    const [selectedBatch, setSelectedBatch] = useState('');

    // Functions to handle actions
    const handleEdit = (id) => {
        alert(`Editing submission with id ${id}`);
    };

    const handleDelete = (id) => {
        setSubmissions(submissions.filter(sub => sub.id !== id));
        alert(`Deleted submission with id ${id}`);
    };

    const handleDownload = (file) => {
        alert(`Downloading file: ${file}`);
    };

    const filteredSubmissions = submissions.filter(sub => 
        selectedBatch === '' || sub.batch === selectedBatch
    );

    return (
        <Header>
        <section style={styles.section}>
            <h2 style={styles.sectionHeader}>Manage Submissions</h2>
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
                {filteredSubmissions.map(sub => (
                    <div key={sub.id} style={styles.card}>
                        <h3>{sub.title}</h3>
                        <p>{sub.description}</p>
                        <p><strong>Batch:</strong> {sub.batch}</p>
                        <p><strong>Deadline:</strong> {sub.deadline}</p>
                        <button style={styles.button} onClick={() => handleEdit(sub.id)}>Edit</button>
                        <button style={styles.button} onClick={() => handleDelete(sub.id)}>Delete</button>
                        <button style={styles.button} onClick={() => handleDownload(sub.file)}>Download</button>
                    </div>
                ))}
            </div>
        </section>
        </Header>
    );
};

export default ManageSubmissions;







// import React, { useState, useEffect } from 'react';
// import styles from '../commonCSS/supervisorStyles.js';
// import '../../components/HeaderMe.css';
// import Header from '../../components/Header';

// const ManageSubmissions = () => {
//     const [submissions, setSubmissions] = useState([]);
//     const [editingSubmission, setEditingSubmission] = useState(null);  // Track if we are editing a submission

//     useEffect(() => {
//         // Fetch submissions from the API
//         fetch('/api/submissions/')
//             .then(response => response.json())
//             .then(data => setSubmissions(data))
//             .catch(error => console.error('Error fetching submissions:', error));
//     }, []);

//     const handleDelete = (id) => {
//         if (window.confirm('Are you sure you want to delete this submission?')) {
//             fetch(`/api/submissions/${id}/`, {
//                 method: 'DELETE',
//             }).then(() => {
//                 setSubmissions(submissions.filter(sub => sub.id !== id));
//             });
//         }
//     };

//     const handleEdit = (submission) => {
//         setEditingSubmission(submission);  // Load the selected submission into the editing state
//     };

//     const handleSaveEdit = (id) => {
//         // API call to save the edited submission
//         fetch(`/api/submissions/${id}/`, {
//             method: 'PUT',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(editingSubmission),
//         }).then(() => {
//             setSubmissions(
//                 submissions.map(sub => (sub.id === id ? editingSubmission : sub))
//             );
//             setEditingSubmission(null);  // Exit edit mode
//         });
//     };

//     const handleDownload = (fileUrl) => {
//         window.open(fileUrl, '_blank');  // Open the file in a new tab for download
//     };

//     return (
//         <Header>
//             <section style={styles.section}>
//                 <h2 style={styles.sectionHeader}>Manage Submissions</h2>
                
//                 {/* Display the list of submissions */}
//                 <ul style={styles.list}>
//                     {submissions.map(submission => (
//                         <li key={submission.id} style={styles.listItem}>
//                             {editingSubmission?.id === submission.id ? (
//                                 // Render edit form if we are editing this submission
//                                 <>
//                                     <input
//                                         type="text"
//                                         style={styles.input}
//                                         value={editingSubmission.title}
//                                         onChange={(e) => setEditingSubmission({ ...editingSubmission, title: e.target.value })}
//                                     />
//                                     <textarea
//                                         style={styles.textarea}
//                                         value={editingSubmission.description}
//                                         onChange={(e) => setEditingSubmission({ ...editingSubmission, description: e.target.value })}
//                                     ></textarea>
//                                     <button style={styles.button} onClick={() => handleSaveEdit(submission.id)}>Save</button>
//                                 </>
//                             ) : (
//                                 <>
//                                     <h3>{submission.title}</h3>
//                                     <p>{submission.description}</p>
//                                     <p>Batch: {submission.batch}</p>
//                                     <p>Deadline: {submission.deadline}</p>

//                                     <button style={styles.button} onClick={() => handleDownload(submission.file)}>Download</button>
//                                     <button style={styles.button} onClick={() => handleEdit(submission)}>Edit</button>
//                                     <button style={styles.button} onClick={() => handleDelete(submission.id)}>Delete</button>
//                                 </>
//                             )}
//                         </li>
//                     ))}
//                 </ul>
//             </section>
//         </Header>
//     );
// };

// export default ManageSubmissions;

