import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getTicketDetail } from "../../fetchApi/ticket/getTicketDetail";

export const useGetTicketDetail = () => {
  const { id } = useParams();

  const { isLoading, isError, data } = useQuery({
    queryFn: () => getTicketDetail(id),
    queryKey: ["ticket", id],
  });

  return { isLoading, isError, data };
};
