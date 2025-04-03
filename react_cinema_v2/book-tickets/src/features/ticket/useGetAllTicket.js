import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { getAllTicket } from "../../fetchApi/ticket/getAllTicket";

export const useGetAllTicket = () => {
  const userId = useSelector((state) => state.auth.user?.id);

  const { isLoading, isError, data } = useQuery({
    queryFn: () => getAllTicket(userId),
    queryKey: ["tickets"],
  });

  return { isLoading, isError, data };
};
