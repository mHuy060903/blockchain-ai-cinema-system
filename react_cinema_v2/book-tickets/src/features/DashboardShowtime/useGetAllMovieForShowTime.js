import { useQuery } from "@tanstack/react-query";
import { getAllMovieForShowTime } from "../../fetchApi/showtimes/getAllMovieForShowTime";

export const useGetAllMovieForShowTime = () => {
  const {
    isLoading: isLoadingAllMovieForShowTime,
    isError: isErrorAllMovieForShowTime,
    data: movies,
  } = useQuery({
    queryFn: getAllMovieForShowTime,
    queryKey: ["movies_all"],
  });

  return {
    isLoadingAllMovieForShowTime,
    isErrorAllMovieForShowTime,
    movies,
  };
};
