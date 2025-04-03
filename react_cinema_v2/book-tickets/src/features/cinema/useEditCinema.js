import { useMutation } from "@tanstack/react-query";
import { editCinemaApi } from "../../fetchApi/cinema/editCinema";

export const useEditCinema = () => {
  const {
    isLoading: isLoadingEdit,
    isError: isErrorEdit,
    mutate: handleEditCinema,
  } = useMutation({
    mutationFn: editCinemaApi,
  });

  return { isLoadingEdit, isErrorEdit, handleEditCinema };
};
