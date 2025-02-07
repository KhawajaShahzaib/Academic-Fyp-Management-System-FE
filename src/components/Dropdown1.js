// import React from 'react'
// import { useState } from 'react';
import '../components/HeaderMe.css';
// const Dropdown1 = () => {
//     const [isProjectOpen, setIsProjectOpen] = useState(true);
//     const [isCoursesOpen, setIsCoursesOpen] = useState(false);

//     const toggleProjectSection = () => {
//       setIsProjectOpen(!isProjectOpen);
//     };
//     const toggleCoursesSection = () => {
//       setIsCoursesOpen(!isCoursesOpen);
//   };

//   return (
//     <>
    
//     <div className="student-dashboard">
//     <h1>Supervisor</h1>
//     <button className="new-button"> + New </button>
//     <div className="project-section">
//       <div className="project-header" onClick={toggleProjectSection}>
//         <span>Supervising Setup</span>
//         <span>{isProjectOpen ? '▲' : '▼'}</span>
//       </div>
//       {isProjectOpen && (
//         <div className="project-options">
//           <div className="project-option" >Manage Specialization</div>
//           <div className="project-option">Set Availability</div>
//           <div className="project-option">Check Incoming Supervision Requests</div>
//         </div>

        

//       )}
//     </div>
   
//     <div className="courses-section">
//                 <div className="courses-header" onClick={toggleCoursesSection}>
//                     <span>Manage Student Groups</span>
//                     <span>{isCoursesOpen ? '▲' : '▼'}</span>
//                 </div>
//                 {isCoursesOpen && (
//                     <div className="courses-options">
//                         <div className="courses-option">Schedule Group Meetings</div>
//                         <div className="courses-option">View Group Meetings</div>
//                         <div className="courses-option">View Assigned Groups</div>
//                     </div>
//                 )}
//             </div>
           
           
//     <div className="courses-section">
//                 <div className="courses-header" onClick={toggleCoursesSection}>
//                     <span>Project Ideas</span>
//                     <span>{isCoursesOpen ? '▲' : '▼'}</span>
//                 </div>
//                 {isCoursesOpen && (
//                     <div className="courses-options">
//                         <div className="courses-option">Share Ideas</div>
                        
//                     </div>
//                 )}
//                 </div> 
            
//   </div>
//   </>
//   )
// }




// export default Dropdown1


// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';

// const Dropdown1 = ({ title, sections }) => {
//   const [openSections, setOpenSections] = useState({});

//   // Toggle the visibility of each section
//   const toggleSection = (sectionTitle) => {
//     setOpenSections((prevOpenSections) => ({
//       ...prevOpenSections,
//       [sectionTitle]: !prevOpenSections[sectionTitle],
//     }));
//   };
//   // const toggleSection = (index) => {
//   //   setOpenSections((prev) => ({
//   //     ...prev,
//   //     [index]: !prev[index], // Toggle the current section
//   //   }));
//   // };

//   return (
//     <>
//       <div className="student-dashboard">
//         <h1>{title}</h1>
//         {/* <button className="new-button"> + New </button> */}

//         {sections.map((section, index) => (
//           <div key={index} className="project-section">
          
//             <div className="courses-header" onClick={() => toggleSection(index)}>
//               <span>{section.title}</span>
//               <span>{openSections[section.title] ? '▲' : '▼'}</span>
//             </div>
//             {openSections[section.title] && (
//               <div className="courses-options">
//                 {section.options.map((option, optIndex) => (
//                 <Link
//                   to={option.link}
//                   key={optIndex}
//                   className="project-options">
//                   {option.name}
//                 </Link>
            
//                 ))}
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </>
//   );
// };

// export default Dropdown1;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../components/HeaderMe.css'; // Ensure your CSS is applied

const Dropdown1 = ({ title, sections }) => {
  // const [openSections, setOpenSections] = useState({});
  const [openSections, setOpenSections] = useState(
    sections.reduce((acc, _, index) => ({ ...acc, [index]: true }), {})
  );

  const toggleSection = (index) => {
    setOpenSections((prev) => ({
      ...prev,
      [index]: !prev[index], // Toggle the current section
    }));
  };

  return (
    <div className="student-dashboard">
      <h1>{title}</h1>
      {/* <button className="new-button"> + New </button> */}

      {sections.map((section, index) => (
        <div key={index} className="project-section">
          <div className="courses-header" onClick={() => toggleSection(index)}>
            <span>{section.title}</span>
            <span>{openSections[index] ? '▲' : '▼'}</span>
          </div>
          {openSections[index] && (
            <div className="courses-options">
              {section.options.map((option, optIndex) => (
                <Link
                  to={option.link}
                  key={optIndex}
                  className="project-option"
                >
                  {option.name}
                </Link>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Dropdown1;
