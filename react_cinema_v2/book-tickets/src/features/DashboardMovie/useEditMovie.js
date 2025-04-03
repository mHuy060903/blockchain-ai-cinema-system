import { useMutation } from "@tanstack/react-query";
import { editMovieApi } from "../../fetchApi/movie/editMovie";

export const useEditMovie = () => {
  const {
    isLoading: isLoadingEdit,
    isError: isErrorUpdate,
    mutate: handleEditMovie,
  } = useMutation({
    mutationFn: editMovieApi,
  });

  return { isLoadingEdit, isErrorUpdate, handleEditMovie };
};
