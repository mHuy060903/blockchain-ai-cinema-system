import { useMutation } from "@tanstack/react-query";
import { duplicateScreenApi } from "../../fetchApi/screen/duplicateScreen";

export const useDuplicateScreen = () => {
  const {
    isLoading: isLoadingDuplicate,
    isError: isErrorDuplicate,
    mutate: handleDuplicateScreen,
  } = useMutation({
    mutationFn: duplicateScreenApi,
  });

  return { isLoadingDuplicate, isErrorDuplicate, handleDuplicateScreen };
};
