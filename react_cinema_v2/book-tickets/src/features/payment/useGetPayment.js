import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getPaymentApi } from "../../fetchApi/payment/getPayment";

export const useGetPayment = () => {
  const { id } = useParams();

  const { isLoading, isError, data } = useQuery({
    queryFn: () => getPaymentApi(id),
    queryKey: ["payment", id],
  });

  return { isLoading, isError, data };
};
