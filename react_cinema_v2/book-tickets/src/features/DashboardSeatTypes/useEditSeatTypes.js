import { useMutation } from "@tanstack/react-query";
import { editSeatTypesApi } from "../../fetchApi/seatTypes/editSeatTypes";

export const useEditSeatTypes = () => {
  const {
    isLoading: isLoadingEdit,
    isError: isErrorEdit,
    mutate: handleEditSeatTypes,
  } = useMutation({
    mutationFn: editSeatTypesApi,
  });
  return { isLoadingEdit, isErrorEdit, handleEditSeatTypes };
};
