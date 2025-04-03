import { useMutation } from "@tanstack/react-query";
import { addMovieSettingApi } from "../../fetchApi/settings/addMovieSetting";

export const useAddMovieSeting = () => {
  const {
    isLoading: isLoadingAdd,
    isError: isErrorAdd,
    mutate: handleAddMovieSetting,
  } = useMutation({
    mutationFn: addMovieSettingApi,
  });

  return { isLoadingAdd, isErrorAdd, handleAddMovieSetting };
};
