import { FaStar } from "react-icons/fa";
import { CiClock1 } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleMovieFavorite } from "../reducers/favorites/favoritesSlice";
const ItemMovie = ({ title, id, duration, image }) => {
  const minutes = duration % 60;
  const hour = (duration - minutes) / 60;

  const favoritesArr = useSelector((state) => state.favorites.movies);
  const dispatch = useDispatch();
  const handleToggleFavorite = () => {
    dispatch(toggleMovieFavorite({ movieId: id }));
  };

  return (
    <div
      className="relative transition  delay-150 duration-300 hover:translate-y-[-8px] hover:cursor-pointer lg:col-span-3 md:col-span-6 sm:col-span-12 col-span-12 flex flex-col rounded-lg overflow-hidden bg-white
    dark:bg-[#1f1f1f]"
    >
      <NavLink to={`/category/movie/${id}`}>
        <div className="h-[180px] w-full ">
          <img className="h-full w-full object-cover" src={image} />
        </div>
        <div className="flex flex-col justify-start p-2 gap-3">
          <h1 className="font-bold text-gray-300 dark:text-white">{title}</h1>
          <div className="flex items-center justify-start gap-7">
            <div className="flex items-center gap-1 ">
              <FaStar color="yellow" size={12} />
              <span className="text-[12px] text-gray-400 dark:text-gray-300 font-semibold">
                7.5
              </span>
            </div>
            <div className="flex items-center gap-1">
              <CiClock1 color="gray" />
              <span className="text-[12px] text-gray-400 font-semibold dark:text-gray-300">
                {hour}hr {minutes}m
              </span>
            </div>
          </div>
        </div>
      </NavLink>
      <div
        onClick={(e) => {
          e.stopPropagation();
          handleToggleFavorite();
        }}
        className="absolute p-1 bg-white rounded-full top-2 right-2 hover:bg-gray-300 cursor-pointer"
      >
        <FaHeart
          className={`${
            favoritesArr.includes(id) ? "text-red-600" : "text-gray-400"
          }  `}
        />
      </div>
    </div>
  );
};

export default ItemMovie;
