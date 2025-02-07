// import React, {useEffect, useState, useContext } from 'react';
// import Header from '../../components/Header';
// import styles from '../commonCSS/supervisorStyles.js';
// import AuthContext from '../../context/AuthContext.js';

// const TimetableUploadPage = () => {
//     const { authTokens } = useContext(AuthContext);
//     const [TimetableUpload, setTimetableUpload] = useState({
    
//         course:'',
//         file: null
       
//     });
//     const [courses, setCourses] = useState([]);

//     // Fetch courses on component mount
//     useEffect(() => {
//         const fetchCourses = async () => {
//             try {
//                 const response = await fetch('http://127.0.0.1:8000/api/fyp/courses/', {
//                     //Wow bro
//                     method: 'GET',
//                     headers: {
//                         'Content-Type': 'application/json',
//                         'Authorization': `Bearer ${authTokens.access}` // Use authTokens from context
//                     }
//                 });

//                 if (!response.ok) {
//                     throw new Error('Failed to fetch courses');
//                 }

//                 const data = await response.json();
//                 console.log("Fetched data: ", data);
//                 setCourses(data);
//             } catch (error) {
//                 console.error('Error fetching courses:', error); // Improved error logging
//             }
//         };

//         fetchCourses();
//     }, [authTokens.access]); // Added authTokens.access as a dependency
    

//     const handleSaveTimetableUpload = async () => {
//         console.log("Selected file: ", TimetableUpload.file); // Log the selected file

//         const formData = new FormData();
//         formData.append('course', TimetableUpload.course);
//         formData.append('file', TimetableUpload.file);

//         try {
//             const response = await fetch('http://127.0.0.1:8000/api/fyp/TimetableUpload/', {
//                 method: 'POST',
//                 headers: {
//                     'Authorization': `Bearer ${authTokens.access}` // Use authTokens from context
//                 },
//                 body: formData
//             });

//             if (response.ok) {
//                 alert('Timetable uploaded successfully!');
//                 setTimetableUpload({
//                     course:'',
//                     file: null
                 
//                 });
//             } else {
//                 const errorData = await response.json();
//                 alert('Error uploading Timetablen: ' + errorData.detail);
//                 console.error('Error details:', errorData);
//             }
//         } catch (error) {
//             console.error('Error uploading data:', error);
//         }
//     };

//     return (
//         <Header>
//             <section style={styles.section}>
//                 <h2 style={styles.sectionHeader}>Upload TimeTable</h2>

//                 <select
//                     style={styles.input}
//                     value={TimetableUpload.course}
//                     onChange={(e) => setTimetableUpload({ ...TimetableUpload, course: e.target.value })}
//                 >
//                     <option value="">Select Course</option>
//                     {courses.map(course => (
//                         <option key={course.course_id} value={course.course_id}>
//                             {course.course_code} - {course.course_name}
//                         </option>
//                     ))}
//                 </select>
            
//                 <input
//                     type="file"
//                     style={styles.input}
//                     onChange={(e) => setTimetableUpload({ ...TimetableUpload, file: e.target.files[0] })}
//                 />
               
//                 <button style={styles.button} onClick={handleSaveTimetableUpload}>Upload TimeTable</button>
//             </section>
//         </Header>
//     );
// }

// export default TimetableUploadPage;



import React, { useEffect, useState, useContext } from 'react';
import Header from '../../components/Header';
import styles from '../commonCSS/supervisorStyles.js';
import AuthContext from '../../context/AuthContext.js';
import axios from 'axios';

const TimetableUploadPage = () => {
    const { authTokens } = useContext(AuthContext);
    const [file, setFile] = useState(null); // Changed state to store only the file
    const [courseId, setCourseId] = useState(''); // State to store course ID

    const handleSaveTimetableUpload = async () => {
        const formData = new FormData();
        formData.append('file', file); // Correctly append the file to FormData
        formData.append('course', courseId); // Append the course ID

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/fyp/upload-timetable-json/', formData, {
                headers: {
                    'Authorization': `Bearer ${authTokens.access}`, // Use authTokens from context
                    'Content-Type': 'multipart/form-data' // Explicitly set Content-Type for multipart form
                }
            });

            if (response.status === 200 || response.status === 201) {
                alert('Timetable uploaded successfully!');
                // Optionally reset the file state if needed
            } else {
                alert('Error uploading timetable: ' + response.data.detail);
                console.error('Error details:', response.data);
            }
        } catch (error) {
            console.error('Error uploading data:', error);
        }
    };

    return (
        <Header>
            <section style={styles.section}>
                <h2 style={styles.sectionHeader}>Upload TimeTable</h2>

                <input
                    type="file"
                    style={styles.input}
                    onChange={(e) => setFile(e.target.files[0])} // Set the file state directly
                />

                <input
                    type="text"
                    placeholder="Enter Course ID"
                    value={courseId}
                    onChange={(e) => setCourseId(e.target.value)} // Set the course ID state
                />

                <button style={styles.button} onClick={handleSaveTimetableUpload}>Upload TimeTable</button>
            </section>
        </Header>
    );
}

export default TimetableUploadPage;

// import React, { useEffect, useState, useContext } from 'react';
// import Header from '../../components/Header';
// import styles from '../commonCSS/supervisorStyles.js';
// import AuthContext from '../../context/AuthContext.js';
// import axios from 'axios';
// import * as XLSX from 'xlsx'; // Import the XLSX library

// const TimetableUploadPage = () => {
//     const { authTokens } = useContext(AuthContext);
//     const [file, setFile] = useState(null);
//     const [courseId, setCourseId] = useState('');

//     const handleSaveTimetableUpload = async () => {
//         if (!file) {
//             alert('Please upload a file.');
//             return;
//         }

//         try {
//             // Read and parse the Excel file
//             const reader = new FileReader();
//             reader.onload = async (e) => {
//                 const data = new Uint8Array(e.target.result);
//                 const workbook = XLSX.read(data, { type: 'array' });
//                 const sheetName = workbook.SheetNames[0];
//                 const sheet = workbook.Sheets[sheetName];

//                 // Convert sheet data to JSON
//                 const jsonData = XLSX.utils.sheet_to_json(sheet);

//                 // Attach additional data (e.g., course ID)
//                 const payload = {
//                     course: courseId,
//                     timetable: jsonData,
//                 };

//                 console.log('Converted JSON:', payload);

//                 // Send JSON to the backend
//                 const response = await axios.post(
//                     'http://127.0.0.1:8000/api/fyp/upload-timetable-func/',
//                     payload,
//                     {
//                         headers: {
//                             'Authorization': `Bearer ${authTokens.access}`,
//                             'Content-Type': 'application/json', // JSON data
//                         },
//                     }
//                 );
//                 console.log("Sending msg: ", jsonData)
//                 if (response.status === 200) {
//                     alert('Timetable uploaded successfully!');
//                 } else {
//                     alert('Error uploading timetable: ' + response.data.detail);
//                     console.error('Error details:', response.data);
//                 }
//             };

//             reader.readAsArrayBuffer(file); // Read the file as an ArrayBuffer
//         } catch (error) {
//             console.error('Error processing file:', error);
//         }
//     };

//     return (
//         <Header>
//             <section style={styles.section}>
//                 <h2 style={styles.sectionHeader}>Upload TimeTable</h2>

//                 <input
//                     type="file"
//                     accept=".xlsx, .xls" // Accept only Excel files
//                     style={styles.input}
//                     onChange={(e) => setFile(e.target.files[0])}
//                 />

//                 <input
//                     type="text"
//                     placeholder="Enter Course ID"
//                     value={courseId}
//                     onChange={(e) => setCourseId(e.target.value)}
//                 />

//                 <button style={styles.button} onClick={handleSaveTimetableUpload}>
//                     Upload TimeTable
//                 </button>
//             </section>
//         </Header>
//     );
// };

// export default TimetableUploadPage;






