import { useMutation } from "@tanstack/react-query";
import { updatedUsedTicket } from "../../fetchApi/ticket/updatedUsedTicket";

export const useUpdatedUsedTicket = () => {
  const {
    isLoading,
    isError,
    mutate: handleUpdateUsedTicket,
  } = useMutation({
    mutationFn: updatedUsedTicket,
  });
  return { isLoading, isError, handleUpdateUsedTicket };
};
