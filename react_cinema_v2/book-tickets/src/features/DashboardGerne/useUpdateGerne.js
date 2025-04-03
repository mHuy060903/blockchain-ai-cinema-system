import { useMutation } from "@tanstack/react-query";
import { updateGerneApi } from "../../fetchApi/gerne/updateGerne";

export const useUpdateGerne = () => {
  const {
    isLoading: isLoadingUpdate,
    isError: isErrorUpdate,
    mutate: handleUpdateGenre,
  } = useMutation({
    mutationFn: updateGerneApi,
    // onSuccess: () => {
    //   toast.success("Update success");
    //   handleCloseModel();
    //   queryClient.invalidateQueries({ queryKey: ["genres"] });
    // },
  });

  return { isLoadingUpdate, isErrorUpdate, handleUpdateGenre };
};
