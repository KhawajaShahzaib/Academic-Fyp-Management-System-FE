// import React from 'react';
// import './HeaderMe.css';

// const Announcements = () => {
//   return (
//     <section className="centered-content announcements">
//       <h1>Announcements</h1>
//       <div className="announcement">
//         <p>Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto Lorem Ipsum es simp texto de relleno de las imprentas y archivos de texto.</p>
//         <div className="button-container">
//           <button className='right'>Set Deadline</button>
//           <button className='right'>Post...</button>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Announcements;

//Working but not Posting
// import React, { useState, useEffect, useContext } from 'react';
// import './HeaderMe.css';
// import AuthContext from '../context/AuthContext';
// import axios from 'axios';

// const Announcements = () => {
//   const { user, authTokens, currentRole } = useContext(AuthContext); // Context with user and role
//   const [announcements, setAnnouncements] = useState([]);
//   const [newAnnouncement, setNewAnnouncement] = useState('');

//   useEffect(() => {
//     const fetchAnnouncements = async () => {
//       try {
//         const response = await axios.get('http://127.0.0.1:8000/api/fyp/announcements', {
//           headers: {
//             Authorization: `Bearer ${authTokens.access}`, // Include auth token
//           },
//         });
//         setAnnouncements(response.data);
//         console.log("Announcements fetched: ", response.data)
//       } catch (error) {
//         console.error('Error fetching announcements:', error);
//       }
//     };

//     fetchAnnouncements();
//   }, [authTokens]);

 

// const handlePostAnnouncement = async () => {
//   if (!newAnnouncement) return;

//   try {
//     console.log("Sending announcement: ", newAnnouncement)
//     const response = await axios.post(
//       'http://127.0.0.1:8000/api/fyp/announcements/', newAnnouncement, {
//         headers: { Authorization: `Bearer ${authTokens.access}` }
//     });
//     alert("Posted successfully!");
//     setAnnouncements((prev) => [response.data, ...prev]);
//     setNewAnnouncement('');

//     // Add new announcement to the list and clear the input

//   } catch (error) {
//     console.error('Error posting announcement:', error);
//   }
// };


//   return (
//     <section className="centered-content announcements">
//       <h1 className="announcements-title">General Announcements</h1>
//       <div className="announcement-list">
//   {announcements.map((announcement) => (
//     <div className="announcement-card" key={announcement.id}>
//       <h3 className="announcement-title">{announcement.title}</h3> {/* Render the title */}
//       <p className="announcement-content">{announcement.content}</p>
//       <small className="announcement-meta">
//         Posted by: {announcement.created_by} at {new Date(announcement.created_at).toLocaleString()}
//       </small>
//     </div>
//   ))}
// </div>

//       {(currentRole === 'FypManager' || currentRole === 'Director') && (
//         <div className="post-announcement">
//           <textarea
//             className="announcement-input"
//             value={newAnnouncement}
//             onChange={(e) => setNewAnnouncement(e.target.value)}
//             placeholder="Post an Announcement..."
//           />
//           <button className="post-button" onClick={handlePostAnnouncement}>
//             Post
//           </button>
//         </div>
//       )}


//     </section>
//   );
// };

// export default Announcements;

//Working but too big when too many announcements are added:
// import React, { useState, useEffect, useContext } from 'react';
// import './HeaderMe.css';
// import AuthContext from '../context/AuthContext';
// import axios from 'axios';

// const Announcements = () => {
//   const { user, authTokens, currentRole } = useContext(AuthContext); // Context with user and role
//   const [announcements, setAnnouncements] = useState([]);
//   const [newTitle, setNewTitle] = useState('');  // New state for the title
//   const [newAnnouncement, setNewAnnouncement] = useState('');

//   useEffect(() => {
//     const fetchAnnouncements = async () => {
//       try {
//         const response = await axios.get('http://127.0.0.1:8000/api/fyp/announcements', {
//           headers: {
//             Authorization: `Bearer ${authTokens.access}`, // Include auth token
//           },
//         });
//         setAnnouncements(response.data);
//         console.log("Announcements fetched: ", response.data)
//       } catch (error) {
//         console.error('Error fetching announcements:', error);
//       }
//     };

//     fetchAnnouncements();
//   }, [authTokens]);

//   const handlePostAnnouncement = async () => {
//     if (!newTitle || !newAnnouncement) return; // Ensure both fields are filled

//     try {
//       const newAnnouncementData = {
//         title: newTitle,  // Include title
//         content: newAnnouncement,  // Include content
//       };

//       console.log("Sending announcement: ", newAnnouncementData);

//       const response = await axios.post(
//         'http://127.0.0.1:8000/api/fyp/post-announcements/', newAnnouncementData, {
//           headers: { Authorization: `Bearer ${authTokens.access}` }
//         });

//       alert("Posted successfully!");
//       setAnnouncements((prev) => [response.data, ...prev]);
//       setNewTitle('');  // Clear title field
//       setNewAnnouncement('');  // Clear content field

//     } catch (error) {
//       console.error('Error posting announcement:', error);
//     }
//   };

//   return (
//     <section className="centered-content announcements">
//       <h1 className="announcements-title">General Announcements</h1>
//       <div className="announcement-list">
//         {announcements.map((announcement) => (
//           <div className="announcement-card" key={announcement.id}>
//             <h3 className="announcement-title">{announcement.title}</h3> {/* Render the title */}
//             <p className="announcement-content">{announcement.content}</p>
//             <small className="announcement-meta">
//               Posted by: {currentRole}: {announcement.created_by} at {new Date(announcement.created_at).toLocaleString()}
//             </small>
//           </div>
//         ))}
//       </div>

//       {(currentRole === 'FypManager' || currentRole === 'Director') && (
//         <div className="post-announcement">
//           <input
//             type="text"
//             className="announcement-title-input"
//             value={newTitle}
//             onChange={(e) => setNewTitle(e.target.value)}  // Update title state
//             placeholder="Enter Announcement Title"
//           />
//           <textarea
//             className="announcement-input"
//             value={newAnnouncement}
//             onChange={(e) => setNewAnnouncement(e.target.value)}
//             placeholder="Post an Announcement..."
//           />
//           <button className="post-button" onClick={handlePostAnnouncement}>
//             Post
//           </button>
//         </div>
//       )}
//     </section>
//   );
// };

// export default Announcements;
//Working but no Role Selection
// import React, { useState, useEffect, useContext } from 'react';
// import './HeaderMe.css';
// import AuthContext from '../context/AuthContext';
// import axios from 'axios';

// const Announcements = () => {
//   const { user, authTokens, currentRole } = useContext(AuthContext); // Context with user and role
//   const [announcements, setAnnouncements] = useState([]);
//   const [newTitle, setNewTitle] = useState(''); // New state for the title
//   const [newAnnouncement, setNewAnnouncement] = useState('');
//   const [showAll, setShowAll] = useState(false); // Toggle state for "See More"

//   useEffect(() => {
//     const fetchAnnouncements = async () => {
//       try {
//         const response = await axios.get('http://127.0.0.1:8000/api/fyp/announcements', {
//           headers: {
//             Authorization: `Bearer ${authTokens.access}`, // Include auth token
//           },
//         });
//         setAnnouncements(response.data);
//         console.log('Announcements fetched: ', response.data);
//       } catch (error) {
//         console.error('Error fetching announcements:', error);
//       }
//     };

//     fetchAnnouncements();
//   }, [authTokens]);

//   const handlePostAnnouncement = async () => {
//     if (!newTitle || !newAnnouncement) return; // Ensure both fields are filled

//     try {
//       const newAnnouncementData = {
//         title: newTitle, // Include title
//         content: newAnnouncement, // Include content
//         role: currentRole,
//         // roles: [],
//       };

//       console.log('Sending announcement: ', newAnnouncementData);

//       const response = await axios.post(
//         'http://127.0.0.1:8000/api/fyp/post-announcements/',
//         newAnnouncementData,
//         {
//           headers: { Authorization: `Bearer ${authTokens.access}` },
//         }
//       );

//       alert('Posted successfully!');
//       setAnnouncements((prev) => [response.data, ...prev]);
//       setNewTitle(''); // Clear title field
//       setNewAnnouncement(''); // Clear content field
//     } catch (error) {
//       console.error('Error posting announcement:', error);
//     }
//   };

//   const toggleShowAll = () => {
//     setShowAll((prev) => !prev); // Toggle between showing all and hiding extra
//   };

//   return (
//     <section className="centered-content announcements">
//       <h1 className="announcements-title">General Announcements</h1>
//       <div className="announcement-list">
//         {(showAll ? announcements : announcements.slice(0, 2)).map((announcement) => (
//           <div className="announcement-card" key={announcement.id}>
//             <h3 className="announcement-title">{announcement.title}</h3> {/* Render the title */}
//             <p className="announcement-content">{announcement.content}</p>
//             <small className="announcement-meta">
//               Posted by: {announcement.role.role_name}: {announcement.created_by} at{' '}
//               {new Date(announcement.created_at).toLocaleString()}
//             </small>
//           </div>
//         ))}
//         {announcements.length > 2 && (
//           <button className="see-more-button" onClick={toggleShowAll}>
//             {showAll ? 'Hide' : 'See All'}
//           </button>
//         )}
//       </div>

//       {(currentRole === 'FypManager' || currentRole === 'Director') && (
//         <div className="post-announcement">
//           <input
//             type="text"
//             style={{width: '99%'}}
//             value={newTitle}
//             onChange={(e) => setNewTitle(e.target.value)} // Update title state
//             placeholder="Enter Announcement Title"
//           />
//           <textarea
//             className="announcement-input"
//             value={newAnnouncement}
//             onChange={(e) => setNewAnnouncement(e.target.value)}
//             placeholder="Post an Announcement..."
//           />
//           <button className="post-button" onClick={handlePostAnnouncement}>
//             Post
//           </button>
//         </div>
//       )}
//     </section>
//   );
// };

// export default Announcements;

//Works but no role specification on who should get to display
// import React, { useState, useEffect, useContext } from 'react';
// import './HeaderMe.css';
// import AuthContext from '../context/AuthContext';
// import axios from 'axios';

// const Announcements = () => {
//   const { user, authTokens, currentRole } = useContext(AuthContext);
//   const [announcements, setAnnouncements] = useState([]);
//   const [newTitle, setNewTitle] = useState('');
//   const [newAnnouncement, setNewAnnouncement] = useState('');
//   const [showAll, setShowAll] = useState(false);

//   useEffect(() => {
//     const fetchAnnouncements = async () => {
//       try {
//         const response = await axios.get('http://127.0.0.1:8000/api/fyp/announcements', {
//           headers: {
//             Authorization: `Bearer ${authTokens.access}`,
//           },
//         });
//         setAnnouncements(response.data);
//         console.log('Announcements fetched: ', response.data);
//       } catch (error) {
//         console.error('Error fetching announcements:', error);
//       }
//     };

//     fetchAnnouncements();
//   }, [authTokens]);

//   const handlePostAnnouncement = async () => {
//     if (!newTitle || !newAnnouncement) return;

//     try {
//       const newAnnouncementData = {
//         title: newTitle,
//         content: newAnnouncement,
//         role: currentRole,
//       };

//       const response = await axios.post(
//         'http://127.0.0.1:8000/api/fyp/post-announcements/',
//         newAnnouncementData,
//         {
//           headers: { Authorization: `Bearer ${authTokens.access}` },
//         }
//       );

//       alert('Posted successfully!');
//       setAnnouncements((prev) => [response.data, ...prev]);
//       setNewTitle('');
//       setNewAnnouncement('');
//     } catch (error) {
//       console.error('Error posting announcement:', error);
//     }
//   };

//   const handleDeleteAnnouncement = async (id) => {
//     if (!window.confirm('Are you sure you want to delete this announcement?')) return;

//     try {
//       await axios.delete(`http://127.0.0.1:8000/api/fyp/delete-announcement/${id}/`, {
//         headers: {
//           Authorization: `Bearer ${authTokens.access}`,
//         },
//       });

//       setAnnouncements((prev) => prev.filter((announcement) => announcement.id !== id));
//       alert('Announcement deleted successfully!');
//     } catch (error) {
//       console.error('Error deleting announcement:', error);
//     }
//   };

//   const toggleShowAll = () => {
//     setShowAll((prev) => !prev);
//   };

//   return (
//     <section className="centered-content announcements">
//       <h1 className="announcements-title">General Announcements</h1>
//       <div className="announcement-list">
//         {(showAll ? announcements : announcements.slice(0, 2)).map((announcement) => (
//           <div className="announcement-card" key={announcement.id}>
//             <h3 className="announcement-title">{announcement.title}</h3>
//             <p className="announcement-content">{announcement.content}</p>
//             <small className="announcement-meta">
//               Posted by: {announcement.role.role_name}: {announcement.created_by} at{' '}
//               {new Date(announcement.created_at).toLocaleString()}
//             </small>
//             {(currentRole === 'FypManager' || currentRole === 'Director') && (
//               <div className="announcement-actions">
//                 <button
//                   className="delete-announcement-button"
//                   onClick={() => handleDeleteAnnouncement(announcement.id)}
//                 >
//                   Delete
//                 </button>
//               </div>
//             )}
//           </div>
//         ))}
//         {announcements.length > 2 && (
//           <button className="see-more-button" onClick={toggleShowAll}>
//             {showAll ? 'Hide' : 'See All'}
//           </button>
//         )}
//       </div>

//       {(currentRole === 'FypManager' || currentRole === 'Director') && (
//         <div className="post-announcement">
//           <input
//             type="text"
//             style={{ width: '99%' }}
//             value={newTitle}
//             onChange={(e) => setNewTitle(e.target.value)}
//             placeholder="Enter Announcement Title"
//           />
//           <textarea
//             className="announcement-input"
//             value={newAnnouncement}
//             onChange={(e) => setNewAnnouncement(e.target.value)}
//             placeholder="Post an Announcement..."
//           />
//           <button className="post-button" onClick={handlePostAnnouncement}>
//             Post
//           </button>
//         </div>
//       )}
//     </section>
//   );
// };

// export default Announcements;


import React, { useState, useEffect, useContext } from 'react';
import './HeaderMe.css';
import AuthContext from '../context/AuthContext';
import axios from 'axios';
import styles from '../pages/commonCSS/fypmanagerstyles';

const Announcements = () => {
  const { user, authTokens, currentRole } = useContext(AuthContext);
  const [announcements, setAnnouncements] = useState([]);
  const [newTitle, setNewTitle] = useState('');
  const [newAnnouncement, setNewAnnouncement] = useState('');
  const [newRoles, setNewRoles] = useState([]); // To hold selected roles
  const [showAll, setShowAll] = useState(false);

  // Predefined roles list
  const rolesList = ['Supervisor', 'Student', 'Director', 'FypManager', 'Panel', 'Teacher'].filter(role => role !== currentRole);


  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/fyp/announcements?role=${currentRole}`, {
          headers: {
            Authorization: `Bearer ${authTokens.access}`,
          },
        });
        setAnnouncements(response.data);
        console.log('Announcements fetched: ', response.data);
      } catch (error) {
        console.error('Error fetching announcements:', error);
      }
    };
  
    fetchAnnouncements();
  }, [authTokens, currentRole]);

  const handlePostAnnouncement = async () => {
    if (!newTitle || !newAnnouncement || newRoles.length === 0) {
      alert('Please fill in all fields and select at least one role.');
      return;
    }

    try {
      const updatedRoles = [...newRoles, currentRole]; // Append currentRole to the newRoles

      const newAnnouncementData = {
        title: newTitle,
        content: newAnnouncement,
        roles: updatedRoles, // Attach roles to announcement
        role: currentRole,
      };
      console.log("sending announcmenet: ", newAnnouncementData)

      const response = await axios.post(
        'http://127.0.0.1:8000/api/fyp/post-announcements/',
        newAnnouncementData,
        {
          headers: { Authorization: `Bearer ${authTokens.access}` },
        }
      );

      alert('Posted successfully!');
      setAnnouncements((prev) => [response.data, ...prev]);
      setNewTitle('');
      setNewAnnouncement('');
      setNewRoles([]); // Clear roles selection
    } catch (error) {
      console.error('Error posting announcement:', error);
    }
  };

  const handleDeleteAnnouncement = async (id) => {
    if (!window.confirm('Are you sure you want to delete this announcement?')) return;

    try {
      await axios.delete(`http://127.0.0.1:8000/api/fyp/delete-announcement/${id}/`, {
        headers: {
          Authorization: `Bearer ${authTokens.access}`,
        },
      });

      setAnnouncements((prev) => prev.filter((announcement) => announcement.id !== id));
      alert('Announcement deleted successfully!');
    } catch (error) {
      console.error('Error deleting announcement:', error);
    }
  };

  const toggleShowAll = () => {
    setShowAll((prev) => !prev);
  };

  const handleRoleSelection = (role) => {
    if (newRoles.includes(role)) {
      setNewRoles(newRoles.filter((r) => r !== role));
    } else {
      setNewRoles([...newRoles, role]);
    }
  };
  const [showPostForm, setShowPostForm] = useState(false);

//   return (
//     <section className="centered-content announcements">
//       <h1 className="announcements-title">General Announcements</h1>
//       <div className="announcement-list">
//         {(showAll ? announcements : announcements.slice(0, 2)).map((announcement) => (
//           <div className="announcement-card" key={announcement.id}>
//             <h3 className="announcement-title">{announcement.title}</h3>
//             <p className="announcement-content">{announcement.content}</p>
//             <small className="announcement-meta">
//               Posted by: {announcement.role.role_name}: {announcement.created_by} at{' '}
//               {new Date(announcement.created_at).toLocaleString()}
//             </small>
//             {(currentRole === 'FypManager' || currentRole === 'Director') && (
//               <div className="announcement-actions">
//                 <button
//                   className="delete-announcement-button"
//                   onClick={() => handleDeleteAnnouncement(announcement.id)}
//                 >
//                   Delete
//                 </button>
//               </div>
//             )}
//           </div>
//         ))}
//         {announcements.length > 2 && (
//           <button className="see-more-button" onClick={toggleShowAll}>
//             {showAll ? 'Hide' : 'See All'}
//           </button>
//         )}
//       </div>

//       {(currentRole === 'FypManager' || currentRole === 'Director') && (
//         <div className="post-announcement">
//           <input
//             type="text"
//             style={{ width: '99%' }}
//             value={newTitle}
//             onChange={(e) => setNewTitle(e.target.value)}
//             placeholder="Enter Announcement Title"
//           />
//           <textarea
//             className="announcement-input"
//             value={newAnnouncement}
//             onChange={(e) => setNewAnnouncement(e.target.value)}
//             placeholder="Post an Announcement..."
//           />
//        <div className="roles-selection" style={{ textAlign: 'center', marginTop: '1rem' }}>
//   <p style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>Associated Roles:</p>
//   <div
//     style={{
//       display: 'flex',
//       justifyContent: 'center',
//       alignItems: 'center',
//       gap: '1.5rem',
//       flexWrap: 'wrap',
//     }}
//   >
//     {rolesList.map((role) => (
//       <label
//         key={role}
//         style={{
//           display: 'flex',
//           fontSize: '1.25rem',
//           fontWeight: '500',
//           padding: '0.5rem 1rem',
//           border: '1px solid #ccc',
//           borderRadius: '12px',
//           backgroundColor: '#f9f9f9',
//           cursor: 'pointer',
//           transition: 'all 0.3s ease',
//         }}
//         onMouseEnter={(e) => (e.target.style.backgroundColor = '#e0f7fa')}
//         onMouseLeave={(e) => (e.target.style.backgroundColor = '#f9f9f9')}
//       >
//         <input
//           type="checkbox"
//           value={role}
//           checked={newRoles.includes(role)}
//           onChange={() => handleRoleSelection(role)}
//           style={{
//             transform: 'scale(1.5)',
//             marginRight: '0.75rem',
//             accentColor: '#007bff', // Changes the checkbox color
//           }}
//         />
//         {role}
//       </label>
//     ))}
//   </div>
// </div>



//           <button className="post-button" onClick={handlePostAnnouncement}>
//             Post
//           </button>
//         </div>
//       )}
//     </section>
//   );


return (
  <section className="centered-content announcements">
    <h1 className="announcements-title">General Announcements</h1>
    <div className="announcement-list">
      {announcements.length === 0 ? (
        <p className="no-announcements-message">
          No announcements yet. Check back later for updates!
        </p>
      ) : (
        (showAll ? announcements : announcements.slice(0, 2)).map((announcement) => (
          <div className="announcement-card" key={announcement.id}>
            <h3 className="announcement-title">{announcement.title}</h3>
            <p className="announcement-content">{announcement.content}</p>
            <small className="announcement-meta">
              Posted by: {announcement.role.role_name}: {announcement.created_by} at{' '}
              {new Date(announcement.created_at).toLocaleString()}
            </small>
            {(currentRole === 'FypManager' || currentRole === 'Director') && (
              <div className="announcement-actions">
                <button
                  className="delete-announcement-button"
                  onClick={() => handleDeleteAnnouncement(announcement.id)}
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ))
      )}
      {announcements.length > 2 && (
        <button className="see-more-button" onClick={toggleShowAll}>
          {showAll ? 'Hide' : 'See All'}
        </button>
      )}
    </div>

    {(currentRole === 'FypManager' || currentRole === 'Director') && (
      <>
        <button
          className="delete-announcement-button"
          onClick={() => setShowPostForm(!showPostForm)}
          style={{
            marginTop: '1rem',
          //   padding: '0.75rem 1.5rem',
          //   backgroundColor: '#007bff',
          //   color: 'white',
          //   border: 'none',
          //   borderRadius: '8px',
          //   cursor: 'pointer',
          }}
          
        >
          {showPostForm ? 'Hide' : 'Post An Announcement'}
        </button>

        {showPostForm && (
          <div className="post-announcement">
            <input
              type="text"
              style={{ width: '99%' }}
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Enter Announcement Title"
            />
            <textarea
              className="announcement-input"
              value={newAnnouncement}
              onChange={(e) => setNewAnnouncement(e.target.value)}
              placeholder="Post an Announcement..."
            />
            <div className="roles-selection" style={{ textAlign: 'center', marginTop: '1rem' }}>
              <p style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
                Associated Roles:
              </p>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '1.5rem',
                  flexWrap: 'wrap',
                }}
              >
                {rolesList.map((role) => (
                  <label
                    key={role}
                    style={{
                      display: 'flex',
                      fontSize: '1.25rem',
                      fontWeight: '500',
                      padding: '0.5rem 1rem',
                      border: '1px solid #ccc',
                      borderRadius: '12px',
                      backgroundColor: '#f9f9f9',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                    }}
                    onMouseEnter={(e) => (e.target.style.backgroundColor = '#e0f7fa')}
                    onMouseLeave={(e) => (e.target.style.backgroundColor = '#f9f9f9')}
                  >
                    <input
                      type="checkbox"
                      value={role}
                      checked={newRoles.includes(role)}
                      onChange={() => handleRoleSelection(role)}
                      style={{
                        transform: 'scale(1.5)',
                        marginRight: '0.75rem',
                        accentColor: '#007bff',
                      }}
                    />
                    {role}
                  </label>
                ))}
              </div>
            </div>

            <button className="post-button" onClick={handlePostAnnouncement}>
              Post
            </button>
          </div>
        )}
      </>
    )}
  </section>
);



};

export default Announcements;














