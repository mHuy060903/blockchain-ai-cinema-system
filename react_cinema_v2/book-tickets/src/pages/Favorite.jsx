import ItemMovie from "../components/ItemMovie";
import Loader from "../components/Loader";
import { useGetAllFavorite } from "../features/favorite/useGetAllFavorite";

const Favorite = () => {
  const { isLoading, isError, data } = useGetAllFavorite();
  console.log(data)
  return (
    <div className="my-8 flex flex-col rounded-lg px-3 py-4 gap-2">
      <div className="grid grid-cols-12 gap-3">
        {isLoading ? (
          <div className="col-span-12 text-center">
            <Loader size={100} color="blue" />
          </div>
        ) : data.length === 0 ? (
          <h1 className="col-span-12 text-center font-bold">
            No movie fit with your choose
          </h1>
        ) : (
          data?.map((movie) => (
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
  );
};

export default Favorite;
