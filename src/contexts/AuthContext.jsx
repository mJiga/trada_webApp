import { createContext, useContext, useEffect, useState } from "react"
import { db, storage, auth, googleProvider } from "../config/firebase";
import { onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { setDoc, doc, getDoc } from "firebase/firestore";

const AuthContext = createContext(undefined);

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("AuthContext must be used with a useAuthContext");
    }
    return context;     
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [userProfile, setUserProfile] = useState(null);

    const signUp = async (email, password, name, username) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            console.log('User created: ', user);

            const initialProfile = {
                name: name,
                username: username,
                email: email,
                pfp: '',
                banner: '',
            };
            const profileRef = doc(db, 'profiles', user.uid);
            setDoc(profileRef, initialProfile);
            console.log('Profile created for: ', user);
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
            const user = userCredential.user;
            console.log('User signed in with Google:', user);

            const profileRef = doc(db, 'profiles', user.uid);
            const profileSnap = await getDoc(profileRef);

            if (!profileSnap.exists()) {
                const initialProfile = {
                    name: user.displayName || user.email.split('@')[0],
                    username: user.email.split('@')[0],
                    email: user.email,
                    pfp: user.photoURL || '',
                    banner: '',
                };
                setDoc(profileRef, initialProfile);
                console.log('Profile created for: ', user.email);
            } else {
                console.log('Profile already exists for:', user.email, ', Signing in...');
            }
        } catch (err) {
            console.error('Error during google sign in:', err.message);
            throw err;
        }
    }

    const userSignOut = async () => {
        try {
            if (auth.currentUser) {
                console.log('Signing out for ' + auth.currentUser.email);
            } else {
                console.log('No user is currently signed in');
            }
            await signOut(auth);
        } catch (err) {
            console.error('Error during sign out:', err.message);
            throw err;
        }
    }

    const fetchUserProfile = async (uid) => {
        try {
            const profileRef = doc(db, 'profiles', uid);
            const profileSnap = await getDoc(profileRef);
            if (profileSnap.exists()) {
              setUserProfile(profileSnap.data());
            } else {
              console.log('No profile found for this user');
            }
        } catch (error) {
            console.error('Error fetching user profile:', error);
        }
    }
    
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            setCurrentUser(user);
            if (user) {
                fetchUserProfile(user.uid);
              } else {
                setUserProfile(null);
              }
            setLoading(false);
        });
    
        return unsubscribe;
    }, [])

    const value = {
        currentUser,
        userProfile,
        signUp,
        signIn,
        googleSignIn,
        userSignOut
    }
    
    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
