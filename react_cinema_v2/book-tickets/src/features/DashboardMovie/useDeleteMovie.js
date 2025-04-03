import { useMutation } from "@tanstack/react-query";
import { deleteMovieApi } from "../../fetchApi/movie/deleteMovie";

export const useDeleteMovie = () => {
  const {
    mutate: handleDeleteMovie,
    isLoading: isLoadingDelete,
    isError: isErrorDelete,
  } = useMutation({
    mutationFn: deleteMovieApi,
  });

  return { handleDeleteMovie, isLoadingDelete, isErrorDelete };
};
