import { useQuery } from "@tanstack/react-query";
import { getAllCinema } from "../../fetchApi/cinema/getAllCinema";
import { useSearchParams } from "react-router-dom";

export const useGetAllCinema = () => {
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page") ? Number(searchParams.get("page")) : 1;
  const {
    isLoading: isLoadingGetAll,
    isError: isErrorGetAll,
    data: cinemas,
  } = useQuery({
    queryFn: () => getAllCinema({ page }),
    queryKey: ["cinemas", page],
  });

  if (isErrorGetAll) {
    throw new Error("Some thing went wrong when get all cinemas");
  }

  return { isLoadingGetAll, isErrorGetAll, cinemas };
};
