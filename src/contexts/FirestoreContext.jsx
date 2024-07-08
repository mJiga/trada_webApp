import { createContext, useContext, useEffect, useState } from "react";
import { db, auth } from '../config/firebase';
import { getDocs, collection, doc } from 'firebase/firestore';
import { ref, uploadBytes } from 'firebase/storage';

const FirestoreContext = createContext(undefined);

export const useFirestoreContext = () => {
    const context = useContext(FirestoreContext);
    if (context === undefined) {
        throw new Error("FirestoreContext must be used with a useFirestoreContext");
    }
    return context;     
}

export const FirestoreProvider = ({ children }) => {
    const postCollectionRef = collection(db, "post");
    const [postList, setPostList] = useState([]);

    useEffect(() => {
        fetchPosts();
    },[]);
    
    const fetchPosts = async () => {
        try {
            const posts = await getPosts();
            setPostList(posts);
        } catch (err) {
            console.error('Error during fetching posts', err.message);
            throw err;
        }
    }

    const getPosts = async () => {
        try {
            const data = await getDocs(postCollectionRef);
            const filteredData = data.docs.map((doc) => (
                {
                    ...doc.data(),
                    id: doc.id
                }));
            return filteredData;
        } catch (err) {
            console.error('Error during retrieving posts', err.message);
            throw err;
        }
    };

    const value = {
        postList,
        
    }
    
    return (
        <FirestoreContext.Provider value={value}>
            {children}
        </FirestoreContext.Provider>
    )
}

