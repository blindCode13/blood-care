export default function ModalContainer({ children }) {
  return (
    <div className="fixed inset-0 bg-gray-800/40 backdrop-blur-[1px] flex items-center justify-center z-60">
      <div className="bg-white rounded-2xl shadow-lg p-6 w-[90%] max-w-md relative">
        {children}
      </div>
    </div>
  );
};