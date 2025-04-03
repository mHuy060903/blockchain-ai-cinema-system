import TextHeading from "./TextHeading";

const TopDiscount = () => {
  return (
    <div className="w-full flex flex-col relative ">
      <TextHeading small text="Offer Of Tonight" />
      <div className="bg-white relative w-auto mx-5  flex flex-col items-center rounded-lg dark:bg-[#1f1f1f]">
        <div className="absolute p-2 rounded-full bg-red-600 top-[-10px] right-[-20px] z-100">
          <span className="text-white text-sm">25%</span>
        </div>
        <div className="w-full overflow-hidden">
          <img
            className="rounded-lg"
            src="https://ahootbxlbocaadpiifds.supabase.co/storage/v1/object/public/images/2024-07-15T03_04_03.520Z.jpg"
          />
        </div>
        <div className="flex flex-col gap-2 items-start">
          <h1 className="font-bold text-gray-600 dark:text-white">
            Mama Mia Musical Teater
          </h1>
          <span className=" text-sm text-gray-400 dark:text-white">
            Tower Cinema
          </span>
          <div className="flex gap-3 items-center">
            <span className="text-lg text-gray-700 font-semibold dark:text-white/60">
              20.00$
            </span>
            <span className="text-gray-300 relative dark:text-white">
              31.00$
              <div className="absolute w-full h-[2px] bg-gray-300 top-[65%]"></div>
            </span>
          </div>
          <button className="w-full my-2 hover:bg-orange-700 duration-300 transition bg-orange-500 text-white font-semibold rounded-3xl py-2 text-lg">
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopDiscount;
