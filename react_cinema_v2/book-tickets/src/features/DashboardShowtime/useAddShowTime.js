import { useMutation } from "@tanstack/react-query";
import { addShowTimeApi } from "../../fetchApi/showtimes/addShowTime";

export const useAddShowTime = () => {
  const {
    isLoading: isLoadingAdd,
    isError: isErrorAdd,
    mutate: handleAddShowTime,
    error: errorAddShowTime,
  } = useMutation({
    mutationFn: addShowTimeApi,
  });

  console.log(errorAddShowTime);
  return { isLoadingAdd, isErrorAdd, handleAddShowTime, errorAddShowTime };
};
