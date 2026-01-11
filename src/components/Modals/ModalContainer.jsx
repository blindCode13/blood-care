export default function ModalContainer({ children }) {
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-[5px] flex items-center justify-center z-60">
      <div className="bg-primary-bg rounded-2xl shadow-lg p-6 w-[90%] max-w-md relative">
        {children}
      </div>
    </div>
  );
};