import { useMutation } from "@tanstack/react-query";
import { duplicateCinemaApi } from "../../fetchApi/cinema/duplicateCinema";

export const useDuplicateCinema = () => {
  const {
    isLoading: isLoadingDuplicate,
    isError: isErrorDuplicate,
    mutate: handleDuplicateCinema,
  } = useMutation({
    mutationFn: duplicateCinemaApi,
  });

  return { isLoadingDuplicate, isErrorDuplicate, handleDuplicateCinema };
};
