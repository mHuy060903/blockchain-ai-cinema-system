import { useMutation } from "@tanstack/react-query";
import { duplicateGerneApi } from "../../fetchApi/gerne/DuplicateGerne";

export const useDuplicateGerne = () => {
  const {
    mutate: handleDuplicateGerne,
    isLoading: isLoadingGerne,
    isError: isErrorHerne,
  } = useMutation({
    mutationFn: duplicateGerneApi,
    // onSuccess: () => {
    //   toast.success("Duplicate success");
    //   queryClient.invalidateQueries({ queryKey: ["genres"] });
    // },
  });

  return { handleDuplicateGerne, isLoadingGerne, isErrorHerne };
};
