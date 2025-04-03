import { useMutation } from "@tanstack/react-query";
import { duplicateSeatTypesApi } from "../../fetchApi/seatTypes/duplicateSeatTypes";

export const useDuplicateSeatTypes = () => {
  const {
    isLoading: isLoadingDuplicate,
    isError: isErrorDuplicate,
    mutate: handleDuplicateSeatTypes,
  } = useMutation({
    mutationFn: duplicateSeatTypesApi,
  });

  return { isLoadingDuplicate, isErrorDuplicate, handleDuplicateSeatTypes };
};
