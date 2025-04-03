import { useMutation } from "@tanstack/react-query";
import { postChat } from "../../fetchApi/chat/postChat";
export const usePostChat = () => {
  const { isLoading, isError, mutate: handleChat } = useMutation({
    mutationFn: postChat,
  });

  return {isLoading, isError, handleChat}
};
