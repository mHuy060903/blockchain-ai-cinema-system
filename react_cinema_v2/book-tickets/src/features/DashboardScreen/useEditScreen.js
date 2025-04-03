import { useMutation } from "@tanstack/react-query";
import { editScreenApi } from "../../fetchApi/screen/editScreen";

export const useEditScreen = () => {
  const {
    isLoading: isLoadingEdit,
    isError: isErrorEdit,
    mutate: handleEditScreen,
  } = useMutation({
    mutationFn: editScreenApi,
  });

  return { isLoadingEdit, isErrorEdit, handleEditScreen };
};
