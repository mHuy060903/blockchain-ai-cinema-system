import { useQuery } from "@tanstack/react-query";
import { getMovieByGenre } from "../../fetchApi/category/getMovieByGenre";

export const useGetMovieByGenre = (arr) => {
  const { isLoading, isError, data } = useQuery({
    queryFn: () => getMovieByGenre(arr),
    queryKey: ["movie_category", [...arr]],
  });

  return { isLoading, isError, data };
};
