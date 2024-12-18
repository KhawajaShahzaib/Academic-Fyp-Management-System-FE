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
                            <button onClick={() => handleUpdateQuestion(index, q.criteria_id)} style={styles.actionButton}>
                                Update
                            </button>
                            <button onClick={() => handleDeleteQuestion(index, q.criteria_id)} style={styles.removeQuestionButton}>
                                Delete
                            </button>
                        </div>
                    ))}
                    <button onClick={addQuestion} style={styles.addQuestionButton}>Add Question</button>
                </div>

                <button onClick={handleCreateAssessment} style={styles.createAssessmentButton}>Create Assessment</button>
            </div>
        </Header>
    );
};

export default CreateAssessmentPage;
