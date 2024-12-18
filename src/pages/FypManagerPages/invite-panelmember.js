// import React, { useState } from 'react';
// import styles from '../commonCSS/supervisorStyles'; // Ensure your CSS is applied
// import Header from "../../components/Header"; // Check this import

// const InvitePanelMembers = () => {
//     const [panelMembers, setPanelMembers] = useState([
//         { id: 1, name: 'Dr. Smith', expertise: 'Machine Learning' },
//         { id: 2, name: 'Dr. Jane', expertise: 'Web Development' },
//         { id: 3, name: 'Dr. Alex', expertise: 'Data Science' },
//         { id: 4, name: 'Prof. Tim', expertise: 'Machine Learning' }
//     ]);
//     const [selectedMembers, setSelectedMembers] = useState([]);
//     const [expertise, setExpertise] = useState('');

//     const handleSelectMember = (memberId) => {
//         setSelectedMembers((prev) => 
//             prev.includes(memberId) ? prev.filter(id => id !== memberId) : [...prev, memberId]
//         );
//     };

//     const handleInvite = () => {
//         console.log('Invitations sent to:', selectedMembers, 'for expertise in', expertise);
//         alert('Invitations sent successfully!');
//         setSelectedMembers([]); // Reset selection
//     };

//     return (
//         <Header>
//             <section style={styles.section}>
//                 <h2 style={styles.sectionHeader}>Invite Panel Members</h2>
//                 <select 
//                     style={styles.input}
//                     value={expertise}
//                     onChange={(e) => setExpertise(e.target.value)}
//                 >
//                     <option value="">Select Expertise</option>
//                     <option value="Machine Learning">Machine Learning</option>
//                     <option value="Web Development">Web Development</option>
//                     <option value="Data Science">Data Science</option>
//                 </select>

//                 <div>
//                     {panelMembers.filter(member => member.expertise === expertise).map(member => (
//                         <div key={member.id}>
//                             <label>
//                                 <input
//                                     type="checkbox"
//                                     checked={selectedMembers.includes(member.id)}
//                                     onChange={() => handleSelectMember(member.id)}
//                                 />
//                                 {member.name}
//                             </label>
//                         </div>
//                     ))}
//                 </div>

//                 <button onClick={handleInvite} style={styles.button}>Send Invites</button>
//             </section>
//         </Header>
//     );
// };

// export default InvitePanelMembers;


import React, { useState } from 'react';
import styles from '../commonCSS/supervisorStyles'; // Ensure your CSS is applied
import Header from "../../components/Header"; // Check this import

const InvitePanelMembers = () => {
    const [panelMembers, setPanelMembers] = useState([
        { id: 1, name: 'Dr. Smith', expertise: 'Machine Learning' },
        { id: 2, name: 'Dr. Jane', expertise: 'Web Development' },
        { id: 3, name: 'Dr. Alex', expertise: 'Data Science' },
        { id: 4, name: 'Prof. Tim', expertise: 'Machine Learning' }
    ]);
    const [selectedMembers, setSelectedMembers] = useState([]);
    const [expertise, setExpertise] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');

    const handleSelectMember = (memberId) => {
        setSelectedMembers((prev) => 
            prev.includes(memberId) ? prev.filter(id => id !== memberId) : [...prev, memberId]
        );
    };

    const handleInvite = () => {
        if (!date || !time) {
            alert("Please select both date and time for the booking slot.");
            return;
        }
        console.log('Invitations sent to:', selectedMembers, 'for expertise in', expertise, 'on', date, 'at', time);
        alert('Invitations sent successfully!');
        setSelectedMembers([]); // Reset selection
        setDate(''); // Reset date
        setTime(''); // Reset time
    };

    return (
        <Header>
            <section style={styles.section}>
                <h2 style={styles.sectionHeader}>Invite Panel Members</h2>

                {/* Expertise Dropdown */}
                <select 
                    style={styles.input}
                    value={expertise}
                    onChange={(e) => setExpertise(e.target.value)}
                >
                    <option value="">Select Expertise</option>
                    <option value="Machine Learning">Machine Learning</option>
                    <option value="Web Development">Web Development</option>
                    <option value="Data Science">Data Science</option>
                </select>

                {/* Date Input */}
                <div>
                    <label>
                        Booking Date:
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            style={styles.input}
                        />
                    </label>
                </div>

                {/* Time Input */}
                <div>
                    <label>
                        Booking Time:
                        <input
                            type="time"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                            style={styles.input}
                        />
                    </label>
                </div>

                {/* Filter and Display Panel Members Based on Expertise */}
                <div>
                    {panelMembers.filter(member => member.expertise === expertise).map(member => (
                        <div key={member.id}>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={selectedMembers.includes(member.id)}
                                    onChange={() => handleSelectMember(member.id)}
                                />
                                {member.name}
                            </label>
                        </div>
                    ))}
                </div>

                {/* Invite Button */}
                <button onClick={handleInvite} style={styles.button}>Send Invites</button>
            </section>
        </Header>
    );
};

export default InvitePanelMembers;
