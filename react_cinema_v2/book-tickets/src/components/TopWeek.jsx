import { useEffect, useState } from "react";
import { useGetAllMovieMostOrder } from "../features/home/useGetAllMovieMostOrder";
import ItemMovieTop from "./ItemMovieTop";
import Loader from "./Loader";
import TextHeading from "./TextHeading";
import { IoIosArrowDown } from "react-icons/io";
const TopWeek = () => {
  const { isLoading, data } = useGetAllMovieMostOrder();

  const [num, setNum] = useState(0);

  useEffect(() => {
    setNum(data?.length <= 3 ? data?.length : 3);
  }, [data]);

  const toggleSeeMovie = () => {
    setNum((prev) => {
      const result = prev === 3 && data.length > 3 ? data.length : 3;
      return result;
    });
  };

  return (
    <div className="w-full flex flex-col ">
      <TextHeading small text="Top of this week" />
      <div className="bg-white rounded-lg p-2 flex flex-col gap-3 dark:bg-[#1f1f1f]">
        {isLoading ? (
          <div className="flex-1 flex justify-center ">
            <Loader size={30} color="blue" />
          </div>
        ) : (
          Array.from({ length: num }).map((_, index) => (
            <ItemMovieTop key={data[index].id} movie={data[index].movie} />
          ))
        )}

        <div
          className="flex items-center gap-6 justify-center w-full"
          onClick={toggleSeeMovie}
        >
          <h3 className="font-bold dark:text-white">See More</h3>
          <IoIosArrowDown className="dark:text-white" size={22} />
        </div>
      </div>
    </div>
  );
};

export default TopWeek;
