import { useQuery } from "@tanstack/react-query";
import { getAllScreenApi } from "../../fetchApi/screen/getAllScreen";

export const useGetAllScreen = () => {
  const {
    isLoading: isLoadingGetAll,
    isError: isErrorGetAll,
    data: screens,
  } = useQuery({
    queryFn: getAllScreenApi,
    queryKey: ["screens"],
  });

  return { isLoadingGetAll, isErrorGetAll, screens };
};
