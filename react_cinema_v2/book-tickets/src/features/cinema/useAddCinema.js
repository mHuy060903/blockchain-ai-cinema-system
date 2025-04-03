import { useMutation } from "@tanstack/react-query";
import { addCinemaApi } from "../../fetchApi/cinema/addCinema";

export const useAddCinema = () => {
  const {
    isLoading: isLoadingAdd,
    isError: isErrorAdd,
    mutate: handleAddCinema,
  } = useMutation({
    mutationFn: addCinemaApi,
  });

  return { isLoadingAdd, isErrorAdd, handleAddCinema };
};
