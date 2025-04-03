import { useQuery } from "@tanstack/react-query";
import { getAllSeatTypesApi } from "../../fetchApi/seatTypes/getAllSeatTypes";
import { useSearchParams } from "react-router-dom";

export const useGetAllSeatTypes = () => {
  const [searchParams] = useSearchParams();

  const page = searchParams.get("page") ? Number(searchParams.get("page")) : 1;

  const sortByRaw = searchParams.get("sortBy") || "created_at-desc";
  const [field, direction] = sortByRaw.split("-");
  const sortBy = { field, direction };

  const {
    isLoading: isLoadingGetAll,
    isError: isErrorGetAll,
    data,
  } = useQuery({
    queryFn: () => getAllSeatTypesApi({ page, sortBy }),
    queryKey: ["seat_types", sortBy, page],
  });

  return { isLoadingGetAll, isErrorGetAll, data };
};
