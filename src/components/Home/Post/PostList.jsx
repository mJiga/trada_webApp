import { useFirestoreContext } from "@/contexts/FirestoreContext"
import { useAuthContext } from "@/contexts/AuthContext";
import PostLayout from "./PostLayout";
import { ImSleepy } from "react-icons/im";

export const PostList = () => {
  
  const { postList } = useFirestoreContext();
  const { currentUser } = useAuthContext();

  if (postList.length === 0) {
    return (
      <span className="fixed flex justify-center items-center text-gray-400 opacity-50 text-xl font-light">
        <ImSleepy className="m-2"/>
        No posts yet
      </span>
    
    );
  }

  return (
    <div>
      {postList.map((post) => (
        <PostLayout key={`${post.id}-${currentUser.uid}`} post={post} />
      ))}
    </div>
  )
}

export default PostList
