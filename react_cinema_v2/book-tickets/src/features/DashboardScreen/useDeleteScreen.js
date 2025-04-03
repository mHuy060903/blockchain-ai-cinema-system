import { useMutation } from "@tanstack/react-query";
import { deleteScreenApi } from "../../fetchApi/screen/deleteScreen";

export const useDeleteScreen = () => {
  const {
    isLoading: isLoadingDelete,
    isError: isErrorDelete,
    mutate: handleDeleteScreen,
  } = useMutation({
    mutationFn: deleteScreenApi,
  });

  return { isLoadingDelete, isErrorDelete, handleDeleteScreen };
};
