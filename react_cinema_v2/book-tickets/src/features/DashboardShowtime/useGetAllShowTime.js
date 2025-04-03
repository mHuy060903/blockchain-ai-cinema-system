import { useQuery } from "@tanstack/react-query";
import { getAllShowTimeApi } from "../../fetchApi/showtimes/getAllShowTime";
import { useSearchParams } from "react-router-dom";

export const useGetAllShowTime = () => {
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
    queryFn: () => getAllShowTimeApi({ page, sortBy }),
    queryKey: ["showtimes", page, sortBy],
  });
  return { isLoadingGetAll, isErrorGetAll, data };
};
