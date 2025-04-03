import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { FaRegClock } from "react-icons/fa";
import { FaFacebookSquare } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { useGetMovieDetail } from "../features/home/useGetMovieDetail";
import Loader from "../components/Loader";
import { useEffect, useState } from "react";
import { changeDateToString } from "../fetchApi/gerne/getAll";
import { FaHeart } from "react-icons/fa";
import { IoTicket } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { toggleMovieFavorite } from "../reducers/favorites/favoritesSlice";
import ModelDashBoard from "../components/ModelDashBoard";
import SelectedDate from "../components/SelectedDate";
import { FaMapMarkedAlt } from "react-icons/fa";
import { useGetAllShowTimeByMovie } from "../features/home/useGetAllShowTimeByMovie";
import LocationMap from "../components/LocationMap";

const MovieDetail = () => {
  const [isOpenModel, setIsOpenModel] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedProvince, setSelectedProvince] = useState("");
  const [arrayShowTimeByCinema, setArrayShowTimeByCinema] = useState({});

  const { isLoading, isError, data } = useGetMovieDetail();
  const {
    isLoading: isLoadingShowtime,
    isError: isErrorShowtime,
    data: showtimes,
  } = useGetAllShowTimeByMovie();

  const { id } = useParams();

  const favoritesArr = useSelector((state) => state.favorites.movies);
  const dispatch = useDispatch();

  const now = new Date();

  const date =
    searchParams.get("date") ||
    `${now.getFullYear()}-${(now.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${now.getDate().toString().padStart(2, "0")}`;

  const handleToggleFavorite = () => {
    dispatch(toggleMovieFavorite({ movieId: Number(id) }));
  };

  const minute = data?.duration % 60;
  const hour = (data?.duration - minute) / 60;

  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
    if (showtimes?.count > 0) {
      const keys = Object.keys(showtimes.myMap);
      setSelectedProvince(keys[0]);

      const result = {};

      Object.keys(showtimes?.myMap).map((cur) => {
        if (cur === keys[0]) {
          showtimes?.myMap[cur].map((showtime) => {
            if (result[showtime.screens.cinemas.name]) {
              result[showtime.screens.cinemas.name].push(showtime);
            } else {
              result[showtime.screens.cinemas.name] = [];
              const arrayCopy = [...result[showtime.screens.cinemas.name]];
              arrayCopy.push(showtime);
              result[showtime.screens.cinemas.name] = arrayCopy;
            }
          });
        }
      });

      setArrayShowTimeByCinema(result);
    }
  }, [showtimes]);

  const handleCloseModel = () => {
    setIsOpenModel(false);
  };

  const handleOpenModel = () => {
    setIsOpenModel(true);
    searchParams.set("date", date);
    setSearchParams(searchParams);
  };

  const handleSelectProvince = (province) => {
    setSelectedProvince(province);

    const result = {};

    Object.keys(showtimes?.myMap).map((cur) => {
      if (cur === province) {
        showtimes?.myMap[cur].map((showtime) => {
          if (result[showtime.screens.cinemas.name]) {
            result[showtime.screens.cinemas.name].push(showtime);
          } else {
            result[showtime.screens.cinemas.name] = [];
            const arrayCopy = [...result[showtime.screens.cinemas.name]];
            arrayCopy.push(showtime);
            result[showtime.screens.cinemas.name] = arrayCopy;
          }
        });
      }
    });

    setArrayShowTimeByCinema(result);
  };
  console.log(arrayShowTimeByCinema);
  return (
    <div className="bg-white my-8 flex flex-col rounded-lg px-3 py-4 gap-2 dark:bg-[#1f1f1f]">
      {isOpenModel && (
        <ModelDashBoard onClose={handleCloseModel}>
          <div className="flex flex-col items-start p-3 bg-[#fdfcf0] gap-4">
            <div className="flex justify-start gap-2 items-center">
              {Array.from({ length: 5 }).map((_, index) => {
                const date = new Date(now);
                date.setDate(now.getDate() + index);
                return (
                  <SelectedDate key={index} stringDate={date.toDateString()} />
                );
              })}
            </div>
            <div className="w-full h-[2px] bg-black"></div>
            {isLoading ? (
              <Loader size={100} color="orange" />
            ) : showtimes?.count > 0 ? (
              <>
                <div className="flex items-center justify-start">
                  {Object.keys(showtimes?.myMap).map((key, index) => (
                    <div
                      onClick={() => handleSelectProvince(key)}
                      className={`${
                        selectedProvince === key ? "bg-black text-white" : ""
                      } p-2 rounded-lg cursor-pointer`}
                      key={key}
                    >
                      {key}
                    </div>
                  ))}
                </div>
                <div className="w-full h-[2px] bg-black"></div>
                <div className="flex flex-col items-start gap-3">
                  {Object.keys(arrayShowTimeByCinema).map((key, index) => {
                    return (
                      <div key={index}>
                        <h1 className="text-2xl font-semibold text-gray-500 flex items-center gap-3">
                          <span>{key}</span>
                          <div className="relative group">
                            <FaMapMarkedAlt className="" />
                            <div className="absolute h-[250px] w-[250px]  hidden group-hover:block">
                              <LocationMap
                                position={[
                                  arrayShowTimeByCinema[key].at(0).screens
                                    .cinemas.lat,
                                  arrayShowTimeByCinema[key].at(0).screens
                                    .cinemas.lng,
                                ]}
                                name={
                                  arrayShowTimeByCinema[key].at(0).screens
                                    .cinemas.name
                                }
                              />
                            </div>
                          </div>
                        </h1>
                        <div className="flex gap-3">
                          {arrayShowTimeByCinema[key].map((showtime) => (
                            <Link
                              to={`/booking/${showtime.id}`}
                              className="cursor-pointer border border-gray-500 text-black p-2"
                              key={showtime.id}
                            >
                              {showtime.show_time_start.toString().slice(0, -3)}
                            </Link>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            ) : (
              <p>Xin lỗi hiện tại chưa có lịch chiếu cho ngày này</p>
            )}
          </div>
        </ModelDashBoard>
      )}
      {isLoading ? (
        <div className="flex-1 flex justify-center w-full">
          <Loader size={100} color="blue" />
        </div>
      ) : (
        <>
          {" "}
          <div className="flex justify-start gap-4 items-start">
            <div className="flex flex-col ">
              <img
                className="object-cover w-[200px] h-full"
                src={data?.image}
              />
              <div className="flex flex-col gap-4 items-center mt-3">
                <button
                  onClick={handleToggleFavorite}
                  className={`${
                    favoritesArr.includes(Number(id))
                      ? "bg-gray-500/20 text-red-500"
                      : "bg-gray-500 text-white"
                  } flex py-2 px-2 rounded-lg  items-center gap-2 font-semibold`}
                >
                  {favoritesArr.includes(Number(id))
                    ? "Remove favorites"
                    : "Add favorites"}
                  <FaHeart
                    className={`${
                      favoritesArr.includes(Number(id))
                        ? "text-red-600"
                        : "text-gray-400"
                    }`}
                    size={22}
                  />
                </button>
                <button
                  onClick={handleOpenModel}
                  className="bg-yellow-600 flex py-2 px-2 rounded-lg text-white items-center gap-2 font-semibold"
                >
                  Book ticket <IoTicket size={22} />
                </button>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <h1 className="font-bold text-2xl dark:text-white">
                {data?.title}
              </h1>
              <div className="flex items-center">
                <div className="text-white bg-orange-500 px-2 py-1 font-semibold">
                  G
                </div>
                <p className="flex items-center ml-5 gap-2">
                  <FaRegClock className="text-orange-500 " />
                  <span className="text-sm font-bold text-orange-500">
                    {hour} hours {minute} minutes
                  </span>
                </p>
              </div>
              <table>
                <thead>
                  <tr>
                    <td></td>
                    <td></td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="w-[20%] font-bold dark:text-white">
                      Actor:
                    </td>
                    <td className="text-gray-500 dark:text-white/60">
                      {data?.actor}
                    </td>
                  </tr>
                  <tr>
                    <td className="font-bold dark:text-white">Director:</td>
                    <td className="text-gray-500 dark:text-white/60">
                      {data?.director}
                    </td>
                  </tr>
                  <tr>
                    <td className="font-bold dark:text-white">Genre::</td>
                    <td className="text-gray-500 dark:text-white/60">
                      {data?.genres.join(", ")}
                    </td>
                  </tr>
                  <tr>
                    <td className="font-bold dark:text-white">Release:</td>
                    <td className="text-gray-500 dark:text-white/60">
                      {changeDateToString(data?.release_date).slice(0, -9)}
                    </td>
                  </tr>
                  <tr>
                    <td className="font-bold dark:text-white">Rating:</td>
                    <td className="text-gray-500 dark:text-white/60">3.4</td>
                  </tr>
                </tbody>
              </table>
              <div className=" border-t-[1px] border-b-[1px] border-gray-200 py-3">
                <div className="flex items-center gap-2 justify-end">
                  <span className="text-lg font-bold dark:text-white">
                    Share:
                  </span>
                  <div className="flex items-center gap-2">
                    <FaFacebookSquare
                      className="cursor-pointer text-blue-600  hover:text-blue-900 transition duration-300"
                      size={24}
                    />
                    <FaTwitter
                      className="cursor-pointer text-blue-600  hover:text-blue-900 transition duration-300"
                      size={24}
                    />
                    <FaYoutube
                      className="cursor-pointer text-red-600  hover:text-red-900 transition duration-300"
                      size={24}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-5">
            <h1 className="font-bold text-3xl text-orange-600">Description</h1>
            <p className="flex-1 text-gray-500 dark:text-white">
              {data?.description}
            </p>
          </div>
          <div className="flex flex-col"></div>
        </>
      )}
    </div>
  );
};

export default MovieDetail;
