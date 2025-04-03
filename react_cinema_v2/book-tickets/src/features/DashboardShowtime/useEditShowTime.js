import { useMutation } from "@tanstack/react-query";
import { editShowTimeApi } from "../../fetchApi/showtimes/editShowTime";

export const useEditShowTime = () => {
  const {
    isLoading: isLoadingEdit,
    isError: isErrorEdit,
    mutate: handleEditShowTime,
    error: errorShowTimeEdit,
  } = useMutation({
    mutationFn: editShowTimeApi,
  });

  return { isErrorEdit, isLoadingEdit, handleEditShowTime, errorShowTimeEdit };
};
