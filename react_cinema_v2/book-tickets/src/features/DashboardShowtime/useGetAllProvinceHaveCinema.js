import { useQuery } from "@tanstack/react-query";
import { getAllProvinceHaveCinema } from "../../fetchApi/showtimes/getAllProvinceHaveCinema";

export const useGetAllProvinceHaveCinema = () => {
  const {
    isLoading: isLoadingGetAllPHC,
    isError: isErrorPHC,
    data: provincesHaveCinema,
  } = useQuery({
    queryFn: getAllProvinceHaveCinema,
    queryKey: ["province_have_cinema"],
  });

  return { isLoadingGetAllPHC, isErrorPHC, provincesHaveCinema };
};
