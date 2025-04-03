import { useQuery } from "@tanstack/react-query";
import { getBookingApi } from "../../fetchApi/booking/getBooking";
import { useParams } from "react-router-dom";

export const useGetBooking = () => {
  const { id } = useParams();

  const { isLoading, isError, data } = useQuery({
    queryFn: () => getBookingApi(id),
    queryKey: ["booking", id],
  });

  return { isLoading, isError, data };
};
