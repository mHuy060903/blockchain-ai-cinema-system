import { useQuery } from "@tanstack/react-query";
import { getFullCinemas } from "../../fetchApi/cinema/getFullCinemas";

export const useGetFullCinemas = () => {
  const {
    isLoading: isLoadingGetFull,
    isError: isErrorGetFull,
    data: cinemasFull,
  } = useQuery({
    queryFn: getFullCinemas,
    queryKey: ["cinemas, full-cinemas"],
  });

  return { isLoadingGetFull, isErrorGetFull, cinemasFull };
};
