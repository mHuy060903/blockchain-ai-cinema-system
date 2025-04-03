import { useMutation } from "@tanstack/react-query";
import { addSeatTypesApi } from "../../fetchApi/seatTypes/addSeatTypes";

export const useAddSeatTypes = () => {
  const {
    isLoading: isLoadingAdd,
    isError: isErrorAdd,
    mutate: handleAddSeatTypes,
  } = useMutation({
    mutationFn: addSeatTypesApi,
  });

  return { isLoadingAdd, isErrorAdd, handleAddSeatTypes };
};
