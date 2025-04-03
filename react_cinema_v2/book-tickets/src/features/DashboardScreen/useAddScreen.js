import { useMutation } from "@tanstack/react-query";
import { addScreenApi } from "../../fetchApi/screen/addScreen";

export const useAddScreen = () => {
  const {
    isLoading: isLoadingAdd,
    isError: isErrorAdd,
    mutate: handleAddScreen,
  } = useMutation({
    mutationFn: addScreenApi,
  });

  return { isLoadingAdd, isErrorAdd, handleAddScreen };
};
