// import React, { useState, useEffect, useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Header from "../../components/Header";
// import styles from '../commonCSS/fypmanagerstyles';
// import axios from 'axios';
// import AuthContext from '../../context/AuthContext.js';

// const CreateAssessmentPage = () => {
//     const { authTokens } = useContext(AuthContext);
//     const navigate = useNavigate();
//     const [assessmentTitle, setAssessmentTitle] = useState('');
//     const [questions, setQuestions] = useState([]);
//     const [selectedClo, setSelectedClo] = useState('');
//     const [cloOptions, setCloOptions] = useState([]);
//     const [assessmentOptions, setAssessmentOptions] = useState([]);
//     const [courses, setCourses] = useState([]);
//     const [selectedCourse, setSelectedCourse] = useState('');

//     useEffect(() => {
//         const fetchCourses = async () => {
//             try {
//                 const response = await axios.get('http://127.0.0.1:8000/api/fyp/courses/', {
//                     headers: {
//                         'Content-Type': 'application/json',
//                         'Authorization': `Bearer ${authTokens.access}`
//                     }
//                 });
//                 setCourses(response.data);
//             } catch (error) {
//                 console.error('Error fetching courses:', error);
//             }
//         };

//         fetchCourses();
//     }, [authTokens]);

//     useEffect(() => {
//         const fetchCloOptions = async () => {
//             if (!selectedCourse) return;
//             try {
//                 const response = await axios.get(`http://127.0.0.1:8000/api/fyp/clos/?course_id=${selectedCourse}`, {
//                     headers: {
//                         'Content-Type': 'application/json',
//                         'Authorization': `Bearer ${authTokens.access}`
//                     }
//                 });
//                 setCloOptions(response.data);
//             } catch (error) {
//                 console.error('Error fetching CLO options:', error);
//             }
//         };

//         fetchCloOptions();
//     }, [selectedCourse, authTokens]);

//     const fetchAssessmentOptions = async (courseId) => {
//         try {
//             const response = await axios.get(`http://127.0.0.1:8000/api/fyp/assessments/?course_id=${courseId}`, {
//                 headers: { Authorization: `Bearer ${authTokens.access}` }
//             });
//             setAssessmentOptions(response.data);
//         } catch (error) {
//             console.error("Error fetching assessments:", error);
//         }
//     };

//     const fetchAssessmentQuestions = async (assessmentId) => {
//         try {
//             console.log("assessment id sending: ", assessmentId);
//             const response = await axios.get(`http://127.0.0.1:8000/api/fyp/assessment-questions/${assessmentId}/`, {
//                 headers: { Authorization: `Bearer ${authTokens.access}` }
//             });
//             console.log("response of question: ", response.data);
//             // Set only the questions array, not the entire response
//             setQuestions(response.data.questions || []);
//         } catch (error) {
//             console.error("Error fetching assessment questions:", error);
//         }
//     };

    

//     const handleCourseChange = (courseId) => {
//         setSelectedCourse(courseId);
//         fetchAssessmentOptions(courseId);
//     };

//     const handleAssessmentChange = (assessmentId) => {
//         setAssessmentTitle(assessmentId);
//         fetchAssessmentQuestions(assessmentId);
//     };

//     const addQuestion = () => {
//         setQuestions([...questions, { criteria: '', max_score: 0, clo_link: '' }]);
//     };

//     const removeQuestion = (index) => {
//         const newQuestions = questions.filter((_, i) => i !== index);
//         setQuestions(newQuestions);
//     };

//     const handleCreateAssessment = async () => {
//         const assessmentData = {
//             assessmentid: assessmentTitle,
//             course_id: selectedCourse,
//             criteria: questions.map(q => ({
//                 criteria: q.criteria,
//                 max_score: q.max_score,
//                 clo_link: q.clo_link
//             })),
//         };

//         try {
//             const response = await axios.post('http://127.0.0.1:8000/api/fyp/internal-assessment/', assessmentData, {
//                 headers: {
//                     'Authorization': `Bearer ${authTokens.access}`
//                 },
//             });
//             alert('Assessment Created Successfully');
//         } catch (error) {
//             console.error('Failed to create assessment:', error);
//             alert('Failed to create assessment');
//         }
//     };

//     return (
//         <Header>
//             <div style={styles.container}>
//                 <h1>Create Assessment</h1>
//                 <div>
//                     <label>Select Course: </label>
//                     <select
//                         value={selectedCourse}
//                         onChange={(e) => handleCourseChange(e.target.value)}
//                         style={styles.inputField}
//                     >
//                         <option value="">Select Course</option>
//                         {courses.map((course) => (
//                             <option key={course.course_id} value={course.course_id}>
//                                 {course.course_name}
//                             </option>
//                         ))}
//                     </select>
//                 </div>

//                 <div>
//                     <label>External Assessment: </label>
//                     <select value={assessmentTitle} onChange={(e) => handleAssessmentChange(e.target.value)} style={styles.inputField}>
//                         <option value="">Select Assessment</option>
//                         {assessmentOptions.map((assessment) => (
//                             <option key={assessment.assessment_id} value={assessment.assessment_id}>
//                                 {assessment.name}
//                             </option>
//                         ))}
//                     </select>
//                 </div>

//                 <div>
//                     <h3>Assessment Questions:</h3>
//                     {questions.map((q, index) => (
//                         <div key={index} style={styles.questionContainer}>
//                             <input
//                                 type="text"
//                                 value={q.criteria}
//                                 onChange={(e) => {
//                                     const newQuestions = [...questions];
//                                     newQuestions[index].criteria = e.target.value;
//                                     setQuestions(newQuestions);
//                                 }}
//                                 placeholder="Criteria"
//                                 style={styles.inputField}
//                             />
//                             <input
//                                 type="number"
//                                 value={q.max_score}
//                                 onChange={(e) => {
//                                     const newQuestions = [...questions];
//                                     newQuestions[index].max_score = e.target.value;
//                                     setQuestions(newQuestions);
//                                 }}
//                                 placeholder="Max Score"
//                                 style={styles.inputField}
//                             />
//                             <select
//                                 value={q.clo_link}
//                                 onChange={(e) => {
//                                     const newQuestions = [...questions];
//                                     newQuestions[index].clo_link = e.target.value;
//                                     setQuestions(newQuestions);
//                                 }}
//                                 style={styles.inputField}
//                             >
//                                 <option value="">Select CLO Link</option>
//                                 {cloOptions.map((clo) => (
//                                     <option key={clo.clo_id} value={clo.clo_id}>
//                                         {clo.title}
//                                     </option>
//                                 ))}
//                             </select>
//                             <button onClick={() => removeQuestion(index)} style={styles.removeQuestionButton}>
//                                 Remove
//                             </button>
//                         </div>
//                     ))}
//                     <button onClick={addQuestion} style={styles.addQuestionButton}>Add Question</button>
//                 </div>

//                 <button onClick={handleCreateAssessment} style={styles.createAssessmentButton}>Create Assessment</button>
//             </div>
//         </Header>
//     );
// };

// export default CreateAssessmentPage;


import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from "../../components/Header";
import styles from '../commonCSS/fypmanagerstyles';
import axios from 'axios';
import AuthContext from '../../context/AuthContext.js';
import { FaBook } from 'react-icons/fa'; // Importing a book icon for degrees

const CreateAssessmentPage = () => {
    const { authTokens } = useContext(AuthContext);
    const navigate = useNavigate();
    const [assessmentTitle, setAssessmentTitle] = useState('');
    const [questions, setQuestions] = useState([]);
    const [selectedClo, setSelectedClo] = useState('');
    const [cloOptions, setCloOptions] = useState([]);
    const [assessmentOptions, setAssessmentOptions] = useState([]);
    const [courses, setCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState('');
    const [degreesData, setDegreesData] = useState([]);
    const [selectedDegree, setSelectedDegree] = useState(null);
    const [loadingCourses, setLoadingCourses] = useState(false);
    const [loadingDegrees, setLoadingDegrees] = useState(true);

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

    // useEffect(() => {
    //     const fetchCourses = async () => {
    //         try {
    //             const response = await axios.get('http://127.0.0.1:8000/api/fyp/courses/', {
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                     'Authorization': `Bearer ${authTokens.access}`
    //                 }
    //             });
    //             setCourses(response.data);
    //         } catch (error) {
    //             console.error('Error fetching courses:', error);
    //         }
    //     };

    //     fetchCourses();
    // }, [authTokens]);
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
            fetchAssessmentOptions(courseId);
        }
    };
    useEffect(() => {
        const fetchCloOptions = async () => {
            if (!selectedCourse) return;
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/fyp/clos/?course_id=${selectedCourse}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${authTokens.access}`
                    }
                });
                setCloOptions(response.data);
            } catch (error) {
                console.error('Error fetching CLO options:', error);
            }
        };

        fetchCloOptions();
    }, [selectedCourse, authTokens]);

    const fetchAssessmentOptions = async (courseId) => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/fyp/assessments/?course_id=${courseId}`, {
                headers: { Authorization: `Bearer ${authTokens.access}` }
            });
            const filteredAssessments = response.data.filter(assessment => assessment.name.toLowerCase() !== 'attendance'.toLowerCase());
            console.log("Filtered assessments fetched: ", filteredAssessments);
            setAssessmentOptions(filteredAssessments);
        } catch (error) {
            console.error("Error fetching assessments:", error);
        }
    };

    const fetchAssessmentQuestions = async (assessmentId) => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/fyp/assessment-questions/${assessmentId}/`, {
                headers: { Authorization: `Bearer ${authTokens.access}` }
            });
            setQuestions(response.data.questions || []);
        } catch (error) {
            console.error("Error fetching assessment questions:", error);
        }
    };

    // const handleCourseChange = (courseId) => {
    //     setSelectedCourse(courseId);
    //     fetchAssessmentOptions(courseId);
    // };

    const handleAssessmentChange = (assessmentId) => {
        setAssessmentTitle(assessmentId);
        fetchAssessmentQuestions(assessmentId);
    };

    const addQuestion = () => {
        setQuestions([...questions, { criteria: '', max_score: 0, clo_link: '' }]);
    };


    const handleInputChange = (index, key, value) => {
        const updatedQuestions = [...questions];
        updatedQuestions[index][key] = value;
        setQuestions(updatedQuestions);
    };

    const handleUpdateQuestion = async (index, questionId) => {
        const updatedQuestion = questions[index];
        try {
            await axios.put(`http://127.0.0.1:8000/api/fyp/assessment-questionsUpdate/${questionId}/`, updatedQuestion, {
                headers: { Authorization: `Bearer ${authTokens.access}` }
            });
            alert('Question Updated Successfully');
        } catch (error) {
            console.error('Failed to update question:', error);
            alert('Failed to update question');
        }
    };

    const handleDeleteQuestion = async (index, questionId) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/api/fyp/assessment-questionsUpdate/${questionId}/`, {
                headers: { Authorization: `Bearer ${authTokens.access}` }
            });
            const newQuestions = questions.filter((_, i) => i !== index);
            setQuestions(newQuestions);
            alert('Question Deleted Successfully');
        } catch (error) {
            console.error('Failed to delete question:', error);
            alert('Failed to delete question');
        }
    };

    const handleCreateAssessment = async () => {
        const assessmentData = {
            assessmentid: assessmentTitle,
            course_id: selectedCourse,
            criteria: questions.map(q => ({
                criteria: q.criteria,
                max_score: q.max_score,
                clo_link: q.clo_link
            })),
        };

        try {
            await axios.post('http://127.0.0.1:8000/api/fyp/internal-assessment/', assessmentData, {
                headers: { 'Authorization': `Bearer ${authTokens.access}` },
            });
            alert('Assessment Created Successfully');
        } catch (error) {
            console.error('Failed to create assessment:', error);
            alert('Failed to create assessment');
        }
    };

    return (
        <Header>
            <div style={styles.container}>
                <h1>Create Internal Assessment</h1>
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

                <div>
                    <label>External Assessment: </label>
                    <select
                        value={assessmentTitle}
                        onChange={(e) => handleAssessmentChange(e.target.value)}
                        style={styles.inputField}
                    >
                        <option value="">Select Assessment</option>
                        {assessmentOptions.map((assessment) => (
                            <option key={assessment.assessment_id} value={assessment.assessment_id}>
                                {assessment.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <h3>Assessment Questions:</h3>
                    {questions.map((q, index) => (
                        <div key={index} style={styles.questionContainer}>
                            <input
                                type="text"
                                value={q.criteria}
                                onChange={(e) => handleInputChange(index, 'criteria', e.target.value)}
                                placeholder="Criteria"
                                style={styles.inputField}
                            />
                            <input
                                type="number"
                                value={q.max_score}
                                onChange={(e) => handleInputChange(index, 'max_score', e.target.value)}
                                placeholder="Max Score"
                                style={styles.inputField}
                            />
                            <select
                                value={q.clo_link}
                                onChange={(e) => handleInputChange(index, 'clo_link', e.target.value)}
                                style={styles.inputField}
                            >
                                <option value="">Select CLO Link</option>
                                {cloOptions.map((clo) => (
                                    <option key={clo.clo_id} value={clo.clo_id}>
                                        {clo.title}
                                    </option>
                                ))}
                            </select>
                            <button onClick={() => handleUpdateQuestion(index, q.criteria_id)} style={{ ...styles.editButton, marginBottom: '20px' }}>
                                Update
                            </button>
                           
                            <button onClick={() => handleDeleteQuestion(index, q.criteria_id)}  style={{ ...styles.deleteButton, marginBottom: '20px' }}>
                                Delete
                            </button>
                        </div>
                    ))}
                    <button onClick={addQuestion} style={styles.addQuestionButton}>Add Question</button>
                </div>

            </div>
            <section style={styles.section}>
            <button onClick={handleCreateAssessment} style={styles.createAssessmentButton}>Create Assessment</button>

            </section>
        </Header>
    );
};

export default CreateAssessmentPage;
