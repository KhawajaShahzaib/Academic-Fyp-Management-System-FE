const styles = {
    header: {
      textAlign: 'center',
      margin: '20px 0',
    },
    section: {
      margin: '20px 0',
      padding: '20px',
      border: '1px solid #ddd',
      borderRadius: '8px',
      backgroundColor: '#f9f9f9',
    },
    subHeader: {
      fontSize: '18px',
      margin: '10px 0',
      color: '#555',
  },
  checkboxContainer: {
    // display: 'flex',
    alignItems: 'center',
    gap: '8px',
},
checkboxlabel: {
  fontSize: '16px',
  color: '#333',
},
    specialtyContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
      marginBottom: '20px',
  },
    sectionHeader: {
      marginBottom: '10px',
      fontSize: '1.5em',
    },
    cardContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      gap: '15px',
    },
    // card: {
    //   backgroundColor: 'rgb(225 223 223)',
    //   padding: '20px',
    //   borderRadius: '8px',
    //   boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    //   width: '280px',
    //   textAlign: 'center',
    // },
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
    cardOverlay: {
      // border: '2px solid blue', // Adds a blue border
      display: 'flex',
      justifyContent: 'space-between',
      gap: '20px'
    },
    cardTitle: {
      marginBottom: '10px',
      fontSize: '20px',
  },  
    cardText: {
      color: '#666',
    },
    input: {
      display: 'block',
      width: '100%',
      padding: '10px',
      margin: '10px 0',
      border: '1px solid #ddd',
      borderRadius: '4px',
    },
    textarea: {
      display: 'block',
      width: '100%',
      padding: '10px',
      margin: '10px 0',
      border: '1px solid #ddd',
      borderRadius: '4px',
      minHeight: '100px',
    },
    button: {
      padding: '10px 20px',
      backgroundColor: '#007bff',
      color: '#fff',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      marginRight: '10px',
    },
    list: {
      listStyle: 'none',
      padding: 0,
    },
    listItem: {
      marginBottom: '10px',
    },
    label: {
      display: 'block',
      margin: '10px 0 5px',
    },
    actionButton: {
      padding: '5px 10px',
      margin: '2px',
      fontSize: '0.9em',
      cursor: 'pointer',
      backgroundColor: '#007bff', // Or another color for primary action
      color: '#fff',
      border: 'none',
      borderRadius: '5px'
},
removeQuestionButton: {
  padding: '5px 10px',
  fontSize: '0.9em',
  backgroundColor: '#dc3545', // Red color for removal
  color: '#fff',
  border: 'none',
  cursor: 'pointer',
  borderRadius: '5px',
  marginLeft: '10px', // Adds some space between the fields and the button
},


  };

  export default styles;
