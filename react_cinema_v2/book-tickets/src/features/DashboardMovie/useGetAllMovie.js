import { useQuery } from "@tanstack/react-query";
import { getAllMovies } from "../../fetchApi/movie/getAllMovies";
import { useSearchParams } from "react-router-dom";

export const useGetAllMovie = () => {
  const [searchParams] = useSearchParams();

  const page = searchParams.get("page") ? Number(searchParams.get("page")) : 1;
  const { isLoading, isError, data } = useQuery({
    queryFn: () => getAllMovies({ page }),
    queryKey: ["movies", page],
  });

  return { isLoading, isError, data };
};
