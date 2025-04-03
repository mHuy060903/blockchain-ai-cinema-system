import { useQuery } from "@tanstack/react-query";
import { getAllGenres } from "../../fetchApi/gerne/getAll";

export const useGetNameGerne = () => {
  const { isLoading, isError, data } = useQuery({
    queryFn: getAllGenres,
    queryKey: ["genreSelect"],
  });

  return { isLoading, isError, data };
};
