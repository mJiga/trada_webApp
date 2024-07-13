import { useEffect, useRef } from "react";

export const Dropdown = ({setOpenDrop, openDrop, children}) => {
    
    // thanks for this chat:)
    const dropdownRef = useRef(null);

    useEffect(() => {
      const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
          setOpenDrop(false);
        }
      };
  
      document.addEventListener("mousedown", handleClickOutside);
  
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [setOpenDrop]);
    // until here

    return (
        <div ref={dropdownRef} onClick={() => setOpenDrop(!openDrop)} className={`
            absolute flex justify-center items-center
            transition-colors
            ${openDrop ? 'visible bg-black/20' : 'invisible'}
            `}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className={`
                absolute mt-16 py-2 right-0 bg-zinc-950 rounded-lg shadow shadow-zinc-800 p-1 transition-colors
                ${openDrop ? 'scale-100 opacity-100' : 'scale-125 opacity-0 pointer-events-none'}
                `}
            >
                {openDrop && children}
            </div>
        </div>
    );
}

export default Dropdown;