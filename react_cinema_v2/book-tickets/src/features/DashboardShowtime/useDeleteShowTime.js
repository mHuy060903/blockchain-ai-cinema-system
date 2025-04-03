import { useMutation } from "@tanstack/react-query";
import { deleteShowTimeApi } from "../../fetchApi/showtimes/deleteShowTime";

export const useDeleteShowTime = () => {
  const {
    isLoading: isLoadingDelete,
    isError: isErrorDelete,
    mutate: handleDeleteShowTime,
  } = useMutation({
    mutationFn: deleteShowTimeApi,
  });

  return { isLoadingDelete, isErrorDelete, handleDeleteShowTime };
};
