import { useEffect, useRef, useState } from "react";
import { FaArrowUp } from "react-icons/fa";
import { toast } from "react-toastify";
import AIChat from "../components/AIChat";
import { usePostChat } from "../features/chat/usePostChat";

const AIAssitant = () => {
  const inputRef = useRef();
  const [chat, setChat] = useState([]);
  const { isLoading, isError, handleChat } = usePostChat();
  const chatRef = useRef(null);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputRef.current || !inputRef.current.value.trim()) {
      toast.error("Please enter a message");
      return;
    }

    const userMessage = inputRef.current.value;
    setChat((data) => [...data, { isUser: true, message: userMessage }]);

    handleChat(userMessage, {
      onSuccess: (dataSuccess) => {
        const message = dataSuccess.reply;

        // Kiểm tra nếu tin nhắn có link phim
        const urlRegex = /(http:\/\/localhost:5173\/category\/movie\/\d+)/g;
        const links = message.match(urlRegex);

        // Nếu có link, thay thế thành HTML <a>
        let formattedMessage = message;
        if (links) {
          links.forEach((link) => {
            formattedMessage = formattedMessage.replace(
              link,
              `<a href="${link}" target="_blank" class="text-blue-500 underline">${link}</a>`
            );
          });
        }

        setChat((data) => [
          ...data,
          { isUser: false, message: formattedMessage, isHTML: true },
        ]);
      },
    });

    inputRef.current.value = "";
  };

  useEffect(() => {
    chatRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);
  return (
    <div className="bg-white my-8 flex flex-col rounded-lg  gap-2 h-[100vh]">
      <div className="flex-1 px-4 flex flex-col w-full overflow-x-auto py-2 gap-3">
        {chat.map((chatItem, index) => (
          <AIChat
            key={index}
            isUser={chatItem.isUser}
            text={chatItem.message}
            isHTML={chatItem.isHTML}
          />
        ))}
        <div ref={chatRef} />
      </div>
      <div>
        <form
          onSubmit={handleSubmit}
          className="w-full flex items-center px-4 py-2"
        >
          <input
            ref={inputRef}
            className="flex-1 px-1 border-none outline-none "
            placeholder="Ask anything"
          />
          <button type="submit" className={`py-2 px-2 rounded-full bg-black `}>
            <FaArrowUp size={22} color="white" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default AIAssitant;
