const ModelDashBoard = ({ children, onClose }) => {
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        onClose();
      }}
      className="fixed top-0 left-0 w-full h-full bg-slate-900/60"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="fixed top-[50%] left-[50%] -translate-x-[50%]
      -translate-y-[50%] bg-white rounded-lg"
      >
        {children}
      </div>
    </div>
  );
};

export default ModelDashBoard;
