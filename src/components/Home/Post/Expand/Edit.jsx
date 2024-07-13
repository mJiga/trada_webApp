import { useState, useEffect, useRef } from "react";
import { IoIosClose, IoIosSend } from "react-icons/io";
import { GiArtificialHive } from "react-icons/gi";
import { ImageIcon } from "@/assets/icons/ImageIcon";
import { useFirestoreContext } from "@/contexts/FirestoreContext";

const Edit = ({ post, setOpenEdit }) => {
    const { editPost } = useFirestoreContext();

    const [newBody, setNewBody] = useState(post.body);
    const [files, setFiles] = useState(post.imageURL);
    const [previews, setPreviews] = useState([]);

    // thanks chat
    const textareaRef = useRef(null);
    useEffect(() => {
        if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
        const newHeight = Math.min(textareaRef.current.scrollHeight, 400);
        textareaRef.current.style.height = `${newHeight}px`;
        }
    }, [post.body]);
    //

    const handleSaveChanges = () => {
        console.log("Saving changes")
        // Change for alert with styling
    }

    const handleEdit = async (e) => {
        e.preventDefault();
        try {
        await editPost(post.id, newBody);

        setNewBody('');
        setOpenEdit(false);
        } catch (err) {
            console.error('Error during uploading post', err.message);
            throw err;
        }
    }
    
    return (
    <div className="w-full bg-zinc-950 p-4 min-w-[70vh] max-h-[80vh] overflow-y-auto">
        <div className="max-w-2xl mx-auto bg-zinc-950 rounded-lg shadow-md overflow-hidden">
            <div className="p-4 flex items-center">
                <div className="bg-white rounded-full shadow-md w-12 h-12"></div>
                <div className="flex flex-col ml-4 font-light text-lg text-gray-500">
                    <span className="font-medium text-white">{post.name || 'name'}</span>
                    <span>{post.username || 'username'}</span>
                </div>
                <div className="ml-auto">
                    <button type='button' className="cursor-pointer" onClick={() => setOpenEdit(false)}>
                        <IoIosClose className="w-8 h-8 text-gray-400 hover:text-gray-600 transition-colors duration-300 ease-in-out"/>
                    </button>
                </div>
            </div>
            <div className="px-4 py-2">
                <textarea
                    ref={textareaRef}
                    className="block w-full font-Poppins font-light text-white text-base bg-zinc-950 focus:outline-none resize-none"
                    value={newBody}
                    onChange={(e) => setNewBody(e.target.value)}
                    onBlur={handleSaveChanges}
                    autoFocus
                />
            </div>

            <div className={`m-4 ${Array.isArray(post.imageURL) && post.imageURL.length > 1 ? 'grid grid-cols-2 gap-2' : ''}`}>
                {Array.isArray(post.imageURL) && post.imageURL.length > 1 ? (
                    post.imageURL.map((image, index) => (
                    <img key={index} src={image} className="w--64 h-64 rounded-lg object-cover" alt={`Preview ${index + 1}`}/>
                    ))
                ) : (
                    post.imageURL.length !== 0 && <img src={post.imageURL[0]} className="w-full h-auto rounded-lg" alt={`Preview 1`}/>
                )}
            </div>
            
            <hr className="my-3 mx-4 border-neutral-900"/>
        
            <div className="flex flex-row m-4 space-x-3 items-center">
                <div className="flex-grow"></div>
                <button 
                    type="submit"
                    onClick={handleEdit} 
                    className={`mb-2 group flex items-center justify-center rounded-full px-3 py-2 transition-all duration-300 ease-in-out ${newBody !== post.body ? 'bg-fuchsia-600 hover:bg-fuchsia-700' : 'bg-zinc-900 text-gray-400 cursor-not-allowed'}`}
                    disabled={newBody === post.body}
                >
                    <IoIosSend className={`mr-1 transition-all duration-300 ease-in-out ${post.body.trim() !== newBody.trim() ? 'group-hover:text-gray-200' : 'text-white'}`}/>
                    <span className={`text-xs ransition-all duration-300 ease-in-out ${post.body.trim() !== newBody.trim() ? 'hover:text-gray-200' : 'text-white'}`}>
                        Update Post
                    </span>
                </button>
            </div>
        </div>
    </div>
    )
}

export default Edit