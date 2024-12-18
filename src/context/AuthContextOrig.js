// Auth Context Original
import { createContext, useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext('AuthContext');

export default AuthContext;


export const AuthProvider = ({ children }) => {
    const [authTokens, setAuthTokens] = useState(() => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null);
    const [user, setUser] = useState(() => localStorage.getItem('authTokens') ? jwtDecode(localStorage.getItem('authTokens')) : null);
    const [roles, setRoles] = useState([]);
    const [currentRole, setCurrentRole] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const loginUser = async (e) => {
        e.preventDefault();
        const response = await fetch('http://127.0.0.1:8000/api/auth/token/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: e.target.username.value,
                password: e.target.password.value,
            }),
        });
        const data = await response.json();

        if (response.status === 200) {
            setAuthTokens(data);
            setUser(jwtDecode(data.access));
            const decodedUser = jwtDecode(data.access);
            localStorage.setItem('authTokens', JSON.stringify(data));
            console.log('Decoded User: ', decodedUser.usertype)
            console.log('data from token: ', data.usertype)
        
            
            // Fetch roles after login
            const roleResponse = await fetch('http://127.0.0.1:8000/api/fyp/check-and-assign-supervisor-role/', {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${data.access}` }
            });
            if (roleResponse.status === 200) {
                const roleData = await roleResponse.json();
                setRoles(roleData.roles);
                console.log("fetched roles data in AuthContext: ", roleData.roles);
    
                if (roleData.roles.length > 1) {
                    navigate('/role-selection'); // Navigate to role selection if multiple roles
                } else {
                    setCurrentRole(roleData.roles[0]); // If only one role, set it
                    // navigate('/dashboard'); // Adjust this based on your role-specific routes
                }
            } else {
                // Handle other status codes or errors
                console.log('Not a faculty member');
                
            }
        } 
    };

    const logoutUser = () => {
        setAuthTokens(null);
        setUser(null);
        setRoles([]);
        setCurrentRole(null);
        localStorage.removeItem('authTokens');
        navigate('/login');
    };

    const updateToken = async () => {
        const response = await fetch('http://127.0.0.1:8000/api/auth/token/refresh/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                refresh: authTokens?.refresh,
            }),
        });

        const data = await response.json();

        if (response.status === 200) {
            setAuthTokens(data);
            setUser(jwtDecode(data.access));
            localStorage.setItem('authTokens', JSON.stringify(data));
        } else {
            logoutUser();
        }

        if (loading) {
            setLoading(false);
        }
    };

    const contextData = {
        user,
        authTokens,
        roles,
        currentRole,
        setCurrentRole, // Allow role switching
        loginUser,
        logoutUser,
    };

    useEffect(() => {
        if (loading) {
            updateToken();
        }

        const fourMinutes = 1000 * 60 * 4;

        const interval = setInterval(() => {
            if (authTokens) {
                updateToken();
            }
        }, fourMinutes);

        return () => clearInterval(interval);
    }, [authTokens, loading]);

    return (
        <AuthContext.Provider value={contextData}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

// import { createContext, useState, useEffect } from 'react';
// import { jwtDecode } from 'jwt-decode';
// import { useNavigate } from 'react-router-dom';

// const AuthContext = createContext('AuthContext');

// export default AuthContext;

// export const AuthProvider = ({ children }) => {
//     const [authTokens, setAuthTokens] = useState(() => {
//         const storedTokens = localStorage.getItem('authTokens');
//         return storedTokens ? JSON.parse(storedTokens) : null;
//     });
//     const [user, setUser] = useState(() => {
//         const storedTokens = localStorage.getItem('authTokens');
//         return storedTokens ? jwtDecode(storedTokens) : null;
//     });
//     const [loading, setLoading] = useState(true);
//     const navigate = useNavigate();

//     const loginUser = async (e) => {
//         e.preventDefault();

//         const response = await fetch('http://127.0.0.1:8000/api/auth/token/', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//                 username: e.target.username.value,
//                 password: e.target.password.value,
//             }),
//         });

//         const data = await response.json();

//         if (response.status === 200) {
//             setAuthTokens(data);
//             const decodedUser = jwtDecode(data.access);
//             setUser(decodedUser); // Set the user data including role
//             localStorage.setItem('authTokens', JSON.stringify(data));
//             // navigate('/'); // Uncomment if needed
//         } else {
//             alert('Something went wrong!');
//         }
//     };

//     const logoutUser = () => {
//         setAuthTokens(null);
//         setUser(null);
//         localStorage.removeItem('authTokens');
//         navigate('/login');
//     };

//     const updateToken = async () => {
//         const response = await fetch('http://127.0.0.1:8000/api/auth/token/refresh/', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//                 refresh: authTokens?.refresh,
//             }),
//         });

//         const data = await response.json();

//         if (response.status === 200) {
//             setAuthTokens(data);
//             setUser(jwtDecode(data.access)); // Update user role if token is refreshed
//             localStorage.setItem('authTokens', JSON.stringify(data));
//         } else {
//             logoutUser();
//         }

//         if (loading) {
//             setLoading(false);
//         }
//     };

//     const contextData = {
//         user,
//         authTokens,
//         loginUser,
//         logoutUser,
//         role: user ? user.role : null, // Add role to context data
//     };

//     useEffect(() => {
//         if (loading) {
//             updateToken();
//         }

//         const fourMinutes = 1000 * 60 * 4;

//         const interval = setInterval(() => {
//             if (authTokens) {
//                 updateToken();
//             }
//         }, fourMinutes);

//         return () => clearInterval(interval);
//     }, [authTokens, loading]);

//     return (
//         <AuthContext.Provider value={contextData}>
//             {!loading && children}
//         </AuthContext.Provider>
//     );
// };

//How to use
//const { role } = useContext(AuthContext);
