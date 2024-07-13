import PostForm from "@/components/Home/Post/PostForm"
import PostList from "@/components/Home/Post/PostList"

function HomePage() {
  return (
    <div className="w-full max-w-2xl mx-auto h-full overflow-y-auto">
      <div className='py-6 px-4'>
        <PostForm />
        <hr className="my-2 mx-3 border-neutral-900 mt-4"/>
        <PostList />
      </div>
    </div>
  )
}

export default HomePage
