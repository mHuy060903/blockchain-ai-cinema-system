import { useQuery } from "@tanstack/react-query";
import { getAllMovieByDate } from "../../fetchApi/settings/getAllMovieByDate";

export const useGetAllMovieByDate = () => {
  const { isLoading, isError, data } = useQuery({
    queryFn: getAllMovieByDate,
    queryKey: ["movie_settings", "by_date"],
  });

  return { isLoading, isError, data };
};
