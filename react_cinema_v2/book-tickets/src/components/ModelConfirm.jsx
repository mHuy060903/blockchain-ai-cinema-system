import Loader from "./Loader";

const ModelConfirm = ({
  onClose,
  text,
  onSubmit,
  heading,
  isLoading,
  isError,
}) => {
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
        <div className="flex flex-col text-black p-4 gap-5">
          <h1 className="text-2xl font-semibold">{heading}</h1>
          {isError && (
            <p className="bg-red-500 text-white rounded-lg py-3">
              Some thing went wrong
            </p>
          )}
          <p className="border-t border-b border-slate-400 py-3">{text}</p>
          <div className="flex w-full justify-end gap-2">
            <button
              onClick={() => onClose()}
              className="bg-blue-500 text-white font-medium p-3 rounded-xl"
            >
              Cancel
            </button>
            <button
              onClick={() => onSubmit()}
              className="bg-red-500 flex text-white font-medium p-3 rounded-xl items-center gap-1"
            >
              {isLoading && <Loader size={20} />}
              Cofirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelConfirm;
