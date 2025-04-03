import { useMutation, useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { getAllMessageOfUserApi } from "../../fetchApi/message/getAllMessageOfUser";

export const useGetAllMessageOfUser = () => {
  const userId = useSelector((state) => state.auth.user.id);
  console.log(userId);
  const { isLoading, isError, data } = useQuery({
    queryFn: () => getAllMessageOfUserApi(userId),
    queryKey: ["message", userId],
  });

  return { isLoading, isError, data };
};
