// import { createContext, useContext } from "react";
// import { useNavigate } from 'react-router-dom';

// const NavigationContext = createContext(undefined);

// export const NavigationContextProvider = ({ children }) => {
//     const navigate = useNavigate();

//     const doNav = (path) => {
//         navigate(path);
//     };

//     const value = { doNav };

//     return (
//         <NavigationContext.Provider value={value}>
//             {children}
//         </NavigationContext.Provider>
//     );
// };

// export const useNavigationContext = () => {
//     const context = useContext(NavigationContext);
//     if (context === undefined) {
//         throw new Error(
//             "useNavigationContext must be used with a NavigationContextProvider"
//         );
//     }
//     return context;
// };
