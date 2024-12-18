const styles = {
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
        borderBottom: '1px solid #ddd',
        width: '25%',
        fontWeight: 'bold',
    },
    tableRow: {
        backgroundColor: '#fff',
    },
    tableCell: {
        padding: '10px',
        borderBottom: '1px solid #ddd',
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
        padding: '8px',
        margin: '10px 0',
        border: '1px solid #ddd',
        borderRadius: '4px',
        boxSizing: 'border-box',
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

modal: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background overlay
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000, // Ensure it's on top
},
modalContent: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    width: '400px', // Centered form width
    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)', // Light shadow for emphasis
},
closeButton: {
    cursor: 'pointer',
    fontSize: '1.5em',
    position: 'absolute',
    right: '15px',
    top: '10px',
    color: '#aaa',
},
container: {
    padding: '20px',
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
    backgroundColor: '#f8f8f8',
},
tableHeader: {
    padding: '10px',
    borderBottom: '2px solid #ddd',
    textAlign: 'left',
},
tableRow: {
    '&:nth-child(even)': {
        backgroundColor: '#f2f2f2',
    },
},
tableCell: {
    padding: '10px',
    borderBottom: '1px solid #ddd',
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
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: '1000',
},
modalContent: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    width: '500px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    position: 'relative',
},
close: {
    position: 'absolute',
    top: '10px',
    right: '15px',
    fontSize: '18px',
    cursor: 'pointer',
},
input: {
    width: '100%',
    padding: '10px',
    margin: '10px 0',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontSize: '16px',
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
}

    
};

export default styles;
