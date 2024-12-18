import React, { useState, useEffect, useContext } from 'react';
import '../../components/HeaderMe.css';
import AuthContext from '../../context/AuthContext';
import Header from "../../components/Header";
import styles from '../commonCSS/supervisorStyles.js';
import { Chart } from 'chart.js/auto';

const ViewProgress = () => {
  const { user } = useContext(AuthContext);

  const courseData = {
    'fyp1': { completed: 3, total: 5, groups: 12 },
    'fyp2': { completed: 2, total: 4, groups: 10 },
    'bsse': { completed: 4, total: 6, groups: 8 },
    'bsit': { completed: 5, total: 7, groups: 9 },
  };

  const [selectedCourse, setSelectedCourse] = useState('fyp1');

  useEffect(() => {
    initializeChart();
  }, []); // Initialize chart only once on component mount

  const initializeChart = () => {
    const ctx = document.getElementById('progressChart').getContext('2d');
    const { completed, total } = courseData[selectedCourse];

    if (window.progressChart instanceof Chart) {
      window.progressChart.destroy();
    }

    window.progressChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Completed Assessments', 'Total Assessments'],
        datasets: [{
          label: 'Assessments',
          data: [completed, total],
          backgroundColor: ['rgba(54, 162, 235, 0.2)', 'rgba(255, 99, 132, 0.2)'],
          borderColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 99, 132, 1)'],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            title: { display: true, text: 'Number of Assessments' }
          }
        }
      }
    });
  };

  const updateChart = (course) => {
    const { completed, total } = courseData[course];

    if (window.progressChart instanceof Chart) {
      window.progressChart.data.datasets[0].data = [completed, total];
      window.progressChart.update();
    }
  };

  const handleCourseChange = (event) => {
    const course = event.target.value;
    setSelectedCourse(course);
    updateChart(course);
  };

  return (
    <Header>
      <section style={styles.section}>
        <h1>Director Dashboard</h1>
        <div className="summary">
          <div className="card">
            <h2>Total Groups in Progress</h2>
            {/* Display the group number dynamically based on the selected course */}
            <p><span>Currently {courseData[selectedCourse].groups} in progress</span></p>
          </div>
        </div>

        <div className="dropdown-section">
          <label htmlFor="courses">Courses:</label>
          <select id="courses" value={selectedCourse} onChange={handleCourseChange}>
            <option value="fyp1">FYP-1 BSCS FALL 2024</option>
            <option value="fyp2">FYP-2 BSCS FALL 2024</option>
            <option value="bsse">FYP-1 BSSE FALL 2024</option>
            <option value="bsit">FYP-2 BSSE FALL 2024</option>
          </select>
        </div>

        <div className="chart-section">
          <h2>Course Progress</h2>
          <canvas id="progressChart" width="400" height="200"></canvas>
        </div>
      </section>
    </Header>
  );
};

export default ViewProgress;
