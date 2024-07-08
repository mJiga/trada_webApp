import { useFirestoreContext } from "@/contexts/FirestoreContext"
import PostLayout from "./PostLayout";

export const PostList = () => {
  
  const { postList } = useFirestoreContext();

  if (postList.length === 0) {
    return <span>No posts yet</span>
  }

  return (
    <div>
      {postList.map((post) => (
        <PostLayout post={post}/>
      ))}
    </div>
  )
}

export default PostList
