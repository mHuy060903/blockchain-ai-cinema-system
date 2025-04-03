import { useMutation } from "@tanstack/react-query";
import { deleteSeatTypesApi } from "../../fetchApi/seatTypes/deleteSeatTypes";

export const useDeleteSeatTypes = () => {
  const {
    isLoading: isLoadingDelete,
    isError: isErrorDelete,
    mutate: handleDeleteSeatTypes,
  } = useMutation({
    mutationFn: deleteSeatTypesApi,
  });

  return { isLoadingDelete, isErrorDelete, handleDeleteSeatTypes };
};
