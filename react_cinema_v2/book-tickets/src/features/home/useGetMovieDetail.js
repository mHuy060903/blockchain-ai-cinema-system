import { useQuery } from "@tanstack/react-query";
import { getMovieDetailApi } from "../../fetchApi/home/getMovieDetail";
import { useParams } from "react-router-dom";

export const useGetMovieDetail = () => {
  const { id } = useParams();

  const { isLoading, isError, data } = useQuery({
    queryFn: () => getMovieDetailApi(id),
    queryKey: ["movie", id],
  });

  return { isLoading, isError, data };
};
