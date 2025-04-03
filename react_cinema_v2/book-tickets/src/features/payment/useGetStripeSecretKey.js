import { useQuery } from "@tanstack/react-query";
import { getStripeSecretKey } from "../../fetchApi/payment/getStripeSecretKey";

export const useGetStripeSecretKey = () => {
  const { isLoading, isError, data } = useQuery({
    queryFn: getStripeSecretKey,
    queryKey: ["stripeKey"],
  });

  return { isLoading, isError, data };
};
