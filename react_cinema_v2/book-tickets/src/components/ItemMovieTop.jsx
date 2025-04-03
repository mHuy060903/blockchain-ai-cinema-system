import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
const ItemMovieTop = ({ movie }) => {
  return (
    <Link to={`/category/movie/${movie.id}`} className="flex flex-col gap-3 ">
      <div className="flex lg:gap-1 gap-0">
        <div className="lg:w-[25%] sm:w-[50%] w-full h-full rounded-lg overflow-hidden">
          <img className="w-full h-full object-cover" src={movie.image} />
        </div>

        <div className="flex-1 flex flex-col justify-between">
          <div className="flex flex-col gap-1 mt-3">
            <h3 className="font-bold text-gray-700 text-md dark:text-white">
              {movie.title}
            </h3>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-sm text-gray-400 dark:text-gray-200 text-nowrap truncate w-10">
              {movie.director}
            </span>
            <div className="bg-black/5 dark:bg-white/20 rounded-md p-[2px] text-sm text-gray-400 dark:text-gray-100">
              {movie.genre}
            </div>
            <FaStar color="yellow" size={12} />
            <span className="text-[12px] text-gray-400 font-semibold dark:text-gray-200">
              7.5
            </span>
          </div>
        </div>
      </div>
      <hr />
    </Link>
  );
};

export default ItemMovieTop;
