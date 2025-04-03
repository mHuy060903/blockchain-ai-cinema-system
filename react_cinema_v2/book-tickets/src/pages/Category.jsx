import { useState } from "react";
import GenreItem from "../components/GenreItem";
import Loader from "../components/Loader";
import { useGetAllGenres } from "../features/category/useGetAllGenres";
import { useGetMovieByGenre } from "../features/category/useGetMovieByGenre";
import ItemMovie from "../components/ItemMovie";

const Category = () => {
  const [arrGenresSelected, setArrGenresSelected] = useState([]);

  const { isLoading, isError, data } = useGetAllGenres();
  const {
    isLoading: isLoadingGetMovie,
    isError: isErrorGetMovie,
    data: dataMovie,
  } = useGetMovieByGenre(arrGenresSelected);

  const onToggleGenresSelected = (id) => {
    const arrGenresSelectedCopy = [...arrGenresSelected];
    if (arrGenresSelectedCopy.includes(id)) {
      const index = arrGenresSelectedCopy.findIndex(
        (genreId) => genreId === id
      );
      arrGenresSelectedCopy.splice(index, 1);
    } else {
      arrGenresSelectedCopy.push(id);
    }
    setArrGenresSelected(arrGenresSelectedCopy);
  };

  const onClickSelectedAllGenre = () => {
    setArrGenresSelected([]);
  };

  return (
    <div className=" my-8 flex flex-col rounded-lg px-3 py-4 gap-2 overflow-x-auto">
      <div className="flex flex-col gap-3 overflow-x-auto">
        {isLoading ? (
          <div className="flex justify-center">
            <Loader color="blue" size={100} />
          </div>
        ) : (
          <div
            id="scroll_category"
            className="flex gap-3 items-center overflow-x-auto my-2"
          >
            <button
              onClick={onClickSelectedAllGenre}
              className={`border-[2px] p-2 font-medium text-nowrap rounded-2xl text-gray-700 my-2 ${
                arrGenresSelected.length === 0 ? "bg-purple-600 text-white" : ""
              }`}
            >
              All
            </button>
            {data?.map((genre) => (
              <GenreItem
                onToggleGenresSelected={onToggleGenresSelected}
                isSelected={arrGenresSelected.includes(genre.id)}
                genre={genre}
                key={genre.id}
              />
            ))}
          </div>
        )}
        <div className="grid grid-cols-12 gap-3">
          {isLoadingGetMovie ? (
            <div className="col-span-12 text-center">
              <Loader size={100} color="blue" />
            </div>
          ) : dataMovie.length === 0 ? (
            <h1 className="col-span-12 text-center font-bold">No movie fit with your choose</h1>
          ) : (
            dataMovie?.map((movie) => (
              <ItemMovie
                key={movie.id}
                id={movie.id}
                duration={movie.duration}
                title={movie.title}
                image={movie.image}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Category;
