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

const TimetableUploadPage = () => {
    const { authTokens } = useContext(AuthContext);
    const [file, setFile] = useState(null); // Changed state to store only the file

    const handleSaveTimetableUpload = async () => {
        console.log("Selected file: ", file); // Log the selected file

        const formData = new FormData();
        formData.append('file', file); // Only append the file to form data

        try {
            const response = await fetch('http://127.0.0.1:8000/api/fyp/upload/', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${authTokens.access}` // Use authTokens from context
                },
                body: formData
            });

            if (response.ok) {
                alert('Timetable uploaded successfully!');
                setFile(null); // Reset the file state
            } else {
                const errorData = await response.json();
                alert('Error uploading timetable: ' + errorData.detail);
                console.error('Error details:', errorData);
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
               
                <button style={styles.button} onClick={handleSaveTimetableUpload}>Upload TimeTable</button>
            </section>
        </Header>
    );
}

export default TimetableUploadPage;




