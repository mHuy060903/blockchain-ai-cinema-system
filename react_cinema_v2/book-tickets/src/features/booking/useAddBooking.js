import { useMutation } from "@tanstack/react-query";
import { addBookingApi } from "../../fetchApi/booking/addBooking";

export const useAddBooking = () => {
  const {
    isLoading: isLoadingAdd,
    isError: isErrorAdd,
    mutate: handleAddBooking,
  } = useMutation({
    mutationFn: addBookingApi,
  });

  return { isLoadingAdd, isErrorAdd, handleAddBooking };
};
