import { useMutation } from "@tanstack/react-query";
import { addMovieApi } from "../../fetchApi/movie/addMovie";

export const useAddMovie = () => {
  const {
    isLoading,
    isError,
    mutate: handleAddMovie,
  } = useMutation({
    mutationFn: addMovieApi,
  });

  return { isLoading, isError, handleAddMovie };
};
