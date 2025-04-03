import { useMutation } from "@tanstack/react-query";
import { autoUpdateDateMovie } from "../../fetchApi/home/autoUpdateDateMovie";

export const useAutoUpdateMovie = () => {
  const {
    isLoading,
    isError,
    mutate: handleAutoUpdateDateMovie,
  } = useMutation({
    mutationFn: autoUpdateDateMovie,
  });

  return { isLoading, isError, handleAutoUpdateDateMovie };
};
