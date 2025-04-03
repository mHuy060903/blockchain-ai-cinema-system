import { useMutation } from "@tanstack/react-query";
import { addGerneApi } from "../../fetchApi/gerne/AddGerne";

export const useAddGerne = () => {
 
  const {
    isLoading: isLoadingAdd,
    isError: isErrorAdd,
    mutate: handleAddNewGenre,
  } = useMutation({
    mutationFn: addGerneApi,
  });

  return { isLoadingAdd, isErrorAdd, handleAddNewGenre };
};
