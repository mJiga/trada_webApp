export const Modal = ({ setOpen, open, children }) => {
  return (
    <div
      onClick={() => setOpen(false)}
      className={`
        fixed inset-0 flex justify-center items-center
        transition-colors z-50
        ${open ? 'visible bg-black/20' : 'invisible'}
      `}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`
          bg-zinc-950 rounded-xl shadow-lg p-4 transition-transform
          max-w-[80vh] max-h-[70vh] overflow-hidden
          ${open ? 'scale-100 opacity-100' : 'scale-125 opacity-0'}
        `}
      >
        {open && children}
      </div>
    </div>
  );
};

export default Modal;