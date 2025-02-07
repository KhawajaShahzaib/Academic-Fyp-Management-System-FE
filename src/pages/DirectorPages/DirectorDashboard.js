import React, { useState, useContext, useEffect } from 'react';
// import '../../components/HeaderMe.css';
// import Navbar from '../components/Navbar.js';
import Dropdown1 from "../../components/Dropdown1.js";
// import ExcelGenerator from "../components/excelGenerator.js";
import AuthContext from '../../context/AuthContext';
import Header from "../../components/Header";
import styles from '../commonCSS/fypmanagerstyles.js'
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';
import Announcements from '../../components/Announcements.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faUserTie } from '@fortawesome/free-solid-svg-icons';
import Card from '../../components/Cards.js';
import { faUserGraduate, faUserTie, faUsers, faChalkboardTeacher, faUniversity } from '@fortawesome/free-solid-svg-icons';


const DirectorDashboard = () => {
  const [assessmentByDegree, setAssessmentByDegree] = useState([]);

  const { user, authTokens } = useContext(AuthContext);
  const [groupsByDegree, setGroupsByDegree] = useState([]);
  const currentUserRole = user.user_type; 

  const directorSections = [
    {
      title: 'FYP Creation Management',
      options: [
        { name: 'Appoint FYP Manager', link: '/AssignFypManager'},
        // { name: 'View all Current FYP Ongoing Tasks', link: '#' }
      ],
    },
    {
      title: 'Ongoing FYP Courses',
      options: [
        { name: 'View Progress', link: '/view-progress' },
        { name: 'View Assessments', link: '#' }
      ],
    },

    {
      title: "Results",
      options: [
        {name: "View Previous Result", link: '/view-result'}
      ]
    }
  
  ];
  useEffect(() => {
    const fetchGroups = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:8000/api/fyp/total-groups/", {
                headers: { Authorization: `Bearer ${authTokens.access}` }
            });
            setGroupsByDegree(response.data.groups_by_degree);
            setAssessmentByDegree(response.data.course_by_degree);

            console.log("Fetched groups by degree: ", response.data);
        } catch (error) {
            console.error("Error fetching total groups:", error);
        }
    };
    fetchGroups();
}, []);

  const renderGroupCards = () => {
    return groupsByDegree.map((degree, index) => (
      <div key={index} style={styles.cardOverlay}>
        <div
          className="card"
          style={styles.card}
          onMouseEnter={(e) => (e.currentTarget.style.transform = styles.cardHover.transform)}
          onMouseLeave={(e) => (e.currentTarget.style.transform = '')}
        >
          <h2 style={styles.cardTitle}>{degree.degree_name}</h2>
          <p style={styles.cardText}>
            Total Groups: <span>{degree.total_groups}</span>
          </p>
        </div>
      </div>
    ));
  };
  const data = groupsByDegree.map((degree) => ({
    name: degree.degree_name,
    totalGroups: degree.total_groups,
    project1Groups: degree.project1_groups,
    project2Groups: degree.project2_groups,
}));
  const totalGroupsAcrossDegrees = data.reduce((sum, degree) => sum + degree.totalGroups, 0);

  const renderAssessmentGraph = () => {
    // Prepare data for the graph
    const data = assessmentByDegree.flatMap((degree) =>
      degree.courses.map((course) => ({
        degree: degree.degree_name,
        course: course.course_name,
        totalAssessments: course.total_assessments,
        completedAssessments: course.completed_assessments,
        remainingAssessments: course.remaining_assessments,
      }))
    );
  
    const CustomTooltip = ({ active, payload }) => {
      if (active && payload && payload.length) {
        const { degree, course } = payload[0].payload; // Getting degree and course info from the payload
        return (
          <div className="custom-tooltip" style={{ backgroundColor: '#fff', padding: '5px', border: '1px solid #ccc' }}>
            <p>{`Degree: ${degree}`}</p>
            <p>{`Course: ${course}`}</p>
            <p>{`Total Assessments: ${payload[0].value}`}</p>
          </div>
        );
      }
      return null;
    };
  
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <BarChart
          width={800}
          height={400}
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="degree" type="category" />
          <YAxis type="number" />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar dataKey="totalAssessments" fill="#8884d8" name="Total Assessments" />
          <Bar dataKey="completedAssessments" fill="#82ca9d" name="Scheduled/Completed" />
          <Bar dataKey="remainingAssessments" fill="#ffc658" name="Remaining" />
        </BarChart>
      </div>
    );
  };
  
            
  const renderGroupGraph = () => {
      return (
          <div style={{  justifyContent: 'center', alignItems: 'center', height: '100%' }}>
              <div>
                  <h2>Groups</h2>
                  {renderGroups()}
              </div>
              <div>
                  <h3>Assessments</h3>
                  {renderAssessmentGraph()}
              </div>
          </div>
      );
  };
      const renderGroups = () => {
          // Prepare data for the graph
          const data = groupsByDegree.map((degree) => ({
            name: degree.degree_name,
            totalGroups: degree.total_groups,
            project1Groups: degree.project1_groups,
            project2Groups: degree.project2_groups,
          }));
        
          return (
      
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
              
              <BarChart width={600} height={300} data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="totalGroups" fill="#8884d8" name="Total Groups" />
                <Bar dataKey="project1Groups" fill="#82ca9d" name="FYP1" />
                <Bar dataKey="project2Groups" fill="#ffc658" name="FYP2" />
              </BarChart>
            </div>
          );
        }
  return (
    <>
      <Header>
      <Announcements />
        <section style={styles.section}>
          <h1>Director Dashboard</h1>
          <div style={{display: 'flex'}}>
<Card
  icon={faUserTie}
  title="Supervisors"
  available={30}
  styles={styles}
/>
<Card
  icon={faUniversity}
  title="Faculty Members"
  available={50}
  styles={styles}
/>
<Card
  icon={faUsers}
  title="Fyp Groups"
  available={totalGroupsAcrossDegrees}
  styles={styles}
/>

          </div>
          <div> 
            {/* {renderGroups()} */}
            {/* {renderAssessments()} */}
            {renderGroupGraph()}
          </div>
        </section>

        <section style={styles.section}>
          <Dropdown1 title="Director" sections={directorSections} />
        </section>
      </Header>
    </>
  );

}


export default DirectorDashboard
