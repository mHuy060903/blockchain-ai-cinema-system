import { useMutation } from "@tanstack/react-query";
import { deleteCinemaApi } from "../../fetchApi/cinema/deleteCinema";

export const useDeleteCinema = () => {
  const {
    isLoading: isLoadingDelete,
    isError: isErrorDelete,
    mutate: handleDeleteCinema,
  } = useMutation({
    mutationFn: deleteCinemaApi,
  });

  return { isLoadingDelete, isErrorDelete, handleDeleteCinema };
};
