import { useState } from "react";
import TextHeading from "../components/TextHeading";
import ItemMovie from "../components/ItemMovie";
import { IoIosArrowForward } from "react-icons/io";
import { useGetAllFeaturedMovieHome } from "../features/home/useGetAllFeaturedMovie";
import Loader from "../components/Loader";
const Home = () => {
  const [isTypeSearch, setIsTypeSearch] = useState("movies");

  const { isLoadingGetFeaturedMovie, isErrorGetFeaturedMovie, movieFeatured } =
    useGetAllFeaturedMovieHome();

  const onSetTypeSearch = (value) => {
    setIsTypeSearch(value);
  };
  return (
    <div className="my-4 w-full">
      <div className="flex items-center justify-start gap-5 font-semibold text-gray-600">
        <div
          onClick={() => onSetTypeSearch("movies")}
          className={`${
            isTypeSearch === "movies" &&
            "text-black border-b-[#da821b] dark:text-white"
          } border-b-[2px] p-2 border-transparent transition-all duration-500 cursor-pointer hover:text-black dark:text-white`}
        >
          Movies
        </div>
        <div
          onClick={() => onSetTypeSearch("thearts")}
          className={`${
            isTypeSearch === "thearts" &&
            "text-black border-b-[#da821b] dark:text-white"
          } border-b-[2px] p-2 border-transparent transition-all duration-500 cursor-pointer  hover:text-black dark:text-white`}
        >
          Theaters
        </div>
        <div
          onClick={() => onSetTypeSearch("animator")}
          className={`${
            isTypeSearch === "animator" &&
            "text-black border-b-[#da821b] dark:text-white"
          } border-b-[2px] p-2 border-transparent transition-all duration-500 cursor-pointer  hover:text-black dark:text-white`}
        >
          Animator
        </div>
      </div>
      <div className="rounded-3xl relative overflow-hidden my-4 flex ">
        <img
          className="w-full h-auto lg:h-[280px]"
          src="https://th.bing.com/th/id/R.765612e3c452feb8a48e8b67b38a298e?rik=UDDUS33IZtOAlA&riu=http%3a%2f%2ftrumpwallpapers.com%2fwp-content%2fuploads%2fHarry-Potter-Wallpaper-21-2560-x-1440.jpg&ehk=Buj826W%2be7uiM7j%2bhFXSaJceQJq9XvO7fVOL5IFvvrI%3d&risl=&pid=ImgRaw&r=0"
        />
        <div className="flex flex-col md:items-start h-full w-full items-center justify-center  absolute z-30 md:left-[50%]  left-0 text-white gap-2 md:gap-4">
          <h1 className="font-bold text-xm md:text-5xl mb">Harry Potter</h1>
          <h3 className="text-sm md:text-2xl text-gray-300 font-thin">
            And the Prioner Of Azkaban
          </h3>
          <div className="flex md:gap-3 gap-1">
            <div className="rounded-lg p-1 text-sm bg-slate-700">2023</div>
            <div className="rounded-lg p-1 text-sm bg-slate-700">Adventure</div>
            <div className="rounded-lg p-1 text-sm bg-slate-700">110 min</div>
          </div>
          <button className="md:mt-5 mt-0 bg-white text-black font-medium md:px-6 md:py-3 px-2 py-1 rounded-3xl">
            Watch trailer
          </button>
        </div>
      </div>
      <div className="flex items-center justify-between ">
        <TextHeading text="Now Playing" />
        <div className="flex items-center gap-3 cursor-pointer">
          <button className="text-sm text-gray-500 font-semibold">
            View all
          </button>
          <div className="p-1 rounded-full border-gray-400 border-[3px]">
            <IoIosArrowForward className="" color="gray" size={25} />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-3">
        {isLoadingGetFeaturedMovie ? (
          <div className="col-span-12 text-center">
            <Loader size={100} color="blue" />
          </div>
        ) : (
          Array.from({ length: 4 }).map((_, index) => (
            <ItemMovie
              key={movieFeatured?.arrayMovieNow[index].id}
              id={movieFeatured?.arrayMovieNow[index].id}
              duration={movieFeatured?.arrayMovieNow[index].duration}
              title={movieFeatured?.arrayMovieNow[index].title}
              image={movieFeatured?.arrayMovieNow[index].image}
            />
          ))
        )}
      </div>
      <div className="flex items-center justify-between ">
        <TextHeading text="Coming Soon" />
        <div className="flex items-center gap-3 cursor-pointer">
          <button className="text-sm text-gray-500 font-semibold">
            View all
          </button>
          <div className="p-1 rounded-full border-gray-400 border-[3px]">
            <IoIosArrowForward className="" color="gray" size={25} />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-3">
        {isLoadingGetFeaturedMovie ? (
          <div className="col-span-12 text-center">
            <Loader size={100} color="blue" />
          </div>
        ) : (
          Array.from({ length: 4 }).map((_, index) => (
            <ItemMovie
              key={movieFeatured?.arrayMovieComing[index].id}
              id={movieFeatured?.arrayMovieComing[index].id}
              duration={movieFeatured?.arrayMovieComing[index].duration}
              title={movieFeatured?.arrayMovieComing[index].title}
              image={movieFeatured?.arrayMovieComing[index].image}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
