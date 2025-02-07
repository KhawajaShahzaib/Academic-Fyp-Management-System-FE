const styles = {
    count: {
        fontSize: '34px',
        color: '#0073e6',
        fontWeight: 'bold',
      },
    container: {
        padding: '20px',
        backgroundColor: '#f5f5f5',
        borderRadius: '8px',
        maxWidth: '1000px', 
        margin: '0 auto',   
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        marginTop: '20px',
    },
    tableHeaderRow: {
        backgroundColor: '#007BFF',
        color: '#fff',
    },
    tableHeader: {
        padding: '10px',
        textAlign: 'left',
        border: '1px solid #ddd',
        width: '25%',
        fontWeight: 'bold',
    },
    tableRow: {
        backgroundColor: '#fff',
    },
    tableCell: {
        padding: '10px',
        border: '1px solid #ddd',
        textAlign: 'left',
        width: '25%',
    },
    dropdownButton: {
        padding: '8px 15px',
        backgroundColor: '#28a745',
        color: '#fff',
        border: 'none',
        cursor: 'pointer',
        borderRadius: '4px',
        display: 'inline-block',
    },
    createAssessmentButton: {
        padding: '10px 20px',
        backgroundColor: '#007BFF',
        color: '#fff',
        border: 'none',
        cursor: 'pointer',
        borderRadius: '5px',
        display: 'block',
        margin: '20px 0', 
        textAlign: 'center', // Center the button horizontally
    },
    inputField: {
        width: '100%',
        padding: '10px',
        margin: '10px , 0',
        border: '1px solid #ccc',
        borderRadius: '4px',
        fontSize: '16px',
        marginBottom: '20px',
    },
    courseSelect: {
    fontWeight: 'bold', marginBottom: '10px', display: 'block'
    },
    questionContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '10px',
    },
    addQuestionButton: {
        padding: '8px 15px',
        backgroundColor: '#007BFF',
        color: '#fff',
        border: 'none',
        cursor: 'pointer',
        borderRadius: '4px',
    },
    dropdownMenu: {
        marginTop: '5px',
        backgroundColor: '#f8f9fa',
        border: '1px solid #ddd',
        borderRadius: '4px',
        padding: '10px',
        position: 'absolute',
        zIndex: 1,
        width: '200px',
    },
    dropdownItem: {
        padding: '5px 0',
        cursor: 'pointer',
        borderBottom: '1px solid #ddd',
    },
    downloadButton: {
        padding: '8px 15px',
        backgroundColor: '#007BFF',
        color: '#fff',
        border: 'none',
        cursor: 'pointer',
        borderRadius: '4px',
    },

    removeQuestionButton: {
        padding: '5px 10px',
        backgroundColor: '#dc3545', // Red color for removal
        color: '#fff',
        border: 'none',
        cursor: 'pointer',
        borderRadius: '4px',
        marginLeft: '10px', // Adds some space between the fields and the button
    },

    // In fypmanagerstyles.js
    actionButton: {
        padding: '5px 10px',
        margin: '2px',
        fontSize: '0.9em',
        cursor: 'pointer',
        backgroundColor: '#4CAF50', // Or another color for primary action
        color: '#fff',
        border: 'none',
        borderRadius: '5px'
},

// modal: {
//     position: 'fixed',
//     top: 0,
//     left: 0,
//     width: '100%',
//     height: '100%',
//     backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background overlay
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     zIndex: 1000, // Ensure it's on top
// },
// modalContent: {
//     backgroundColor: '#fff',
//     padding: '20px',
//     borderRadius: '8px',
//     width: '400px', // Centered form width
//     boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)', // Light shadow for emphasis
// },
closeButton: {
    cursor: 'pointer',
    fontSize: '1.5em',
    position: 'absolute',
    right: '15px',
    top: '10px',
    color: '#aaa',
},
container: {
    // padding: '20px',
    maxWidth: '1200px',
    margin: '0 auto',
    fontFamily: 'Arial, sans-serif',
},
label: {
    fontWeight: 'bold',
    marginRight: '10px',
},
dropdown: {
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontSize: '16px',
},
createAssessmentButton: {
    marginBottom: '20px',
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: '#fff',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
},
table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px',
},
tableHeaderRow: {
    backgroundColor: '#f2f2f2',
},
tableHeader: {
    padding: '10px',
    border: '2px solid #ddd',
    textAlign: 'left',
},
tableRow: {
    '&:nth-child(even)': {
        backgroundColor: '#f2f2f2',
    },
},
tableCell: {
    textAlign: 'left',

    padding: '10px',
    border: '1px solid #ddd',
},
actionButton: {
    padding: '8px 12px',
    margin: '0 5px',
    borderRadius: '4px',
    border: '1px solid #007bff',
    backgroundColor: '#007bff',
    color: '#fff',
    cursor: 'pointer',
    fontSize: '14px',
    transition: 'background 0.3s ease',
},
modal: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
},
modalContent: {
    backgroundColor: '#f9f9f9',
    padding: '40px',
    borderRadius: '12px',
    width: '50%',
    boxShadow: '0 12px 24px rgba(0, 0, 0, 0.3)',
    position: 'relative',
    fontFamily: 'Roboto, Arial, sans-serif',
    color: '#333',
    lineHeight: 1.6,
},
close: {
    position: 'absolute',
    top: '15px',
    right: '20px',
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#888',
    cursor: 'pointer',
    transition: 'color 0.3s ease',
},
closeHover: {
    color: '#444',
},
input: {
    width: '100%',
        padding: '10px',
        margin: '10px , 0',
        border: '1px solid #ccc',
        borderRadius: '4px',
        fontSize: '16px',
        marginBottom: '20px'
},
submitButton: {
    padding: '12px 20px',
    backgroundColor: '#28a745',
    color: '#fff',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
    display: 'block',
    width: '100%',
    textAlign: 'center',
    marginTop: '20px',
},
submitButtonHover: {
    '&:hover': {
        backgroundColor: '#218838',
    },
},
card: {
    backgroundColor: '#ffffff',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    transition: 'transform 0.3s',
    flex: 1,

  },
  cardHover: {
    transform: 'scale(1.05)',
  },
  cardIcon: {
    fontSize: '40px',
    color: '#007bff',
    marginBottom: '10px',
  },
  moveButton: {
    padding: '5px 10px',
    margin: '2px',
    cursor: 'pointer',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
},


//Room stuff

actionButtons: {
    display: 'flex',
    gap: '0.5rem',
},
editButton: {
    backgroundColor: '#007bff',
    color: 'white',
    padding: '0.5rem',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
},
deleteButton: {
    backgroundColor: '#dc3545',
    color: 'white',
    padding: '0.5rem',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
},

roleButton: {
    padding: '20px', // Larger padding for bigger buttons
    backgroundColor: '#007bff', // Bootstrap primary color
    color: '#fff',
    width: '1120px',
    border: 'none',
    borderRadius: '12px', // More rounded corners
    fontSize: '24px', // Increased font size for button text
    fontWeight: '600', // Bolder button text
    cursor: 'pointer',
    transition: 'background-color 0.3s ease, transform 0.2s ease',
    boxShadow: '0 8px 12px rgba(0, 0, 0, 0.2)', // More pronounced shadow
},
};

export default styles;
