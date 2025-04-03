import axios from "axios";

export const postChat = async (message) => {
  const respose = await axios.post("http://localhost:4242/ai/chat", {
    message,
  });
  const data = respose.data;

  return data;
};
