import { useMutation } from "@tanstack/react-query";

import { editUserApi } from "../../fetchApi/users/editUser";

export const useEditUser = () => {
  const {
    isLoading,
    isError,
    mutate: handleEditUser,
  } = useMutation({
    mutationFn: editUserApi,
  });

  return { isLoading, isError, handleEditUser };
};
