import { useMutation } from "@tanstack/react-query";
import { paymentBlockChainApi } from "../../fetchApi/blockchain/paymentBlockChain";

export const usePaymentBlockChain = () => {
  const {
    isLoading,
    isError,
    mutate: handlePaymentBlockChain,
  } = useMutation({
    mutationFn: (booking) => paymentBlockChainApi(booking),
  });

  return { isLoading, isError, handlePaymentBlockChain };
};
