// // context/AuthContext.jsx
// import React, { createContext, useEffect, useState, useContext } from 'react';
// import { auth } from '../service/Firebase';
// import { onAuthStateChanged } from 'firebase/auth';

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const unsub = onAuthStateChanged(auth, (currentUser) => {
//       setUser(currentUser);
//       if (currentUser) {
//         localStorage.setItem("user", JSON.stringify(currentUser));
//       } else {
//         localStorage.removeItem("user");
//       }
//     });

//     return () => unsub();
//   }, []);

//   return (
//     <AuthContext.Provider value={{ user }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);
