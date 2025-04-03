import { useQuery } from "@tanstack/react-query";
import { getAllMovieMostOrder } from "../../fetchApi/movie/getAllMovieMostOrder";

export const useGetAllMovieMostOrder = () => {
  const { isLoading, isError, data } = useQuery({
    queryFn: getAllMovieMostOrder,
    queryKey: ["most_movie"],
  });

  return { isLoading, isError, data };
};
