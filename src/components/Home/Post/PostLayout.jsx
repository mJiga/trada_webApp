import { useState, useEffect, useRef } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { LiaCommentDots } from "react-icons/lia";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import Modal from "@/components/Modal";
import Dropdown from "@/components/Dropdown";
import { PiTrashBold, PiTrashFill  } from "react-icons/pi";
import { MdOutlineEdit } from "react-icons/md";
import { IoIosClose } from "react-icons/io";
import { useFirestoreContext } from "@/contexts/FirestoreContext";
import { useAuthContext } from "@/contexts/AuthContext"
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/config/firebase";
import Edit from "./Expand/Edit";
import { CircleAccount } from "@/assets/icons/CircleAccount";

export const PostLayout = ({ post }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isComment, setIsComment] = useState(false);
  const [isDelete, setIsDelete] = useState(false);

  const [openComments, setOpenComments] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDrop, setOpenDrop] = useState(false);

  const { deletePost } = useFirestoreContext();

  const { userProfile } = useAuthContext();
  const [postUser, setPostUser] = useState(null);
  useEffect(() => {
    const fetchPostUser = async () => {
    const userData = await getPostUser(post.userId);
    setPostUser(userData);
    };
    fetchPostUser();
  }, [post.userId]); 

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

  const getPostUser = async (userId) => {
    try {
      const profileRef = doc(db, 'profiles', userId);
      const profileSnap = await getDoc(profileRef);
      if (profileSnap.exists()) {
        return profileSnap.data();
      } else {
        console.log("There is no profile that exists for the given doc");
        return null;
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
      return null;
    }
  };
  

  const handleLikeClick = () => setIsLiked(!isLiked);

  const handleCommentClick = () => {
    setIsComment(!isComment);
    setOpenComments(true);
  };

  const handleDeleteClick = () => {
    setIsDelete(!isDelete);
    setOpenDelete(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await deletePost(post.id);
      setOpenDelete(false);
    } catch (err) {
      console.error('Error during deleting post', err.message);
    }
  };

  // thanks gpt:)
  const formatTimestamp = (timestamp) => {
    if (!timestamp) return "";
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    });
  };

  return (
    <div className="w-full bg-black p-2">
      <div className="max-w-xl mx-auto bg-zinc-950 rounded-md shadow-md overflow-hidden">
        <div className="p-3 flex items-center">
          <div>
            {userProfile?.pfp ? (
              <img src={userProfile?.pfp} alt="Profile" className="h-10 w-10 rounded-full object-cover" />
            ) : (
              <CircleAccount className="h-10 w-10 fill-gray-400 hover:fill-gray-500 transition-colors ease-in-out duration-300" />
            )}
          </div>
            <div className="flex flex-col ml-3 font-light text-xs text-gray-500">
              <span className="font-medium text-white">{postUser?.name || 'name'}</span>
              <span>{postUser?.username || 'username'}</span>
              <div className="flex">
                <span>{formatTimestamp(post.createdAt)}</span>
                {post.isEdited && (
                <span className="ml-1">&nbsp;· Edited</span>
                )}
              </div>
            </div>
          <div className="ml-auto">
            <button type='button' className="cursor-pointer" onClick={() => setOpenDrop(!openDrop)}>
              <HiOutlineDotsHorizontal className="text-gray-400 hover:text-gray-600 transition-colors duration-300 ease-in-out"/>
            </button>

            <Dropdown openDrop={openDrop} setOpenDrop={setOpenDrop}>
              <div className="flex flex-col justify-start items-center gap-2 mx-3 w-32">
                <button
                  onClick={handleDeleteClick}
                  className="flex items-center gap-1 group focus:outline-none hover:bg-gray-700 hover:bg-opacity-10 rounded-lg p-1 transition-all duration-300 ease-in-out"
                >
                  {isDelete ? (
                    <PiTrashFill className="text-red-600" />
                  ) : (
                    <PiTrashBold className="text-red-500 group-hover:text-red-600 rounded-full transition-all duration-300 ease-in-out" />
                  )}
                  <span className='ml-1 text-red-500 hover:text-red-600 font-medium text-sm transition-all duration-300 ease-in-out'>
                    Delete Post
                  </span>
                </button>

                <button onClick={() => setOpenEdit(!openEdit)} className="flex items-center gap-1 group focus:outline-none hover:bg-gray-700 hover:bg-opacity-10 rounded-lg p-1 transition-all duration-300 ease-in-out">
                  <MdOutlineEdit className="text-gray-400 group-hover:text-gray-500 rounded-full transition-all duration-300 ease-in-out" />
                  <span className='ml-1 text-gray-400 hover:text-gray-500 font-medium text-sm transition-all duration-300 ease-in-out'>
                    Edit Post
                  </span>
                </button>
              </div>
            </Dropdown>

            <Modal open={openDelete} setOpen={setOpenDelete}>
                <div className="w-50">
                  <div className="mb-2 flex text-red-500 font-medium text-lg items-center justify-center">
                    Delete Post?
                  </div>
                  <div className="text-xs text-gray-300 font-light flex justify-center items-center">Are you sure you want to permanently delete this post?</div>
                  <hr className="m-2 border-neutral-900"/>
                  <div className="flex justify-start items-center gap-2 ml-14">
                    <button
                      onClick={() => {setOpenDelete(!openDelete)}}
                      className="flex items-center gap-1 group focus:outline-none hover:bg-gray-700 hover:bg-opacity-10 rounded-lg p-1 transition-all duration-300 ease-in-out"
                    >
                      <IoIosClose className="w-7 h-7 text-gray-400 group-hover:text-gray-500 transition-all duration-300 ease-in-out" />
                      <span className='text-gray-400 hover:text-gray-500 font-medium text-sm transition-all duration-300 ease-in-out'>
                        Cancel
                      </span>
                    </button>
                    
                    <button
                      onClick={handleConfirmDelete}
                      className="flex items-center gap-1 group focus:outline-none hover:bg-gray-700 hover:bg-opacity-10 rounded-lg p-1 transition-all duration-300 ease-in-out"
                    >
                      <PiTrashFill className="text-red-500 group-hover:text-red-600 transition-all duration-300 ease-in-out" />
                      <span className='ml-1 text-red-500 hover:text-red-600 font-medium text-sm transition-all duration-300 ease-in-out'>
                        Delete Post
                      </span>
                    </button>
                  </div>
                </div>
            </Modal>

            <Modal open={openEdit} setOpen={setOpenEdit}>
              <Edit post={post} setOpenEdit={setOpenEdit}/>
            </Modal>
          </div>
        </div>
        
        <div className="px-4">
          <textarea
            ref={textareaRef}
            readOnly
            className="block w-full font-Poppins font-light text-white text-sm bg-zinc-950 focus:outline-none resize-none pr-2"
            value={post.body}
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

        <hr className="my-2 mx-3 border-neutral-900"/>
        
        <div className="flex justify-start items-center gap-4 mx-3 mb-3">
          <button
            className="flex items-center gap-1 group focus:outline-none"
            onClick={handleLikeClick}
          >
            {isLiked ? (
              <AiFillHeart size={20} className="text-fuchsia-600 group-hover:bg-fuchsia-600 rounded-full group-hover:bg-opacity-40 transition-all duration-300 ease-in-out" />
            ) : (
              <AiOutlineHeart size={20} className="text-gray-400 group-hover:text-fuchsia-600 group-hover:bg-fuchsia-600 rounded-full group-hover:bg-opacity-40 transition-all duration-300 ease-in-out" />
            )}
            <span className={`text-xs ${isLiked ? 'text-fuchsia-600' : 'text-gray-400 group-hover:text-fuchsia-600'}`}>
              {post.likeCount}
            </span>
          </button>

          <button
            className="flex items-center gap-1 group focus:outline-none"
            onClick={() => setOpenComments(!openComments)}
          >
            <LiaCommentDots 
              size={20} 
              className={`${isComment ? 'text-fuchsia-600 group-hover:bg-fuchsia-600' : 'text-gray-400 group-hover:text-fuchsia-600 group-hover:bg-fuchsia-600 '} group-hover:bg-opacity-40 rounded-full transition-all duration-300 ease-in-out`}
            />
            <span className={`text-xs ${isComment ? 'text-fuchsia-600' : 'text-gray-400 group-hover:text-fuchsia-600'}`}>
              {post.comments.length}
            </span>
          </button>

          <Modal open={openComments} setOpen={setOpenComments}>
            comments coming soon
          </Modal>
        </div> 
      </div>
    </div>
  );
}

export default PostLayout;