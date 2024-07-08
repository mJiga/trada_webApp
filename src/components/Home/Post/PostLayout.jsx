import React, { useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { LiaCommentDots } from "react-icons/lia";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import Modal from "@/components/Modal";

export const PostLayout = ({ post }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isComment, setIsComment] = useState(false);
  const [open, setOpen] = useState(false);

  const handleLikeClick = () => setIsLiked(!isLiked);

  const handleCommentClick = () => {
    setIsComment(!isComment);
    setOpen(true);
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
          <div className="bg-white rounded-full shadow-md w-8 h-8"></div>
          <div className="flex flex-col ml-3 font-light text-xs text-gray-500">
            <span className="font-medium text-white">{post.name || 'name'}</span>
            <span>{post.username || 'username'}</span>
            <div className="flex">
              <span>{formatTimestamp(post.createdAt)}</span>
              {post.isEdited && (
                <span className="ml-1">&nbsp;· Edited</span>
              )}
            </div>
          </div>
          <div className="ml-auto">
            <button>
              <HiOutlineDotsHorizontal className="text-gray-400" />
            </button>
          </div>
        </div>

        <div className="px-3 text-sm text-gray-300">
          {post.body}
        </div>
 
        <div className="m-3">
          {post.imageURL && (
            <img src={post.imageURL} className="w-full h-auto rounded" alt="Post Image" />
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
            onClick={() => setOpen(true)}
          >
            <LiaCommentDots 
              size={20} 
              className={`${isComment ? 'text-fuchsia-600 group-hover:bg-fuchsia-600' : 'text-gray-400 group-hover:text-fuchsia-600 group-hover:bg-fuchsia-600 '} group-hover:bg-opacity-40 rounded-full transition-all duration-300 ease-in-out`}
            />
            <span className={`text-xs ${isComment ? 'text-fuchsia-600' : 'text-gray-400 group-hover:text-fuchsia-600'}`}>
              {post.comments.length}
            </span>
          </button>

          <Modal open={open} onClose={() => setOpen(false)}>
           
          </Modal>

        </div> 
      </div>
    </div>
  );
}

export default PostLayout;