// import { createContext, useState, useEffect } from 'react';
// import {jwtDecode} from 'jwt-decode'; // Corrected import for jwt-decode
// import { useNavigate } from 'react-router-dom';

// const AuthContext = createContext('AuthContext');

// export default AuthContext;

// export const AuthProvider = ({ children }) => {
//     const [authTokens, setAuthTokens] = useState(() => 
//         localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null
//     );
//     const [user, setUser] = useState(() => 
//         localStorage.getItem('authTokens') ? jwtDecode(localStorage.getItem('authTokens')) : null
//     );
//     const [roles, setRoles] = useState(() => 
//         localStorage.getItem('roles') ? JSON.parse(localStorage.getItem('roles')) : []
//     );
//     const [currentRole, setCurrentRole] = useState(() => 
//         localStorage.getItem('currentRole') || null
//     );
//     const [loading, setLoading] = useState(true);
//     const navigate = useNavigate();

//     const loginUser = async (e) => {
//         e.preventDefault();
//         const response = await fetch('http://127.0.0.1:8000/api/auth/token/', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({
//                 username: e.target.username.value,
//                 password: e.target.password.value,
//             }),
//         });
//         const data = await response.json();

//         if (response.status === 200) {
//             console.log("User successfully logged in")
//             setAuthTokens(data);
//             setUser(jwtDecode(data.access));
//             localStorage.setItem('authTokens', JSON.stringify(data));

//             // Fetch roles after login
//             const roleResponse = await fetch('http://127.0.0.1:8000/api/fyp/check-and-assign-supervisor-role/', {
//                 method: 'POST',
//                 headers: { 'Authorization': `Bearer ${data.access}` },
//             });
//             if (roleResponse.status === 200) {
//                 console.log("Auth token set: ", data.access)
//                 const roleData = await roleResponse.json();
//                 setRoles(roleData.roles);
//                 localStorage.setItem('roles', JSON.stringify(roleData.roles)); // Persist roles
//                 console.log("Fetched roles data in AuthContext: ", roleData.roles);

//                 if (roleData.roles.length > 1) {
//                     navigate('/role-selection'); // Navigate to role selection if multiple roles
//                 } else {
//                     setCurrentRole(roleData.roles[0]); // If only one role, set it
//                     localStorage.setItem('currentRole', roleData.roles[0]); // Persist current role
//                 }
//             } else {
//                 console.log('Not a faculty member');
//             }
//         }
//     };

//     const logoutUser = () => {
//         setAuthTokens(null);
//         setUser(null);
//         setRoles([]);
//         setCurrentRole(null);
//         localStorage.removeItem('authTokens');
//         localStorage.removeItem('roles');
//         localStorage.removeItem('currentRole');
//         navigate('/login');
//     };

//     const updateToken = async () => {
//         const response = await fetch('http://127.0.0.1:8000/api/auth/token/refresh/', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({ refresh: authTokens?.refresh }),
//         });
//         const data = await response.json();

//         if (response.status === 200) {
//             setAuthTokens(data);
//             setUser(jwtDecode(data.access));
//             localStorage.setItem('authTokens', JSON.stringify(data));
//         } else {
//             logoutUser();
//         }

//         if (loading) setLoading(false);
//     };

//     const handleRoleSwitch = (role) => {
//         setCurrentRole(role);
//         localStorage.setItem('currentRole', role); // Persist currentRole
//     };

//     const contextData = {
//         user,
//         authTokens,
//         roles,
//         currentRole,
//         setCurrentRole: handleRoleSwitch, // Use handleRoleSwitch to ensure persistence
//         loginUser,
//         logoutUser,
//     };

//     useEffect(() => {
//         if (loading) updateToken();

//         const fourMinutes = 1000 * 60 * 4;
//         const interval = setInterval(() => {
//             if (authTokens) updateToken();
//         }, fourMinutes);

//         return () => clearInterval(interval);
//     }, [authTokens, loading]);

//     return (
//         <AuthContext.Provider value={contextData}>
//             {!loading && children}
//         </AuthContext.Provider>
//     );
// };

import { createContext, useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode'; // Corrected import for jwt-decode
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext('AuthContext');

export default AuthContext;

export const AuthProvider = ({ children }) => {
    const [authTokens, setAuthTokens] = useState(() => {
        const storedTokens = localStorage.getItem('authTokens');
        try {
            return storedTokens ? JSON.parse(storedTokens) : null;
        } catch (error) {
            console.error("Error parsing authTokens from localStorage:", error);
            return null;
        }
    });

    const [user, setUser] = useState(() => {
        const storedTokens = localStorage.getItem('authTokens');
        try {
            return storedTokens ? jwtDecode(storedTokens) : null;
        } catch (error) {
            console.error("Error decoding user from authTokens:", error);
            return null;
        }
    });

    const [roles, setRoles] = useState(() => {
        const storedRoles = localStorage.getItem('roles');
        try {
            return storedRoles ? JSON.parse(storedRoles) : [];
        } catch (error) {
            console.error("Error parsing roles from localStorage:", error);
            return [];
        }
    });

    const [currentRole, setCurrentRole] = useState(() => {
        return localStorage.getItem('currentRole') || null;
    });

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
            console.log("User successfully logged in")
            setAuthTokens(data);
            setUser(jwtDecode(data.access));
            localStorage.setItem('authTokens', JSON.stringify(data));

            // Fetch roles after login
            const roleResponse = await fetch('http://127.0.0.1:8000/api/fyp/check-and-assign-supervisor-role/', {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${data.access}` },
            });
            if (roleResponse.status === 200) {
                console.log("Auth token set: ", data.access)
                const roleData = await roleResponse.json();
                setRoles(roleData.roles);
                localStorage.setItem('roles', JSON.stringify(roleData.roles)); // Persist roles
                console.log("Fetched roles data in AuthContext: ", roleData.roles);

                if (roleData.roles.length > 1) {
                    navigate('/role-selection'); // Navigate to role selection if multiple roles
                } else {
                    setCurrentRole(roleData.roles[0]); // If only one role, set it
                    localStorage.setItem('currentRole', roleData.roles[0]); // Persist current role
                }
            } else {
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
        localStorage.removeItem('roles');
        localStorage.removeItem('currentRole');
        navigate('/login');
    };

    const updateToken = async () => {
        const response = await fetch('http://127.0.0.1:8000/api/auth/token/refresh/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ refresh: authTokens?.refresh }),
        });
        const data = await response.json();

        if (response.status === 200) {
            setAuthTokens(data);
            setUser(jwtDecode(data.access));
            localStorage.setItem('authTokens', JSON.stringify(data));
        } else {
            logoutUser();
        }

        if (loading) setLoading(false);
    };

    const handleRoleSwitch = (role) => {
        setCurrentRole(role);
        localStorage.setItem('currentRole', role); // Persist currentRole
    };

    const contextData = {
        user,
        authTokens,
        roles,
        currentRole,
        setCurrentRole: handleRoleSwitch, // Use handleRoleSwitch to ensure persistence
        loginUser,
        logoutUser,
    };

    useEffect(() => {
        if (loading) updateToken();

        const fourMinutes = 1000 * 60 * 4;
        const interval = setInterval(() => {
            if (authTokens) updateToken();
        }, fourMinutes);

        return () => clearInterval(interval);
    }, [authTokens, loading]);

    return (
        <AuthContext.Provider value={contextData}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

   