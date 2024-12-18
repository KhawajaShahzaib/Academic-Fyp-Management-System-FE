// import React from 'react';
// import { Chart } from 'chart.js';
// import styles from '../commonCSS/supervisorStyles.js'; // Import your common CSS
// import Header from "../../components/Header";

// const ViewResult = () => {
//     React.useEffect(() => {
//         // Define your data structure
//         const fypData = {
//             semesters: [
                
                
//                 'Fall 2022', 'Spring 2023',
//                 'Fall 2023', 'Spring 2024' // Adding Spring 2024 if needed
//             ],
//             fypStages: ['FYP1', 'FYP2'],
//             degrees: {
//                 BSCS: [85, 87, 90, 92, 89, 91, 90, 88, 92, 94], // Example data
//                 BSSE: [82, 85, 88, 90, 91, 92, 93, 89, 91, 90],
//                 BSIT: [88, 90, 93, 91, 95, 94, 92, 90, 91, 93],
//             },
//         };

//         // Prepare labels and datasets
//         const labels = [];
//         const datasets = Object.keys(fypData.degrees).map((degree, index) => {
//             return {
//                 label: degree,
//                 data: [],
//                 backgroundColor: `rgba(${54 + index * 30}, ${162 - index * 20}, ${235 - index * 30}, 0.6)`, // Dynamic color
//             };
//         });

//         fypData.semesters.forEach(semester => {
//             fypData.fypStages.forEach(stage => {
//                 labels.push(`${semester} ${stage}`);
//             });
//         });

//         // Populate datasets with data for each degree
//         Object.keys(fypData.degrees).forEach((degree, index) => {
//             fypData.degrees[degree].forEach((value) => {
//                 datasets[index].data.push(value);
//             });
//         });

//         // FYP Progress Completion Chart
//         const ctxReport2 = document.getElementById('reportChart2').getContext('2d');
//         const reportChart2 = new Chart(ctxReport2, {
//             type: 'bar',
//             data: {
//                 labels,
//                 datasets,
//             },
//             options: {
//                 responsive: true,
//                 scales: {
//                     y: {
//                         beginAtZero: true,
//                         title: {
//                             display: true,
//                             text: 'Avg Grade of Groups (%)',
//                         },
//                     },
//                     x: {
//                         title: {
//                             display: true,
//                             text: 'Semester & FYP Stage',
//                         },
//                     },
//                 },
//             },
//         });

//         // Cleanup charts on component unmount
//         return () => {
//             reportChart2.destroy();
//         };
//     }, []);

//     return (
//         <Header>
//             <div className={styles.container}>
//                 <main>
//                     <div className={styles.charts}>
//                         <h2>FYP Progress Completion of Each Degree</h2>
//                         <canvas id="reportChart2"></canvas>
//                     </div>
//                     <div className={styles.supervisors}>
//                         <h2>Supervisors Overview</h2>
//                         <ul>
//                             <li>Dr. Smith - 3 Groups</li>
//                             <li>Dr. Johnson - 2 Groups</li>
//                             <li>Dr. Lee - 3 Groups</li>
//                             <li>Dr. Green - 1 Group</li>
//                         </ul>
//                     </div>
//                 </main>
//             </div>
//         </Header>
//     );
// };

// export default ViewResult;

import React, { useState, useEffect, useRef } from 'react';
import { Chart } from 'chart.js';
import styles from '../commonCSS/supervisorStyles.js'; // Import your common CSS
import Header from "../../components/Header";

const ViewResult = () => {
    const [selectedSemester, setSelectedSemester] = useState('Fall 2022'); // Default selection
    const chartRef = useRef(null); // Create a ref for the canvas

    const fypData = {
        semesters: ['Fall 2022', 'Spring 2023', 'Fall 2023', 'Spring 2024'],
        fypStages: ['FYP1', 'FYP2'],
        degrees: {
            BSCS: {
                'Fall 2022': [85, 90],
                'Spring 2023': [87, 92],
                'Fall 2023': [90, 93],
                'Spring 2024': [92, 94],
            },
            BSSE: {
                'Fall 2022': [82, 88],
                'Spring 2023': [85, 91],
                'Fall 2023': [88, 90],
                'Spring 2024': [90, 92],
            },
            BSIT: {
                'Fall 2022': [88, 93],
                'Spring 2023': [90, 91],
                'Fall 2023': [93, 95],
                'Spring 2024': [91, 92],
            },
        },
    };

    useEffect(() => {
        const labels = [];
        const datasets = Object.keys(fypData.degrees).map((degree, index) => ({
            label: degree,
            data: [],
            backgroundColor: `rgba(${54 + index * 30}, ${162 - index * 20}, ${235 - index * 30}, 0.6)`, // Dynamic color
        }));

        // Generate labels based on selected semester and FYP stages
        fypData.fypStages.forEach(stage => {
            labels.push(`${selectedSemester} ${stage}`);
        });

        // Populate datasets based on selected semester
        Object.keys(fypData.degrees).forEach((degree, index) => {
            const values = fypData.degrees[degree][selectedSemester]; // Get values for selected semester
            if (values) {
                datasets[index].data = values; // Set data for FYP stages
            }
        });

        if (chartRef.current) {
            const ctxReport2 = chartRef.current.getContext('2d');
            const reportChart2 = new Chart(ctxReport2, {
                type: 'bar',
                data: { labels, datasets },
                options: {
                    responsive: true,
                    scales: {
                        y: {
                            beginAtZero: true,
                            title: { display: true, text: 'Avg Grade of Groups (%)' },
                        },
                        x: {
                            title: { display: true, text: 'Semester & FYP Stage' },
                        },
                    },
                },
            });

            // Cleanup charts on component unmount
            return () => {
                reportChart2.destroy();
            };
        }
    }, [selectedSemester]); // Re-run when semester changes

    return (
        <Header>
            <section style={styles.section}>  
                    <div className={styles.charts}>
                        <h2>FYP Progress Completion of Each Degree</h2>
                        <select onChange={(e) => setSelectedSemester(e.target.value)} value={selectedSemester}>
                            {fypData.semesters.map((semester, index) => (
                                <option key={index} value={semester}>
                                    {semester}
                                </option>
                            ))}
                        </select>
                        <canvas ref={chartRef} id="reportChart2"></canvas>
                    </div>
            </section>
        </Header>
    );
};

export default ViewResult;
