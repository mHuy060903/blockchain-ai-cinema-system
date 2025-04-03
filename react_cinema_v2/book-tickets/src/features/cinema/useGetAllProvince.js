import { useQuery } from "@tanstack/react-query";
import { getAllProvinceApi } from "../../fetchApi/cinema/getAllProvince";

export const useGetAllProvince = () => {
  const {
    isLoading: isLoadingAllProvince,
    isError: isErrorAllProvince,
    data: provinces,
  } = useQuery({
    queryFn: getAllProvinceApi,
    queryKey: ["province"],
  });

  return { isLoadingAllProvince, isErrorAllProvince, provinces };
};
