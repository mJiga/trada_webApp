import { CircleAccount } from "@/assets/icons/CircleAccount";
import { AiOutlineExpandAlt } from "react-icons/ai";
import { ImageIcon } from "@/assets/icons/ImageIcon";
import { GiArtificialHive } from "react-icons/gi";
import { useState, useEffect, useRef } from "react";
import Modal from "@/components/Modal";
import { useFirestoreContext } from "@/contexts/FirestoreContext";
import { auth, serverTimestamp } from "@/config/firebase";
import { IoIosSend } from "react-icons/io";
import { useAuthContext } from "@/contexts/AuthContext"
import Expand from "./Expand/Expand";

const PostForm = () => {

  const { addPost, uploadFile, addImageUrlToPost, updateLocalPost } = useFirestoreContext();
  const { userProfile } = useAuthContext();

  const [body, setBody] = useState('');
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [likeCount, setLikeCount] = useState(0);

  const [openExpand, setOpenExpand] = useState(false);

  const textareaRef = useRef(null);


  // thanks chat
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [body]);
  //

  const handleFileSelection = (e) => {
    const selectedFiles = Array.from(e.target.files); 
    setFiles((files) => [...files, ...selectedFiles]);

    selectedFiles.forEach(makePreview);

    if (files){
      setOpenExpand(true);
    }
  };

  const makePreview = (file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
    setPreviews((previews) => [...previews, reader.result]);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!body) {
        console.log('Empty body: Unable to create post')  
        return;
      }

      const timestamp = serverTimestamp();
  
      const post = {
        body: body,
        comments: [],
        createdAt: timestamp,
        imageURL: [],
        isEdited: false,
        likeCount: 0,
        userId: auth?.currentUser?.uid
      };
  
      const postId = await addPost(post);
  
      if (files.length > 0) {
        const uploadPromises = files.map(async (file) => {
          const currImageUrl = await uploadFile(file, postId);
          await addImageUrlToPost(postId, currImageUrl);
          return currImageUrl;
        });

        await Promise.all(uploadPromises);

      }
  
      setBody('');
      setFiles([]);
      setPreviews([]);
      setOpenExpand(false);
    } catch (err) {
      console.error('Error during uploading post', err.message);
      throw err;
    }
  };

  return (
    <div className="mb-4">
      <form onSubmit={handleSubmit} className="flex flex-col space-y-2 bg-zinc-950 rounded-xl w-auto py-2">
        <div className="flex flex-row items-center ml-4 mt-2">
            {userProfile?.pfp ? (
              <img src={userProfile.pfp} alt="Profile" className="h-10 w-10 mr-4 rounded-full object-cover" />
            ) : (
              <CircleAccount className="h-10 w-10 mr-2 fill-gray-400 hover:fill-gray-500 transition-colors ease-in-out duration-300" />
            )}
          <textarea
            placeholder="Create post..."
            onChange={(e) => setBody(e.target.value)}
            value={body}
            className="font-Poppins font-light text-sm p-2 w-full max-w-lg rounded-2xl shadow-md border border-zinc-900 bg-zinc-900 hover:border-zinc-800 focus:outline-none placeholder:text-gray-500 focus:border-zinc-800 transition duration-300 ease-in-out resize-none overflow-hidden"
            style={{minHeight: '40px'}}
            autoFocus
          />
        </div>
        
        <div className="flex flex-row ml-20 space-x-2 items-center">
          <button type='button' className="cursor-pointer" onClick={() => setOpenExpand(!openExpand)}>
            <AiOutlineExpandAlt className="h-6 w-4 fill-gray-400 hover:fill-gray-500 transition-colors ease-in-out duration-300" />
          </button>

          <Modal open={openExpand} setOpen={setOpenExpand}>
            <Expand
              setOpenExpand={setOpenExpand}
              body={body}
              setBody={setBody}
              files={files}
              setFiles={setFiles}
              previews={previews}
              setPreviews={setPreviews}
              handleSubmit={handleSubmit}
              makePreview={makePreview}
              handleFileSelection={handleFileSelection}
              userProfile={userProfile}
            />
          </Modal>

          <label htmlFor="fileInput" className="cursor-pointer">
            <ImageIcon className="h-6 w-4 fill-gray-400 hover:fill-gray-500 transition-colors ease-in-out duration-300" />
          </label>
          <input
              type="file"
              id="fileInput"
              onChange={handleFileSelection}
              className="hidden"
              accept="image/*"
              multiple
            />
          
          <button type='button'>
            <GiArtificialHive className="h-6 w-4 fill-gray-400 hover:fill-gray-500 transition-colors ease-in-out duration-300"/>
          </button>

          <button type="submit" className={`group flex items-center justify-center ml-96 rounded-full px-2 py-1 transition-all duration-300 ease-in-out ${body.trim() ? 'bg-fuchsia-600 group-hover:bg-fuchsia-700' : 'bg-zinc-900 group-hover:text-fuchsia-600 cursor-not-allowed'}`}>
            <IoIosSend className={`mr-1 transition-all duration-300 ease-in-out ${body.trim() ? 'group-hover:text-gray-200' : 'text-white'}`}/>
            <span className={`text-xs ransition-all duration-300 ease-in-out ${body.trim() ? 'hover:text-gray-200' : 'text-white'}`}>
              Post
            </span>
          </button>
        </div>
      </form>
    </div>
  );
}

export default PostForm;
