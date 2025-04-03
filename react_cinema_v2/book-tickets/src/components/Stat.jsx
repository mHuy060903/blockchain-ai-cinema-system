const Stat = ({ title, color, icon, value }) => {
  return (
    <div className="flex gap-4 bg-white items-center col-span-1 rounded-lg px-2">
      <div className={` p-2 rounded-full`} style={{ backgroundColor: color }}>
        {icon}
      </div>
      <div className="flex flex-col">
        <h3 className="font-semibold text-black/60 text-sm ">{title}</h3>
        <h1 className="font-bold text-xl text-black">{value}</h1>
      </div>
    </div>
  );
};

export default Stat;
