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
//     const [questions, setQuestions] = useState([
//         { criteria: 'Requirement Gathering', max_score: 10, clo_link: '' },
//         { criteria: 'Scope', max_score: 10, clo_link: '' }
//     ]);

//     const [selectedClo, setSelectedClo] = useState('');
//     const [cloOptions, setCloOptions] = useState([]);
//     const [assessmentOptions, setAssessmentOptions] = useState([]);
//     const [courses, setCourses] = useState([]); // New state for courses
//     const [selectedCourse, setSelectedCourse] = useState(''); // New state for selected course

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
//     }, [authTokens]); // Ensure useEffect triggers on `authTokens`
    
//     // Fetch CLO options when selectedCourse changes
//     useEffect(() => {
//         const fetchCloOptions = async () => {
//             if (!selectedCourse) return; // Skip if no course selected
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
//     }, [selectedCourse, authTokens]); // Trigger when selectedCourse changes
//     const fetchAssessmentOptions = async (courseId) => {
//         try {
//             const response = await axios.get(`http://127.0.0.1:8000/api/fyp/assessments/?course_id=${courseId}`, {
//                 headers: { Authorization: `Bearer ${authTokens.access}` }
//             });
//             console.log("assessments fetched: ", response.data)
//             setAssessmentOptions(response.data);
//         } catch (error) {
//             console.error("Error fetching assessments:", error);
//         }
//     };

//     const handleCourseChange = (courseId) => {
//         setSelectedCourse(courseId);
//         fetchAssessmentOptions(courseId);
//         // fetchCloOptions(courseId);
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
//             // id: selectedAssessment,
//             course_id: selectedCourse,
//             criteria: questions.map(q => ({
//                 criteria: q.criteria,
//                 max_score: q.max_score,
//                 clo_link: q.clo_link
//             })),
//         };
//         console.log('sending data: ', assessmentData)
//         try {
//             // const response = await axios.post('http://127.0.0.1:8000/api/fyp/create-assessment-criteria/', assessmentData, {
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

//                 {/* Dropdown for selecting a course */}
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

//                 {/* Dropdown for selecting an assessment */}
//                 <div>
//                     <label>External Assessment: </label>
//                     <select value={assessmentTitle} onChange={(e) => setAssessmentTitle(e.target.value)} style={styles.inputField}>
//                         <option value="">Select Assessment</option>
//                         {assessmentOptions.map((assessment) => (
//                             <option key={assessment.assessment_id} value={assessment.assessment_id}>
//                                 {assessment.name}
//                             </option>
//                         ))}
//                     </select>
//                 </div>

//                 {/* Dropdown for selecting CLO */}
//                 {/* <div>
//                     <label>Select CLO: </label>
//                     <select value={selectedClo} onChange={(e) => setSelectedClo(e.target.value)} style={styles.inputField}>
//                         <option value="">Select CLO</option>
//                         {cloOptions.map((clo) => (
//                             <option key={clo.clo_id} value={clo.clo_id}>
//                                 {clo.title}
//                             </option>
//                         ))}
//                     </select>
//                 </div> */}

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
//                             <button 
//                                 onClick={() => removeQuestion(index)} 
//                                 style={styles.removeQuestionButton}
//                             >
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

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/fyp/courses/', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${authTokens.access}`
                    }
                });
                setCourses(response.data);
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };

        fetchCourses();
    }, [authTokens]);

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
            setAssessmentOptions(response.data);
        } catch (error) {
            console.error("Error fetching assessments:", error);
        }
    };

    const fetchAssessmentQuestions = async (assessmentId) => {
        try {
            console.log("assessment id sending: ", assessmentId);
            const response = await axios.get(`http://127.0.0.1:8000/api/fyp/assessment-questions/${assessmentId}/`, {
                headers: { Authorization: `Bearer ${authTokens.access}` }
            });
            console.log("response of question: ", response.data);
            // Set only the questions array, not the entire response
            setQuestions(response.data.questions || []);
        } catch (error) {
            console.error("Error fetching assessment questions:", error);
        }
    };

    const removeQuestion = async (index, questionId) => {
        console.log("inside the removeQuestion")
        if (questionId) { // Only make the API call if the question has been saved to the backend
            try {
                console.log("Trying to delete the Question")
                await axios.delete(`http://127.0.0.1:8000/api/fyp/assessment-questions/${questionId}/`, {
                    headers: {
                        'Authorization': `Bearer ${authTokens.access}`,
                    },
                });
                alert('Question removed successfully');
            } catch (error) {
                console.error('Failed to delete question:', error);
                alert('Failed to delete question');
                return; // Prevent UI update if the backend deletion fails
            }
        }
    
        // Update the local state
        const newQuestions = questions.filter((_, i) => i !== index);
        setQuestions(newQuestions);
    };
    
    const editQuestion = async (index, updatedQuestion) => {
        const questionId = questions[index]?.id;
    
        if (questionId) { // Update backend for existing questions
            try {
                await axios.put(`http://127.0.0.1:8000/api/fyp/assessment-questions/${questionId}/`, updatedQuestion, {
                    headers: {
                        'Authorization': `Bearer ${authTokens.access}`,
                    },
                });
                alert('Question updated successfully');
            } catch (error) {
                console.error('Failed to update question:', error);
                alert('Failed to update question');
                return;
            }
        }
    
        // Update the local state
        const newQuestions = [...questions];
        newQuestions[index] = updatedQuestion;
        setQuestions(newQuestions);
    };

    const handleCourseChange = (courseId) => {
        setSelectedCourse(courseId);
        fetchAssessmentOptions(courseId);
    };

    const handleAssessmentChange = (assessmentId) => {
        setAssessmentTitle(assessmentId);
        fetchAssessmentQuestions(assessmentId);
    };

    const addQuestion = () => {
        setQuestions([...questions, { criteria: '', max_score: 0, clo_link: '' }]);
    };

    // const removeQuestion = (index) => {
    //     const newQuestions = questions.filter((_, i) => i !== index);
    //     setQuestions(newQuestions);
    // };

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
            const response = await axios.post('http://127.0.0.1:8000/api/fyp/internal-assessment/', assessmentData, {
                headers: {
                    'Authorization': `Bearer ${authTokens.access}`
                },
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
                <h1>Create Assessment</h1>
                <div>
                    <label>Select Course: </label>
                    <select
                        value={selectedCourse}
                        onChange={(e) => handleCourseChange(e.target.value)}
                        style={styles.inputField}
                    >
                        <option value="">Select Course</option>
                        {courses.map((course) => (
                            <option key={course.course_id} value={course.course_id}>
                                {course.course_name}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label>External Assessment: </label>
                    <select value={assessmentTitle} onChange={(e) => handleAssessmentChange(e.target.value)} style={styles.inputField}>
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
                onChange={(e) => {
                    const newQuestions = [...questions];
                    newQuestions[index].criteria = e.target.value;
                    setQuestions(newQuestions);
                }}
                placeholder="Criteria"
                style={styles.inputField}
            />
            <input
                type="number"
                value={q.max_score}
                onChange={(e) => {
                    const newQuestions = [...questions];
                    newQuestions[index].max_score = e.target.value;
                    setQuestions(newQuestions);
                }}
                placeholder="Max Score"
                style={styles.inputField}
            />
            <select
                value={q.clo_link}
                onChange={(e) => {
                    const newQuestions = [...questions];
                    newQuestions[index].clo_link = e.target.value;
                    setQuestions(newQuestions);
                }}
                style={styles.inputField}
            >
                <option value="">Select CLO Link</option>
                {cloOptions.map((clo) => (
                    <option key={clo.clo_id} value={clo.clo_id}>
                        {clo.title}
                    </option>
                ))}
            </select>
            <button
                onClick={() => {console.log("Remove button clicked index and qid: ", index, q.criteria_id);
                    removeQuestion(index, q.criteria_id);}
                }
                style={styles.removeQuestionButton}
            >
                Remove
            </button>
            <button
                onClick={() => {
                    const updatedQuestion = { ...q }; // Or show a modal for inline editing
                    editQuestion(index, updatedQuestion);
                }}
                style={styles.editQuestionButton}
            >
                Edit
            </button>
        </div>
    ))}
    <button onClick={addQuestion} style={styles.addQuestionButton}>
        Add Question
    </button>
</div>

                <button onClick={handleCreateAssessment} style={styles.createAssessmentButton}>Create Assessment</button>
            </div>
        </Header>
    );
};

export default CreateAssessmentPage;


