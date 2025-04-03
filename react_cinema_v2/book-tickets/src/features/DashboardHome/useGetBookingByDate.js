import { useSearchParams } from "react-router-dom";
import { subDays } from "date-fns";
import { getBookingByDay } from "../../fetchApi/DashboardHome/getBookingByDay";
import { useQuery } from "@tanstack/react-query";
export const useGetBookingByDate = () => {
  const [searchParams] = useSearchParams();

  const numDays = !searchParams.get("last")
    ? 7
    : Number(searchParams.get("last"));

  const queryDate = subDays(new Date(), numDays).toISOString();

  const { data: bookings, isLoading } = useQuery({
    queryFn: () => getBookingByDay(queryDate),
    queryKey: ["bookingsHome", numDays],
  });

  return { bookings, isLoading };
};
