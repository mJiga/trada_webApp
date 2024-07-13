import { createContext, useContext, useEffect, useState } from "react";
import { db, auth, storage } from '../config/firebase';
import { getDocs, getDoc, collection, doc, addDoc, updateDoc, deleteDoc, arrayUnion } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes, deleteObject } from 'firebase/storage';

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

    const addPost = async (post) => {
        try {
            const docRef = await addDoc(postCollectionRef, post);
            console.log('Document written with ID: ', docRef.id);
            await fetchPosts();
            return docRef.id;
        } catch (err) {
            console.error('Error during adding post', err.message);
            throw err;
        }
      };

    const editPost = async (postId, newBody = false, newImage = false) => {
        try {
            const postDoc = await doc(db, 'post', postId)
            const updateData = {};

            if (newBody) {
                updateData.body = newBody;
            }
    
            if (newImage) {
                updateData.imageURL = arrayUnion(newImage);
            }

            updateData.isEdited = true;

            await updateDoc(postDoc, updateData);
            // thanks chat:)
            updateLocalPost(postId, updateData);
            //
            console.log('Edited document with ID: ', postDoc.id);
            
        } catch (err) {
            console.error('Error during updating post', err.message);
            throw err;
        }
    };

    const deletePost = async (postId) => {
        try {
            const postDoc = await doc(db, 'post', postId)
            const postDocSnapshot = await getDoc(postDoc)
            
            const imageURLs = postDocSnapshot.data().imageURL || [];

            if (Array.isArray(imageURLs)) {
                const deletePromises = imageURLs.map(async (imageURL) => {
                    const storageRef = ref(storage, imageURL);
                    await deleteObject(storageRef);
                });

                await deleteDoc(postDoc);
                setPostList(prevPosts => prevPosts.filter(post => post.id !== postId));
            
                await Promise.all(deletePromises);
            }
        } catch (err) {
            console.error('Error during deleting post', err.message);
            throw err;
        }
    };

    const uploadFile = async (file, postId) => {
        try {
            const filePath = `posts/${postId}/${file.name}`;
            const storageRef = ref(storage, filePath);
            await uploadBytes(storageRef, file);
            const downloadURL = await getDownloadURL(storageRef);
            return downloadURL;
        } catch (err) {
            console.error('Error during uploading image', err.message);
            throw err;
        }
    };

    const addImageUrlToPost = async (postId, imageUrl) => {
        try {
            const postDoc = doc(db, 'post', postId);
            
            await updateDoc(postDoc, {
                imageURL: arrayUnion(imageUrl)
            });
            
            setPostList(prevPosts => 
                prevPosts.map(post => 
                    post.id === postId 
                        ? { ...post, imageURL: [...(post.imageURL || []), imageUrl] }
                        : post
                )
            );
        } catch (err) {
            console.error('Error during adding image URL to post', err.message);
            throw err;
        }
    };

    // thanks chat:)
    const updateLocalPost = (postId, updateData) => {
        setPostList(prevPosts => 
            prevPosts.map(post => 
                post.id === postId 
                    ? { ...post, ...updateData }
                    : post
            )
        );
    };
    //

    const value = {
        postList,
        addPost,
        editPost,
        deletePost,
        uploadFile,
        addImageUrlToPost,
        updateLocalPost
    }
    
    return (
        <FirestoreContext.Provider value={value}>
            {children}
        </FirestoreContext.Provider>
    )
}

