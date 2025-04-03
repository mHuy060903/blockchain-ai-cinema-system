import { useMutation } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { deletePayment } from "../../fetchApi/payment/deletePayment";

export const useDeletePayment = () => {
  const { id } = useParams();
  const {
    isLoading,
    isError,
    mutate: handleDeletePayment,
  } = useMutation({
    mutationFn: () => deletePayment(id),
  });

  return { isLoading, isError, handleDeletePayment };
};
