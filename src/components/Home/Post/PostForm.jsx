import { CircleAccount } from "@/assets/icons/CircleAccount";
import { ExpandIcon } from "@/assets/icons/ExpandIcon copy";
import { ImageIcon } from "@/assets/icons/ImageIcon";
import { SimulatorIcon } from "@/assets/icons/SimulatorIcon";
import { useState } from "react";

const PostForm = () => {
  
  const [body, setBody] = useState('');
  const [file, setFile] = useState(null);

  const handleFileSelection = () => {
    document.getElementById('fileInput').click();
  }
  
  return (
    <div>
      <form className="flex flex-col space-y-2">
        <div className="flex flex-row items-center">
          <CircleAccount className='h-20 w-20 mr-4'/>
          <input
            placeholder="Create post..."
            type="text"
            onChange={(e) => setBody(e.target.value)}
            value={body}
            className='font-Poppins font-light text-lg p-4 w-96 rounded-xl shadow-xl border-2 border-zinc-950 bg-zinc-800 hover:border-zinc-800 focus:outline-none focus:border-fuchsia-800 focus:bg-zinc-900 transition duration-300 ease-in-out'
            autoFocus
          />
        </div>
        
        <div className="flex flex-row" onClick={handleFileSelection}>
          <span className="cursor-pointer">
            <ExpandIcon className='h-8 w-8 ml-28'/>
          </span>
          <input
            type="file"
            id="fileInput"
            value = {file}
            onChange={(e) => setFile(e.target.files[0])}
            style={{ display: 'none' }}
          />
          <span className="cursor-pointer">
            <ImageIcon className='h-8 w-8 ml-4'/>
          </span>
          <input
            // type="file"
            // value = {file}
            // ADD AI IMPLEMENTATION
            // onChange={(e) => setFile(e.target.files[0])}
            style={{ display: 'none' }}
          />
          <span>
            <SimulatorIcon className='h-8 w-8 ml-4'/>
          </span>
        </div>
      </form>
    </div>
  )
}

export default PostForm
