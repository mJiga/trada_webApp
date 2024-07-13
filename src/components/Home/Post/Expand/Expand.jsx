import { useEffect, useState, useRef } from "react"
import { IoIosClose, IoIosSend } from "react-icons/io";
import { GiArtificialHive } from "react-icons/gi";
import { ImageIcon } from "@/assets/icons/ImageIcon";
import { useFirestoreContext } from "@/contexts/FirestoreContext";

const Expand = ({ setOpenExpand, body, setBody, files, setFiles, previews, setPreviews, handleSubmit, makePreview, handleFileSelection }) => {
    
    const contentEditableRef = useRef(null);

    useEffect(() => {
        if (contentEditableRef.current) {
            contentEditableRef.current.textContent = body;
        }
    }, [body]);

    const onSubmit = (e) => {
        e.preventDefault();
        console.log('aaaaa')
        handleSubmit(e);
    };

    return (
    <div className="w-full bg-zinc-950 p-4 min-w-[70vh] max-h-[80vh] overflow-y-auto">
        <div className="max-w-2xl mx-auto bg-zinc-950 rounded-lg shadow-md overflow-hidden">
            <div className="p-4 flex items-center">
                <div className="bg-white rounded-full shadow-md w-12 h-12"></div>
                <div className="flex flex-col ml-4 font-light text-lg text-gray-500">
                    <span className="font-medium text-white">{'name'}</span>
                    <span>{'username'}</span>
                </div>
                <div className="ml-auto">
                    <button type='button' className="cursor-pointer" onClick={() => setOpenExpand(false)}>
                        <IoIosClose className="w-8 h-8 text-gray-400 hover:text-gray-600 transition-colors duration-300 ease-in-out"/>
                    </button>
                </div>
            </div>
            <div className="flex flex-col space-y-2 bg-zinc-950 rounded-xl w-auto py-2">

                <div className="px-4 py-2">

                    <textarea
                        className="block w-full font-Poppins font-light text-white text-base bg-zinc-950 focus:outline-none min-h-[100px] max-h-[300px] overflow-y-auto"
                        onInput={(e) => setBody(e.currentTarget.textContent)}
                        contentEditable={true}
                        ref={contentEditableRef}
                        suppressContentEditableWarning={true}
                        autoFocus
                    />
                </div>
                <div className={`m-4 ${previews.length > 1 ? 'grid grid-cols-2 gap-2' : ''}`}>
                    {previews && previews.map((preview, index) => (
                        <img key={index} src={preview} className="w-full h-auto rounded" alt={`Preview ${index + 1}`}/>
                    ))}
                </div>
                
                <hr className="my-3 mx-4 border-neutral-900"/>
            
                <div className="flex flex-row m-4 space-x-3 items-center">
                    <label htmlFor="fileInput" className="cursor-pointer">
                        <ImageIcon className="mb-2 h-7 w-7 fill-gray-400 hover:fill-gray-500 transition-colors ease-in-out duration-300" />
                    </label>
                    <input
                        type="file"
                        id="fileInput"
                        onChange={handleFileSelection}
                        className="hidden"
                        accept="image/*"
                        multiple
                    />
                    <button type='button' className="mb-2">
                        <GiArtificialHive className="h-7 w-7 fill-gray-400 hover:fill-gray-500 transition-colors ease-in-out duration-300"/>
                    </button>

                    <div className="flex-grow"></div>

                    <button 
                        type="submit"
                        onClick={onSubmit} 
                        className={`mb-2 group flex items-center justify-center rounded-full px-3 py-2 transition-all duration-300 ease-in-out ${body.trim() ? 'bg-fuchsia-600 hover:bg-fuchsia-700' : 'bg-zinc-900 text-gray-400 cursor-not-allowed'}`}
                        disabled={!body.trim()}
                    >
                        <IoIosSend className={`mr-1 transition-all duration-300 ease-in-out ${body.trim() ? 'group-hover:text-gray-200' : 'text-white'}`}/>
                        <span className={`text-xs ransition-all duration-300 ease-in-out ${body.trim() ? 'hover:text-gray-200' : 'text-white'}`}>
                            Post
                        </span>
                    </button>
                </div>
            </div>
        </div>
    </div>
    )
}

export default Expand