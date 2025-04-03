import { useQuery } from "@tanstack/react-query";
import { getAllCinemaByProvince } from "../../fetchApi/screen/getAllCinemaByProvince";
import { useSearchParams } from "react-router-dom";

export const useGetCinemaByProvince = () => {
  const [searchParams] = useSearchParams();
  const idProvince = searchParams.get("idProvince")
    ? Number(searchParams.get("idProvince"))
    : null;
  const {
    isLoading: isLoadingCinemaByProvince,
    isError: isErrorCinemaByProvince,
    data: cinemaByProvince,
  } = useQuery({
    queryFn: () => getAllCinemaByProvince(idProvince),
    queryKey: ["cinema-by-provinceId", idProvince],
  });

  return {
    isLoadingCinemaByProvince,
    isErrorCinemaByProvince,
    cinemaByProvince,
  };
};
