import { useQuery } from "@tanstack/react-query";
import { getAllMovieSettings } from "../../fetchApi/settings/getAllMovieSettings";

export const useGetAllMovieSettings = (type) => {
  const { isLoading, isError, data } = useQuery({
    queryFn: () => getAllMovieSettings(type),
    queryKey: ["movie_settings", type],
  });

  return {isLoading, isError, data}
};
