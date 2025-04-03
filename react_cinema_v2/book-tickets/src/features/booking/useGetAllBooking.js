import { useQuery } from "@tanstack/react-query";
import { getAllBooking } from "../../fetchApi/booking/getAllBooking";
import { useSearchParams } from "react-router-dom";

export const useGetAllBooking = () => {
  const [searchParams] = useSearchParams();

  const page = searchParams.get("page") ? Number(searchParams.get("page")) : 1;

  const sortByRaw = searchParams.get("sortBy") || "created_at-desc";
  const [field, direction] = sortByRaw.split("-");
  const sortBy = { field, direction };

  const { isLoading, isError, data } = useQuery({
    queryFn: () => getAllBooking({ page, sortBy }),
    queryKey: ["bookings", page, sortBy],
  });

  return { isLoading, isError, data };
};
