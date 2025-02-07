// import React, { useState, useEffect, useContext } from 'react';
// import styles from '../commonCSS/supervisorStyles'; // Using the same CSS you provided
// import Header from "../../components/Header";
// import axios from 'axios';
// import AuthContext from '../../context/AuthContext.js';

// const ExternalAssessment = () => {
//     // Initialize state for the form
//     const { authTokens } = useContext(AuthContext);
//     const [title, setTitle] = useState('');
//     const [description, setDescription] = useState('');
//     const [presentationRequired, setPresentationRequired] = useState(false);
//     const [selectedCourse, setSelectedCourse] = useState('');
//     const [weightage, setWeightage] = useState('');
//     const [selectedCLO, setSelectedCLO] = useState('');
//     const [courses, setCourses] = useState([]);
//     const [clos, setCLOs] = useState([]);

//     // Fetch courses and CLOs from the API
//     useEffect(() => {
//         const fetchCourses = async () => {
//             try {
//                 const response = await axios.get('http://127.0.0.1:8000/api/fyp/courses/', {
                    
//                     headers: {
//                         'Content-Type': 'application/json',
//                         'Authorization': `Bearer ${authTokens.access}` // Use authTokens from context
//                     }
//                 });
//                 setCourses(response.data);
//             } catch (error) {
//                 console.error('Error fetching courses:', error);
//             }
//         };

//         const fetchCLOs = async () => {
//             try {
//                 const response = await fetch(`http://127.0.0.1:8000/api/fyp/clos/`, {
//                     //Wow bro
//                     method: 'GET',
//                     headers: {
//                         'Content-Type': 'application/json',
//                         'Authorization': `Bearer ${authTokens.access}` // Use authTokens from context
//                     }
//                 });

//                 if (!response.ok) {
//                     throw new Error('Failed to fetch clo');
//                 }

//                 const data = await response.json();
//                 console.log("Fetched data: ", data);
//                 setCLOs(data);
//             } catch (error) {
//                 console.error('Error fetching clo:', error); // Improved error logging
//             }
//         };
    
        

//         fetchCourses();
//         fetchCLOs();
//     }, []);

//     // Handle form submission
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const assessmentData = {
//             name: title,
//             description,
//             presentation_required: presentationRequired,
//             course: selectedCourse,
//             weightage: parseFloat(weightage),
//             clos: [selectedCLO], // This should be an array of CLOs
//         };

//         try {
//             await axios.post('http://127.0.0.1:8000/api/fyp/assessments/', assessmentData, {
//                 headers: {
//                     'Authorization': `Bearer ${authTokens.access}` // Use authTokens from context
//                 },
//             });
//             alert('Assessment Submitted Successfully');
//             resetForm();
//         } catch (error) {
//             console.error('Error submitting assessment:', error);
//             alert('Failed to submit assessment');
//         }
//     };

//     // Reset form fields
//     const resetForm = () => {
//         setTitle('');
//         setDescription('');
//         setPresentationRequired(false);
//         setSelectedCourse('');
//         setWeightage('');
//         setSelectedCLO('');
//     };

//     return (
//         <Header>
//             <section style={styles.section}>
//                 <h2 style={styles.sectionHeader}>External Assessment</h2>
//                 <form onSubmit={handleSubmit}>
//                     {/* Title */}
//                     <div>
//                         <label style={styles.label}>Title</label>
//                         <input
//                             type="text"
//                             value={title}
//                             onChange={(e) => setTitle(e.target.value)}
//                             style={styles.input}
//                             required
//                         />
//                     </div>

//                     {/* Description */}
//                     <div>
//                         <label style={styles.label}>Description</label>
//                         <textarea
//                             value={description}
//                             onChange={(e) => setDescription(e.target.value)}
//                             style={styles.textarea}
//                             required
//                         ></textarea>
//                     </div>

//                     {/* Presentation Required */}
//                     <div style={{ margin: '10px 0' }}>
//                         <input
//                             type="checkbox"
//                             checked={presentationRequired}
//                             onChange={() => setPresentationRequired(!presentationRequired)}
//                             style={styles.checkbox}
//                         />
//                         <label style={styles.label}>Presentation Required</label>
//                     </div>

//                     {/* Course Selection */}
//                     <div>
//                         <label style={styles.label}>Select Course</label>
//                         <select
//                             value={selectedCourse}
//                             onChange={(e) => setSelectedCourse(e.target.value)}
//                             style={styles.input}
//                             required
//                         >
//                             <option value="">-- Select Course --</option>
//                             {courses.map((course) => (
//                                 <option key={course.course_id} value={course.course_id}>
//                                     {course.course_name}
//                                 </option>
//                             ))}
//                         </select>
//                     </div>

//                     {/* CLO Selection */}
//                     <div>
//                         <label style={styles.label}>Select CLO</label>
//                         <select
//                             value={selectedCLO}
//                             onChange={(e) => setSelectedCLO(e.target.value)}
//                             style={styles.input}
//                             required
//                         >
//                             <option value="">-- Select CLO --</option>
//                             {clos.map((clo) => (
//                                 // <option key={clo.clo_id} value={clo.clo_id}>
//                                 //     {clo.title}
//                                 <option key={clo.clo_id} value={clo.clo_id}>
//                         {clo.title} - {clo.clo_number}
//                                 </option>
//                             ))}
//                         </select>
//                     </div>

//                     {/* Weightage */}
//                     <div>
//                         <label style={styles.label}>Weightage (%)</label>
//                         <input
//                             type="number"
//                             value={weightage}
//                             onChange={(e) => setWeightage(e.target.value)}
//                             style={styles.input}
//                             required
//                         />
//                     </div>

//                     {/* Submit Button */}
//                     <button type="submit" style={styles.button}>Submit</button>
//                 </form>
//             </section>
//         </Header>
//     );
// };

// export default ExternalAssessment;
//Working on Showing all
// import React, { useState, useEffect, useContext } from 'react';
// import axios from 'axios';
// import styles from '../commonCSS/supervisorStyles'; // Using the same CSS
// import Header from "../../components/Header";
// import AuthContext from '../../context/AuthContext.js';

// const ExternalAssessment = () => {
//     const { authTokens } = useContext(AuthContext);
//     const [selectedCLO, setSelectedCLO] = useState('');
//     const [clos, setCLOs] = useState([]);

//     const [assessments, setAssessments] = useState([]);
//     const [isEditing, setIsEditing] = useState(false);
//     const [editId, setEditId] = useState(null);
//     const [formData, setFormData] = useState({
//         name: '',
//         description: '',
//         presentationRequired: false,
//         course: '',
//         weightage: '',
//         clos: ''
//     });
//     const [courses, setCourses] = useState([]);
//     const [selectedCourse, setSelectedCourse] = useState('');

//     // Fetch courses on mount
//     useEffect(() => {
//         const fetchCLOs = async () => {
//             try {
//                 const response = await fetch(`http://127.0.0.1:8000/api/fyp/clos/?course_id=${selectedCourse}`, {
//                     //Wow bro
//                     method: 'GET',
//                     headers: {
//                         'Content-Type': 'application/json',
//                         'Authorization': `Bearer ${authTokens.access}` // Use authTokens from context
//                     }
//                 });

//                 if (!response.ok) {
//                     throw new Error('Failed to fetch clo');
//                 }

//                 const data = await response.json();
//                 console.log("Fetched data: ", data);
//                 setCLOs(data);
//             } catch (error) {
//                 console.error('Error fetching clo:', error); // Improved error logging
//             }
//         };
//         fetchCLOs();
//         fetchCourses();
//     }, []);

//     // Fetch assessments when a course is selected
//     useEffect(() => {
//         if (selectedCourse) {
//             fetchAssessments(selectedCourse);
//         }
//     }, [selectedCourse]);

//     const fetchAssessments = async (courseId) => {
//         try {
//             const response = await axios.get(`http://127.0.0.1:8000/api/fyp/assessments/?course_id=${courseId}`, {
//                 headers: { Authorization: `Bearer ${authTokens.access}` }
//             });
//             console.log("Assessments Fetched: ", response.data);
//             setAssessments(response.data);
//         } catch (error) {
//             console.error("Error fetching assessments:", error);
//         }
//     };

//     const fetchCourses = async () => {
//         try {
//             const response = await axios.get('http://127.0.0.1:8000/api/fyp/courses/', {
//                 headers: { Authorization: `Bearer ${authTokens.access}` }
//             });
//             setCourses(response.data);
//         } catch (error) {
//             console.error("Error fetching courses:", error);
//         }
//     };

//     const handleInputChange = (e) => {
//         const { name, value, type, checked } = e.target;
//         setFormData({
//             ...formData,
//             [name]: type === 'checkbox' ? checked : value,
//         });
//     };

//     const handleCourseChange = (e) => {
//         setSelectedCourse(e.target.value);
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             if (isEditing) {
//                 // Update assessment
//                 await axios.put(`http://127.0.0.1:8000/api/fyp/assessments/${editId}/`, formData, {
//                     headers: { Authorization: `Bearer ${authTokens.access}` }
//                 });
//                 alert("Assessment updated successfully!");
//             } else {
//                 // Create assessment
//                 await axios.post('http://127.0.0.1:8000/api/fyp/assessments/', formData, {
//                     headers: { Authorization: `Bearer ${authTokens.access}` }
//                 });
//                 alert("Assessment created successfully!");
//             }
//             resetForm();
//             if (selectedCourse) fetchAssessments(selectedCourse);
//         } catch (error) {
//             console.error("Error submitting form:", error);
//             alert("Failed to submit assessment");
//         }
//     };

//     const handleEdit = (assessment) => {
//         setIsEditing(true);
//         setEditId(assessment.assessment_id);
//         setFormData({
//             name: assessment.name,
//             description: assessment.description,
//             presentationRequired: assessment.presentation_required,
//             course: assessment.course,
//             weightage: assessment.weightage,
//             clos: assessment.clos
//         });
//     };

//     const handleDelete = async (id) => {
//         if (window.confirm("Are you sure you want to delete this assessment?")) {
//             try {
//                 await axios.delete(`http://127.0.0.1:8000/api/fyp/assessments/${id}/`, {
//                     headers: { Authorization: `Bearer ${authTokens.access}` }
//                 });
//                 alert("Assessment deleted successfully!");
//                 if (selectedCourse) fetchAssessments(selectedCourse);
//             } catch (error) {
//                 console.error("Error deleting assessment:", error);
//             }
//         }
//     };

//     const resetForm = () => {
//         setIsEditing(false);
//         setEditId(null);
//         setFormData({
//             name: '',
//             description: '',
//             presentationRequired: false,
//             course: '',
//             weightage: '',
//             clos: ''
//         });
//     };

//     return (
//         <Header>
//             <section style={styles.section}>
//                 <h2 style={styles.sectionHeader}>Manage Assessments</h2>

//                 {/* Course Selection */}
//                 <label htmlFor="course-select">Select Course:</label>
//                 <select id="course-select" value={selectedCourse} onChange={handleCourseChange}>
//                     <option value="" disabled>Select a course</option>
//                     {courses.map((course) => (
//                         <option key={course.course_id} value={course.course_id}>{course.course_name}</option>
//                     ))}
//                 </select>

//                 {/* Form */}
//                 <form onSubmit={handleSubmit}>
//                     <input
//                         type="text"
//                         name="name"
//                         value={formData.name}
//                         onChange={handleInputChange}
//                         placeholder="Assessment Name"
//                         required
//                     />
//                     {/* Add more fields */}
//                     <button type="submit">{isEditing ? "Update Assessment" : "Create Assessment"}</button>
//                 </form>

//                 {/* Table */}
//                 {selectedCourse && (
//                     <table>
//                         <thead>
//                             <tr>
//                                 <th>Name</th>
//                                 <th>Description</th>
//                                 <th>Weightage</th>
//                                 <th>Actions</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {assessments.map((assessment) => (
//                                 <tr key={assessment.assessment_id}>
//                                     <td>{assessment.name}</td>
//                                     <td>{assessment.description}</td>
//                                     <td>{assessment.weightage}%</td>
//                                     <td>
//                                         <button onClick={() => handleEdit(assessment)}>Edit</button>
//                                         <button onClick={() => handleDelete(assessment.assessment_id)}>Delete</button>
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 )}
//             </section>
//         </Header>
//     );
// };

// export default ExternalAssessment;
//Working but Ugly
// import React, { useState, useEffect, useContext } from 'react';
// import axios from 'axios';
// import styles from '../commonCSS/supervisorStyles'; // CSS file
// import Header from "../../components/Header";
// import AuthContext from '../../context/AuthContext.js';

// const ExternalAssessment = () => {
//     const { authTokens } = useContext(AuthContext);
//     const [clos, setCLOs] = useState([]);
//     const [assessments, setAssessments] = useState([]);
//     const [isEditing, setIsEditing] = useState(false);
//     const [editId, setEditId] = useState(null);
//     const [courses, setCourses] = useState([]);
//     const [selectedCourse, setSelectedCourse] = useState('');
//     const [formData, setFormData] = useState({
//         name: '',
//         description: '',
//         presentationRequired: false,
//         course: '',
//         weightage: '',
//         clos: []
//     });
//     const [error, setError] = useState('');

//     useEffect(() => {
//         fetchCourses();
//     }, []);

//     useEffect(() => {
//         if (selectedCourse) {
//             fetchAssessments(selectedCourse);
//             fetchCLOs(selectedCourse);
//             setFormData((prevData) => ({ ...prevData, course: selectedCourse }));
//         }
//     }, [selectedCourse]);

//     const fetchCourses = async () => {
//         try {
//             const response = await axios.get('http://127.0.0.1:8000/api/fyp/courses/', {
//                 headers: { Authorization: `Bearer ${authTokens.access}` }
//             });
//             setCourses(response.data);
//         } catch (error) {
//             console.error("Error fetching courses:", error);
//         }
//     };

//     const fetchCLOs = async (courseId) => {
//         try {
//             const response = await axios.get(`http://127.0.0.1:8000/api/fyp/clos/?course_id=${courseId}`, {
//                 headers: { Authorization: `Bearer ${authTokens.access}` }
//             });
//             setCLOs(response.data);
//         } catch (error) {
//             console.error("Error fetching CLOs:", error);
//         }
//     };

//     const fetchAssessments = async (courseId) => {
//         try {
//             const response = await axios.get(`http://127.0.0.1:8000/api/fyp/assessments/?course_id=${courseId}`, {
//                 headers: { Authorization: `Bearer ${authTokens.access}` }
//             });
//             setAssessments(response.data);
//         } catch (error) {
//             console.error("Error fetching assessments:", error);
//         }
//     };

//     const handleInputChange = (e) => {
//         const { name, value, type, checked } = e.target;
//         setFormData({
//             ...formData,
//             [name]: type === 'checkbox' ? checked : value,
//         });
//     };

//     const handleCLOChange = (e) => {
//         const selectedOptions = Array.from(e.target.selectedOptions).map((option) => option.value);
//         setFormData({ ...formData, clos: selectedOptions });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setError('');
//         try {
//             if (isEditing) {
//                 await axios.put(`http://127.0.0.1:8000/api/fyp/assessments/${editId}/`, formData, {
//                     headers: { Authorization: `Bearer ${authTokens.access}` }
//                 });
//                 alert("Assessment updated successfully!");
//             } else {
//                 await axios.post('http://127.0.0.1:8000/api/fyp/assessments/', formData, {
//                     headers: { Authorization: `Bearer ${authTokens.access}` }
//                 });
//                 alert("Assessment created successfully!");
//             }
//             resetForm();
//             fetchAssessments(selectedCourse);
//         } catch (error) {
//             console.error("Error submitting form:", error);
//             setError('Failed to submit assessment. Please check the form fields.');
//         }
//     };
//     const handleEdit = (assessment) => {
//         setIsEditing(true);
//         setEditId(assessment.assessment_id);
//         setFormData({
//             name: assessment.name,
//             description: assessment.description,
//             presentationRequired: assessment.presentation_required,
//             course: assessment.course,
//             weightage: assessment.weightage,
//             clos: assessment.clos
//         });
//     };

//     const handleDelete = async (id) => {
//         if (window.confirm("Are you sure you want to delete this assessment?")) {
//             try {
//                 await axios.delete(`http://127.0.0.1:8000/api/fyp/assessments/${id}/`, {
//                     headers: { Authorization: `Bearer ${authTokens.access}` }
//                 });
//                 alert("Assessment deleted successfully!");
//                 if (selectedCourse) fetchAssessments(selectedCourse);
//             } catch (error) {
//                 console.error("Error deleting assessment:", error);
//             }
//         }
//     };
//     const resetForm = () => {
//         setIsEditing(false);
//         setEditId(null);
//         setFormData({
//             name: '',
//             description: '',
//             presentationRequired: false,
//             course: selectedCourse,
//             weightage: '',
//             clos: []
//         });
//     };

//     return (
//         <Header>
//             <section style={styles.section}>
//                 <h2 style={styles.sectionHeader}>Manage Assessments</h2>
//                 <label htmlFor="course-select">Select Course:</label>
//                 <select id="course-select" value={selectedCourse} onChange={(e) => setSelectedCourse(e.target.value)}>
//                     <option value="" disabled>Select a course</option>
//                     {courses.map((course) => (
//                         <option key={course.course_id} value={course.course_id}>{course.course_name}</option>
//                     ))}
//                 </select>

//                 {selectedCourse && (
//                     <form onSubmit={handleSubmit}>
//                         <input
//                             type="text"
//                             name="name"
//                             value={formData.name}
//                             onChange={handleInputChange}
//                             placeholder="Assessment Name"
//                             required
//                         />
//                         <textarea
//                             name="description"
//                             value={formData.description}
//                             onChange={handleInputChange}
//                             placeholder="Description"
//                         />
//                         <label>
//                             <input
//                                 type="checkbox"
//                                 name="presentationRequired"
//                                 checked={formData.presentationRequired}
//                                 onChange={handleInputChange}
//                             />
//                             Presentation Required
//                         </label>
//                         <input
//                             type="number"
//                             name="weightage"
//                             value={formData.weightage}
//                             onChange={handleInputChange}
//                             placeholder="Weightage (%)"
//                             required
//                         />
//                         <label htmlFor="clos-select">Select CLOs:</label>
//                         <select
//                             id="clos-select"
//                             name="clos"
//                             multiple
//                             value={formData.clos}
//                             onChange={handleCLOChange}
//                         >
//                             {clos.map((clo) => (
//                                 <option key={clo.id} value={clo.id}>{clo.name}</option>
//                             ))}
//                         </select>
//                         <button type="submit">{isEditing ? "Update Assessment" : "Create Assessment"}</button>
//                     </form>
//                 )}

//                 {error && <p style={{ color: 'red' }}>{error}</p>}

//                 {selectedCourse && (
//                     <table>
//                         <thead>
//                             <tr>
//                                 <th>Name</th>
//                                 <th>Description</th>
//                                 <th>Weightage</th>
//                                 <th>Actions</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {assessments.map((assessment) => (
//                                 <tr key={assessment.assessment_id}>
//                                     <td>{assessment.name}</td>
//                                     <td>{assessment.description}</td>
//                                     <td>{assessment.weightage}%</td>
//                                     <td>
//                                         <button onClick={() => handleEdit(assessment)}>Edit</button>
//                                         <button onClick={() => handleDelete(assessment.assessment_id)}>Delete</button>
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 )}
//             </section>
//         </Header>
//     );
// };

// export default ExternalAssessment;
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import styles from '../commonCSS/fypmanagerstyles.js'; // CSS file
import Header from "../../components/Header";
import AuthContext from '../../context/AuthContext.js';
import { FaBook } from 'react-icons/fa'; // Importing a book icon for degrees

const ExternalAssessment = () => {
    const { authTokens } = useContext(AuthContext);
    const [clos, setCLOs] = useState([]);
    const [assessments, setAssessments] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState(null);
    const [courses, setCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState('');
     const [degreesData, setDegreesData] = useState([]);
    const [selectedDegree, setSelectedDegree] = useState(null);
    const [loadingCourses, setLoadingCourses] = useState(false);
    const [loadingDegrees, setLoadingDegrees] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        presentationRequired: false,
        course: '',
        weightage: '',
        clos: []
    });
    const [error, setError] = useState('');

    // Fetch degrees data on component mount
useEffect(() => {
    const fetchDegrees = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/fyp/degree/', {
          headers: {
            'Authorization': `Bearer ${authTokens.access}`,
          },
        });
        console.log('Degrees Data:', response.data); // Log the fetched degrees
        setDegreesData(response.data);
      } catch (error) {
        console.error('Error fetching degrees:', error);
      } finally {
        setLoadingDegrees(false);
      }
    };

    fetchDegrees();
  }, [authTokens]);

  const handleDegreeChange = async (degreeId) => {
    setSelectedDegree(degreeId);
    // setSelectedCourses(courseId);
    setLoadingCourses(true);
    try {
      // const response = await axios.get(http://127.0.0.1:8000/api/fyp/${degreeId}/courses-with-projects/, {
      const response = await axios.get(`http://127.0.0.1:8000/api/fyp/${degreeId}/get_coursess/`, {
      // const response = await axios.get(http://127.0.0.1:8000/api/fyp/courses-with-projects/, {
    
        headers: {
          'Authorization': `Bearer ${authTokens.access}`,
        },
      });
      console.log('Courses Data Against Degree:', response.data); // Log the fetched courses
      setCourses(response.data);
    } catch (error) {
      console.error('Error fetching courses:', error);
      setCourses([]);
    } finally {
      setLoadingCourses(false);
    }
  }
  
  const handleCourseChange = (courseId) => {
    if (selectedCourse === courseId) {
        setSelectedCourse(null); // Deselect if clicked again
    } else {
        setSelectedCourse(courseId); // Select a new course
    }
};
    useEffect(() => {
        if (selectedCourse) {
            fetchAssessments(selectedCourse);
            fetchCLOs(selectedCourse);
            setFormData((prevData) => ({ ...prevData, course: selectedCourse }));
        }
    }, [selectedCourse]);

    // const fetchCourses = async () => {
    //     try {
    //         const response = await axios.get('http://127.0.0.1:8000/api/fyp/courses/', {
    //             headers: { Authorization: `Bearer ${authTokens.access}` }
    //         });
    //         console.log("fetched courses: ", response.data)
    //         setCourses(response.data);
    //     } catch (error) {
    //         console.error("Error fetching courses:", error);
    //     }
    // };

    const fetchCLOs = async (courseId) => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/fyp/clos/?course_id=${courseId}`, {
                headers: { Authorization: `Bearer ${authTokens.access}` }
            });
            setCLOs(response.data);
            console.log("Clo response data: ", response.data)
        } catch (error) {
            console.error("Error fetching CLOs:", error);
        }
    };

    const fetchAssessments = async (courseId) => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/fyp/assessments/?course_id=${courseId}`, {
                headers: { Authorization: `Bearer ${authTokens.access}` }
            });
            console.log("assessments fetched: ", response.data)
            setAssessments(response.data);
        } catch (error) {
            console.error("Error fetching assessments:", error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleCLOCheckboxChange = (e, cloId) => {
        if (e.target.checked) {
            // Add the selected CLO ID to the array
            setFormData((prev) => ({
                ...prev,
                clos: [...prev.clos, cloId],
            }));
        } else {
            // Remove the deselected CLO ID from the array
            setFormData((prev) => ({
                ...prev,
                clos: prev.clos.filter((id) => id !== cloId),
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            if (isEditing) {
                await axios.put(`http://127.0.0.1:8000/api/fyp/assessments/${editId}/`, formData, {
                    headers: { Authorization: `Bearer ${authTokens.access}` }
                });
                alert("Assessment updated successfully!");
            } else {
                await axios.post('http://127.0.0.1:8000/api/fyp/assessments/', formData, {
                    headers: { Authorization: `Bearer ${authTokens.access}` }
                });
                alert("Assessment created successfully!");
            }
            resetForm();
            fetchAssessments(selectedCourse);
        } catch (error) {
            console.error("Error submitting form:", error);
            setError('Failed to submit assessment. Please check the form fields.');
        }
    };

    const handleEdit = (assessment) => {
        setIsEditing(true);
        setEditId(assessment.assessment_id);
        setFormData({
            name: assessment.name,
            description: assessment.description,
            presentationRequired: assessment.presentation_required,
            course: assessment.course,
            weightage: assessment.weightage,
            clos: assessment.clos
        });
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this assessment?")) {
            try {
                await axios.delete(`http://127.0.0.1:8000/api/fyp/assessments/${id}/`, {
                    headers: { Authorization: `Bearer ${authTokens.access}` }
                });
                alert("Assessment deleted successfully!");
                if (selectedCourse) fetchAssessments(selectedCourse);
            } catch (error) {
                console.error("Error deleting assessment:", error);
            }
        }
    };

    const resetForm = () => {
        setIsEditing(false);
        setEditId(null);
        setFormData({
            name: '',
            description: '',
            presentationRequired: false,
            course: selectedCourse,
            weightage: '',
            clos: []
        });
    };

    return (
        <Header>
            <section style={styles.section}>
                <h2 style={styles.sectionHeader}>Manage Assessments</h2>

                {/* Course Selection */}
                {loadingDegrees ? (
                          <p>Loading degrees...</p>
                        ) : (
                          <div style={{ margin: '20px 0' }}>
                            <label
                              htmlFor="degree-select"
                              style={{
                                fontWeight: 'bold',
                                fontSize: '1.2em',
                                color: '#444',
                                marginBottom: '10px',
                                display: 'block',
                              }}
                            >
                              Select Degree:
                            </label>
                            <div
                              style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
                                gap: '20px',
                              }}
                            >
                              {degreesData.map((degree) => (
                                <div
                                  key={degree.id}
                                  onClick={() => handleDegreeChange(degree.degree_id)}
                                  style={{
                                    cursor: 'pointer',
                                    padding: '20px',
                                    borderBottom:
                                      selectedDegree === degree.degree_id
                                        ? '10px solid #0073e6'
                                        : '10px solid transparent',
                                    borderRadius: '15px',
                                    backgroundColor:
                                      selectedDegree === degree.degree_id
                                        ? 'rgba(0, 115, 230, 0.1)'
                                        : '#fff',
                                    color:
                                      selectedDegree === degree.degree_id ? '#0073e6' : '#333',
                                    boxShadow:
                                      selectedDegree === degree.degree_id
                                        ? '0 4px 10px rgba(0, 115, 230, 0.3)'
                                        : '0 4px 10px rgba(0, 0, 0, 0.1)',
                                    transition: 'all 0.3s ease',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    textAlign: 'center',
                                  }}
                                >
                                  <FaBook
                                    style={{
                                      fontSize: '2.5em',
                                      marginBottom: '10px',
                                      color: selectedDegree === degree.degree_id ? '#0073e6' : '#0073e6',
                                    }}
                                  />
                                  <h4
                                    style={{
                                      fontSize: '1.4em',
                                      marginBottom: '10px',
                                      fontWeight: '600',
                                    }}
                                  >
                                    {degree.degree_name}
                                  </h4>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

{selectedDegree && (
    <div style={{ marginBottom: '30px' }}>
        <h3 style={{ marginBottom: '10px', color: '#555' }}>Select a Course</h3>
        <table style={styles.table}>
            <thead style={styles.tableHeader}>
                <tr style={styles.tableHeaderRow}>
                    <th style={styles.tableCell}>Select</th>
                    <th style={styles.tableCell}>Course Name</th>
                    <th style={styles.tableCell}>Section</th>
                    <th style={styles.tableCell}>Semester</th>
                </tr>
            </thead>
            <tbody>
                {courses.map((course) => (
                    <tr
                        key={course.course_id}
                        style={
                            selectedCourse === course.course_id
                                ? styles.selectedRow
                                : styles.unselectedRow
                        }
                        onClick={() => handleCourseChange(course.course_id)}
                    >
                        <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                            <input
                                type="radio"
                                name="courseSelection"
                                checked={selectedCourse === course.course_id}
                                onChange={() => handleCourseChange(course.course_id)}
                            />
                        </td>
                        <td style={styles.tableCell}>{course.course_name}</td>
                        <td style={styles.tableCell}>{course.section_name}</td>
                        <td style={styles.tableCell}>{course.semester.semester_name}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
)}

                {/* Assessments Table */}
                {selectedCourse && assessments.length > 0 && (
                    <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
                        <thead>
                            <tr style={{ backgroundColor: 'rgb(0, 123, 255)' }}>
                                <th style={{ border: '1px solid #ddd', padding: '10px', color: 'white' }}>Name</th>
                                <th style={{ border: '1px solid #ddd', padding: '10px', color: 'white' }}>Description</th>
                                <th style={{ border: '1px solid #ddd', padding: '10px', color: 'white' }}>Weightage</th>
                                <th style={{ border: '1px solid #ddd', padding: '10px', color: 'white' }}>clos</th>
                                <th style={{ border: '1px solid #ddd', padding: '10px', color: 'white' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {assessments.map((assessment) => (
                                <tr key={assessment.assessment_id} style={{ textAlign: 'center' }}>
                                    <td style={{ border: '1px solid #ddd', padding: '10px' }}>{assessment.name}</td>
                                    <td style={{ border: '1px solid #ddd', padding: '10px' }}>{assessment.description}</td>
                                    <td style={{ border: '1px solid #ddd', padding: '10px' }}>{assessment.weightage}%</td>
                                    <td style={{ border: '1px solid #ddd', padding: '10px' }}>{Array.isArray(assessment.clos) 
                            ? assessment.clos.join(", ") 
                            : assessment.clos}</td>
                                    <td style={{ border: '1px solid #ddd', padding: '10px' }}>
                                        <button onClick={() => handleEdit(assessment)} style={styles.actionButton}>Edit</button>
                                        <button onClick={() => handleDelete(assessment.assessment_id)} style={styles.removeQuestionButton}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}

                {/* Assessment Form */}
                </section>
           <section style={styles.section}>
    {/* <h2 style={styles.sectionHeader}>Create Assessments</h2> */}
    {selectedCourse && (
    <>
        <h2 style={{ textAlign: 'center', fontSize: '24px', marginBottom: '20px' }}>
    {isEditing ? 'Update Assessment' : 'Create New Assessment'}
</h2>
        <form 
        onSubmit={handleSubmit} 
        style={{ display: 'flex', flexDirection: 'column', gap: '15px', padding: '20px' }}
    >
        <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Assessment Name"
            required
            style={{
                height: '50px',
                padding: '10px',
                border: '1px solid #ccc',
                borderRadius: '5px',
                fontSize: '16px',
            }}
        />
        <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Description"
            style={{
                height: '100px',
                padding: '10px',
                border: '1px solid #ccc',
                borderRadius: '5px',
                fontSize: '16px',
                resize: 'none',
            }}
        />
        <label style={{ display: 'flex', alignItems: 'center' }}>
            <input
                type="checkbox"
                name="presentationRequired"
                checked={formData.presentationRequired}
                onChange={handleInputChange}
                style={{ marginRight: '10px', width: '18px', height: '18px', margin: '10px 10px' }}
            />
            Presentation Required
        </label>
        <input
            type="number"
            name="weightage"
            value={formData.weightage}
            onChange={handleInputChange}
            placeholder="Weightage (%)"
            required
            style={{
                height: '50px',
                padding: '10px',
                border: '1px solid #ccc',
                borderRadius: '5px',
                fontSize: '16px',
            }}
        />
        <label style={{ marginBottom: '10px', fontSize: '16px', fontWeight: 'bold' }}>Select CLOs:</label>
        <div 
            style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '10px',
   
            }}
        >
            {clos.map((clo) => (
                <label 
                    key={clo.clo_id} 
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        backgroundColor: '#f9f9f9',
                        padding: '20px 20px',
                        borderRadius: '5px',
                        border: '1px solid #ccc',
                    }}
                >
                    <input
                        type="checkbox"
                        value={clo.clo_id}
                        checked={formData.clos.includes(clo.clo_id)}
                        onChange={(e) => handleCLOCheckboxChange(e, clo.clo_id)}
                        style={{ marginRight: '10px', width: '18px', height: '18px', margin: '10px 10px' }}
                    />
                    <span style={{ fontSize: '14px', padding: '20px 20px' }}>
    {`CLO ${clo.clo_number}: ${clo.title}`}
</span>
                </label>
            ))}
        </div>
        <button 
            type="submit" 
            style={{
                padding: '12px 20px',
                backgroundColor: '#007bff',
                color: '#fff',
                border: 'none',
                borderRadius: '5px',
                fontSize: '16px',
                fontWeight: 'bold',
                cursor: 'pointer',
            }}
        >
            {isEditing ? "Update Assessment" : "Create Assessment"}
        </button>
        {isEditing && (
            <button
                type="button"
                onClick={resetForm}
                style={{
                    backgroundColor: 'gray',
                    color: 'white',
                    padding: '10px 20px',
                    border: 'none',
                    borderRadius: '5px',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    padding: '12px 20px',
                    width: '18%',
                }}
            >
                Cancel
            </button>
        )}
    </form>
    </>
)}
{error && (
    <p style={{ color: 'red', marginTop: '10px', fontSize: '14px', textAlign: 'center' }}>
        {error}
    </p>
)}

        </section>
        </Header>
    );
};

export default ExternalAssessment;



