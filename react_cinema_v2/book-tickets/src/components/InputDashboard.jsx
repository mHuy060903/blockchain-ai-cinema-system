const InputDashboard = ({ title, register, error, type = "text" }) => {
  return (
    <div className="grid grid-cols-12">
      <label className="col-span-4 font-semibold text-slate-900/90">
        {title.toString().charAt(0).toUpperCase() + title.toString().slice(1)}
      </label>
      <input
        type={type}
        {...register}
        className={`${
          error ? "border-red-500" : "border-slate-600/30 "
        } col-span-8 outline-none border-[1px]  py-1 px-1`}
      />
      {error && (
        <>
          <div className="col-span-4"></div>
          <p className="text-red-600 italic text-sm col-span-8">
            {" "}
            {error.message}
          </p>
        </>
      )}
    </div>
  );
};

export default InputDashboard;
