import { useMutation } from "@tanstack/react-query";
import { duplicateMovieApi } from "../../fetchApi/movie/duplicateMovie";

export const useDulicateMovie = () => {
  const {
    isLoading: isLoadingDupalicate,
    isError: isErrorDuplicate,
    mutate: handleDuplicateMovie,
  } = useMutation({
    mutationFn: duplicateMovieApi,
  });

  return { isLoadingDupalicate, isErrorDuplicate, handleDuplicateMovie };
};
