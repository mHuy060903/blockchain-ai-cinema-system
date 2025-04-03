import { useMutation } from "@tanstack/react-query";
import { deleteMovieSetting } from "../../fetchApi/settings/deleteMovieSetting";

export const useDeleteMovieSetting = () => {
  const {
    isLoading: isLoadingDelete,
    isError: isErrorDelete,
    mutate: handleDeleteMovieSetting,
  } = useMutation({
    mutationFn: deleteMovieSetting,
  });

  return { isLoadingDelete, isErrorDelete, handleDeleteMovieSetting };
};
