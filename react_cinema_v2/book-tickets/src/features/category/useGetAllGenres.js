import { useQuery } from "@tanstack/react-query";
import { getAllGenreApi } from "../../fetchApi/category/getAllGenre";

export const useGetAllGenres = () => {
  const { isLoading, isError, data } = useQuery({
    queryFn: getAllGenreApi,
    queryKey: ["genres_category"],
  });

  return { isLoading, isError, data };
};
