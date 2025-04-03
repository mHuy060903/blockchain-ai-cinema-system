import { useMutation } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { paymentSuccess } from "../../fetchApi/payment/paymentSuccess";

export const usePaymentSuccess = () => {
  const { id } = useParams();

  const {
    isLoading,
    isError,
    mutate: handlePaymentSuccess,
  } = useMutation({
    mutationFn: () => paymentSuccess(id),
  });

  return { isLoading, isError, handlePaymentSuccess };
};
