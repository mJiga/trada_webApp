export const Modal = ({open, onClose, children}) => {
  return (
    <div onClick={onClose} className={`
        fixed inset-0 flex justify-center items-center
        transition-colors
        ${open ? 'visible bg-black/20' : 'invisible'}
        `}
    >
    
        <div
            onClick={(e) => e.stopPropagation()}
            className={`
            bg-zinc-950 rounded-xl shadow p-6 transition-all
            ${open ? 'scale-100 opacity-100' : 'scale-125 opacity-0'}
            `}
        >
            {children}
        </div>
    </div>
  )
}

export default Modal
