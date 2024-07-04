import { createContext, useContext, useEffect, useState } from "react"
import { auth, googleProvider } from "../config/firebase";
import { onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";

const AuthContext = createContext(undefined);

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuthContext must be used with a useAuthContext");
    }
    return context;     
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const signUp = async (email, password) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            console.log('User created: ', userCredential.user);
        } catch (err) {
            console.error('Error during sign up:', err.message);
            throw err;
        }
    }

    const signIn = async (email, password) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            console.log('User signed in: ', userCredential.user);
        } catch (err) {
            console.error('Error during sign in:', err.message);
            throw err;
        }
    }

    const googleSignIn = async () => {
        try {
            const userCredential = await signInWithPopup(auth, googleProvider);
            console.log('User signed in with Google:', userCredential.user);
        } catch (err) {
            console.error('Error during google sign in:', err.message);
            throw err;
        }
    }
    
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            setCurrentUser(user);
            setLoading(false);
        });
    
        return unsubscribe;
    }, [])

    const value = {
        currentUser,
        signUp,
        signIn,
        googleSignIn,
    }
    
    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
