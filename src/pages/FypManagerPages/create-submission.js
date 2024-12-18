// import styles from '../commonCSS/supervisorStyles.js'
// import React, { useState, useContext } from 'react';
// import '../../components/HeaderMe.css'; // Ensure your CSS is applied

// // import ExcelGenerator from "../components/excelGenerator.js";
// import Header from "../../components/Header";

// const CreateSubmission = () => {
//   // const { user } = useContext(AuthContext);

//   // const currentUserRole = user.user_type; 
//     const [submission, setSubmission] = useState({
//         title: '',
//         description: '',
//         supervisor: '',
//         domain: '',
//         preferredDegree: ''
//       });
//       const handleSaveSubmission = () => {
//         alert('FYP Submission saved locally!');
//         setSubmission({
//           title: '',
//           description: '',
//           file: '',
//           batch: '',
//           deadline: ''
//         });
//       };    
//     return (
//       <Header>
//         <section style={styles.section}>
//               <h2 style={styles.sectionHeader}>Create Submission</h2>
//               <input
//                 type="text"
//                 style={styles.input}
//                 value={submission.title}
//                 onChange={(e) => setSubmission({ ...submission, title: e.target.value })}
//                 placeholder="Title"
//               />
//               <textarea
//                 style={styles.textarea}
//                 value={submission.description}
//                 onChange={(e) => setSubmission({ ...submission, description: e.target.value })}
//                 placeholder="Description"
//               ></textarea>

//               <input
//                 type="file"
//                 style={styles.input}
//                 value={submission.file}
//                 onChange={(e) => setSubmission({ ...submission, file: e.target.value })}
//                 placeholder="Upload Document"
//               ></input>
            
//               <select
//                 style={styles.input}
//                 value={submission.batch}
//                 onChange={(e) => setSubmission({ ...submission, batch: e.target.value })}
//               >
//                 <option value="">Select Course</option>
//                 <option value="Bachelor's">Fall 2021</option>
//                 <option value="Master's">Spring 2021</option>
//               </select>
//               <input
//                 type="date"
//                 style={styles.input}
//                 value={submission.deadline}
//                 onChange={(e) => setSubmission({ ...submission, deadline: e.target.value })}
//                 placeholder="Set DeadLine"
//               />
              
//               <button style={styles.button} onClick={handleSaveSubmission}>Create Submission</button>
//             </section>
//             </Header>
     
//       );

// }

//   export default CreateSubmission;
 
// above is original



import React, { useEffect, useState, useContext } from 'react';
import Header from '../../components/Header';
import styles from '../commonCSS/supervisorStyles.js';
import AuthContext from '../../context/AuthContext.js';

const CreateSubmission = () => {
    const { authTokens } = useContext(AuthContext);
    const [submission, setSubmission] = useState({
        title: '',
        description: '',
        file: null,
        course: '',
        deadline: ''
    });
    const [courses, setCourses] = useState([]);

    // Fetch courses on component mount
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/fyp/courses/', {
                    //Wow bro
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${authTokens.access}` // Use authTokens from context
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch courses');
                }

                const data = await response.json();
                console.log("Fetched data: ", data);
                setCourses(data);
            } catch (error) {
                console.error('Error fetching courses:', error); // Improved error logging
            }
        };

        fetchCourses();
    }, [authTokens.access]); // Added authTokens.access as a dependency

    const handleSaveSubmission = async () => {
        const formData = new FormData();
        formData.append('title', submission.title);
        formData.append('description', submission.description);
        formData.append('course', submission.course);
        formData.append('file', submission.file);
        formData.append('deadline', submission.deadline);

        try {
            const response = await fetch('http://127.0.0.1:8000/api/fyp/submissions/', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${authTokens.access}` // Use authTokens from context
                },
                body: formData
            });

            if (response.ok) {
                alert('Submission created successfully!');
                setSubmission({
                    title: '',
                    description: '',
                    file: null,
                    course: '',
                    deadline: ''
                });
            } else {
                const errorData = await response.json();
                alert('Error creating submission: ' + errorData.detail);
                console.error('Error details:', errorData);
            }
        } catch (error) {
            console.error('Error submitting data:', error);
        }
    };

    return (
        <Header>
            <section style={styles.section}>
                <h2 style={styles.sectionHeader}>Create Submission</h2>
                <input
                    type="text"
                    style={styles.input}
                    value={submission.title}
                    onChange={(e) => setSubmission({ ...submission, title: e.target.value })}
                    placeholder="Title"
                />
                <textarea
                    style={styles.textarea}
                    value={submission.description}
                    onChange={(e) => setSubmission({ ...submission, description: e.target.value })}
                    placeholder="Description"
                ></textarea>
                <input
                    type="file"
                    style={styles.input}
                    onChange={(e) => setSubmission({ ...submission, file: e.target.files[0] })}
                />
                <select
                    style={styles.input}
                    value={submission.course}
                    onChange={(e) => setSubmission({ ...submission, course: e.target.value })}
                >
                    <option value="">Select Course</option>
                    {courses.map(course => (
                        <option key={course.course_id} value={course.course_id}>
                            {course.course_code} - {course.course_name}
                        </option>
                    ))}
                </select>
                <input
                    type="date"
                    style={styles.input}
                    value={submission.deadline}
                    onChange={(e) => setSubmission({ ...submission, deadline: e.target.value })}
                />
                <button style={styles.button} onClick={handleSaveSubmission}>Create Submission</button>
            </section>
        </Header>
    );
}

export default CreateSubmission;
