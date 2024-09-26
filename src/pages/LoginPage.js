//Original
// import React, {useContext} from 'react'
// import AuthContext from '../context/AuthContext'
// import logo from '../public/RIU-Post-01-800x239.png';

// const LoginPage = () => {
//     let {loginUser} = useContext(AuthContext)

//     const togglePasswordVisibility = () => {
//         const passwordField = document.querySelector('#password');
//         const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
//         passwordField.setAttribute('type', type);
//     };

//     return (
//         <div className="container">
//             <div className="login-box">
//                 <div className="logo">
//                     <img src={logo} alt="Riphah International University" />
//                 </div>
//                 <h1 className="login-title">Login</h1>
//                 <form onSubmit={loginUser}>
//                     <label htmlFor="username" className="input-label">Email address</label>
//                     <input type="text" id="username" name="username" className="input-field" placeholder="username" required />

//                     <label htmlFor="password" className="input-label">Password</label>
//                     <div className="password-container">
//                         <input type="password" id="password" name="password" className="input-field" placeholder="password" required />
//                         <button type="button" className="toggle-password" onClick={togglePasswordVisibility}>
//                             <span className="eye"></span>
//                         </button>
//                     </div>

//                     <a href="#" className="forgot-password">Forgot password?</a>
//                     <hr className="divider" />
//                     <input type="submit" className="login-button" />
//                 </form>
//             </div>
//         </div>
//     )
// }

// export default LoginPage
//Mine Working, basically routing based on user_type
// import React, { useContext, useState, useEffect } from 'react';
// import AuthContext from '../context/AuthContext';
// import { useNavigate } from 'react-router-dom';
// import logo from '../public/RIU-Post-01-800x239.png';

// const LoginPage = () => {
//     const { user, loginUser } = useContext(AuthContext); // Get user and loginUser from AuthContext
//     const [errorMessage, setErrorMessage] = useState(null);
//     const navigate = useNavigate();

//     useEffect(() => {
//         // Check if user is already logged in and redirect accordingly
//         if (user) {
//             redirectBasedOnUserType();
//         }
//     }, [user, navigate]);

//     const handleLogin = async (e) => {
//         e.preventDefault();

//         try {
//             await loginUser(e); // Call loginUser to authenticate

//             // After login, check user from AuthContext
//             if (user && user.user_type) {
//                 redirectBasedOnUserType();
//             }
//         } catch (error) {
//             setErrorMessage('An error occurred during login.');
//         }
//     };

//     const redirectBasedOnUserType = () => {
//         // Check user_type and navigate to the appropriate dashboard
//         if (user.user_type === 'admin') {
//             navigate('/admin-dashboard');
//         } else if (user.user_type === 'faculty') {
//             navigate('/faculty-dashboard');
//         } else if (user.user_type === 'student') {
//             navigate('/student-dashboard');
//         } else {
//             navigate('/'); // Fallback to HomePage if user_type is undefined
//         }
//     };

//     const togglePasswordVisibility = () => {
//         const passwordField = document.querySelector('#password');
//         const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
//         passwordField.setAttribute('type', type);
//     };

//     return (
//         <div className="container">
//             <div className="login-box">
//                 <div className="logo">
//                     <img src={logo} alt="Riphah International University" />
//                 </div>
//                 <h1 className="login-title">Login</h1>
//                 <form onSubmit={handleLogin}>
//                     <label htmlFor="username" className="input-label">Email address</label>
//                     <input type="text" id="username" name="username" className="input-field" placeholder="username" required />

//                     <label htmlFor="password" className="input-label">Password</label>
//                     <div className="password-container">
//                         <input type="password" id="password" name="password" className="input-field" placeholder="password" required />
//                         <button type="button" className="toggle-password" onClick={togglePasswordVisibility}>
//                             <span className="eye"></span>
//                         </button>
//                     </div>

//                     {errorMessage && <p className="error-message">{errorMessage}</p>}

//                     <a href="#" className="forgot-password">Forgot password?</a>
//                     <hr className="divider" />
//                     <input type="submit" className="login-button" value="Login" />
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default LoginPage;

//Mine, login based on user Role:
import React, { useContext, useState, useEffect } from 'react';
import AuthContext from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import logo from '../public/RIU-Post-01-800x239.png';

const LoginPage = () => {
    const { user, loginUser } = useContext(AuthContext);
    const [errorMessage, setErrorMessage] = useState(null);
    const navigate = useNavigate();
    const { authTokens } = useContext(AuthContext);


    useEffect(() => {
        // Check if user is already logged in and redirect accordingly
        if (user) {
            redirectBasedOnUserType();
        }
    }, [user, navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();
    
        try {
            await loginUser(e); // Call loginUser to authenticate
            
            // After login, check user from AuthContext
            if (user && user.user_type) {
                redirectBasedOnUserType();
            }
        } catch (error) {
            setErrorMessage('An error occurred during login.');
        }
    };
    const redirectBasedOnUserType = async () => {
        // Check user_type and navigate to the appropriate dashboard
        if (user.user_type === 'admin') {
            navigate('/admin-dashboard');
        } else if (user.user_type === 'student') {
            navigate('/student-dashboard');
        } 
        else if (user.user_type == 'faculty'){
            // alert(user.token)
            // alert("User Type: " + user.user_type);
            const response = await fetch('http://127.0.0.1:8000/api/fyp/check-and-assign-supervisor-role/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authTokens.access}`
      
                },
                body: JSON.stringify({
  
                })
            });
    
            if (!response.ok) {
                throw new Error('Failed to check/assign role');
            }
    
            const roleData = await response.json();
            const role = roleData.role;
    
            if (role === 'Supervisor') {
                navigate('/faculty-dashboard');
            } else if (role === 'FypManager') {
                navigate('/fyp-dashboard');
            } else if (role === 'PanelMember') {
                navigate('/panel-member-dashboard');
            } else if (role == 'Director') {
                navigate('/director-dashboard')
            }
            else {
                navigate('/');
            }
        //         } else {
        //             redirectBasedOnUserType();
        //         }
        //     }
        // }
        
        } else {
            navigate('/'); // Fallback to HomePage if user_type is undefined
        }
    };

    const togglePasswordVisibility = () => {
        const passwordField = document.querySelector('#password');
        const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordField.setAttribute('type', type);
    };

    return (
        <div className="container">
            <div className="login-box">
                <div className="logo">
                    <img src={logo} alt="Riphah International University" />
                </div>
                <h1 className="login-title">Login</h1>
                <form onSubmit={handleLogin}>
                    <label htmlFor="username" className="input-label">Email address</label>
                    <input type="text" id="username" name="username" className="input-field" placeholder="username" required />

                    <label htmlFor="password" className="input-label">Password</label>
                    <div className="password-container">
                        <input type="password" id="password" name="password" className="input-field" placeholder="password" required />
                        <button type="button" className="toggle-password" onClick={togglePasswordVisibility}>
                            <span className="eye"></span>
                        </button>
                    </div>

                    {errorMessage && <p className="error-message">{errorMessage}</p>}

                    <a href="#" className="forgot-password">Forgot password?</a>
                    <hr className="divider" />
                    <input type="submit" className="login-button" value="Login" />
                </form>
            </div>
        </div>
    );
};

export default LoginPage;

