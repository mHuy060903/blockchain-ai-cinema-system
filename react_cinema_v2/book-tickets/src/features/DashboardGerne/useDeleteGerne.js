import { useMutation } from "@tanstack/react-query";
import { deleteGerneApi } from "../../fetchApi/gerne/deleteGerne";

export const useDeleteGerne = () => {
  const {
    isLoading: isLoadingDelete,
    isError: isErrorDelete,
    mutate: handleDeleteGerne,
  } = useMutation({
    mutationFn: deleteGerneApi,
  });

  return { isLoadingDelete, isErrorDelete, handleDeleteGerne };
};
