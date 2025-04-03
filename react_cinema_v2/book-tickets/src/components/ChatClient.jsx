import { useForm } from "react-hook-form";
import Message from "./Message";
import { GiCancel } from "react-icons/gi";
import { IoMdSend } from "react-icons/io";
// import { useGetAllMessageOfUser } from "../features/message/useGetAllMessageOfUser";
import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { supabase } from "../../utils/supabase";
import { findMessageOfUser } from "../fetchApi/message/findMessageOfUser";

const ChatClient = ({ toggleOpenChat }) => {
  const { handleSubmit, register, reset } = useForm();
  //   const { isLoading, data } = useGetAllMessageOfUser();
  const [dataMessage, setDataMessage] = useState([]);
  const userId = useSelector((state) => state.auth?.user?.id);
  const messagesEndRef = useRef(null);

  const getInitialMessages = async (userId) => {
    if (!userId) {
      return [];
    }

    let { data: message, error } = await supabase
      .from("message")
      .select(
        `*,   group_user:users!group_id (email, image, role), 
          sender_user:users!user_id_send (email, image, role)`
      )
      .eq("group_id", userId);

    if (error) {
      console.log(error.message);
      throw new Error("Somethings went wrong");
    }

    setDataMessage(message);
  };

  const getMessagesAndSubscribe = async () => {
    getInitialMessages(userId);
    const message = supabase
      .channel("custom-all-channel")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "message" },
        async (payload) => {
          const data = await findMessageOfUser(payload.new.id);
          if (data.group_id === userId) {
            setDataMessage((prev) => {
              scrollToBottom();
              return [...prev, data];
            });
          }
        }
      )
      .subscribe();
  };
  useEffect(() => {
    getMessagesAndSubscribe();
  }, []);
  useEffect(() => {
    scrollToBottom();
  }, [dataMessage]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const onSubmitChat = async (data) => {
    const { data: message, error } = await supabase
      .from("message")
      .insert([
        { group_id: userId, user_id_send: userId, message: data.message },
      ])
      .select();
    scrollToBottom();
    reset();
  };

  return (
    <div className="fixed bottom-0 h-80 w-80 overflow-y-auto right-6 flex flex-col z-20 rounded-lg">
      <div className="w-full bg-orange-400 text-right p-2">
        <GiCancel
          onClick={() => {
            toggleOpenChat();
            reset();
          }}
          className="text-red-600 cursor-pointer"
          size={24}
        />
      </div>

      <div className="overflow-y-auto flex-1 flex flex-col bg-slate-200 p-2 gap-3">
        {dataMessage?.length !== 0 ? (
          dataMessage?.map((message, index) => {
            if (index < dataMessage.length - 1) {
              return (
                <Message
                  key={message.id}
                  isUser={message.user_id_send === userId}
                  text={message.message}
                  image={message.sender_user.image}
                />
              );
            }
            return (
              <>
                <Message
                  key={message.id}
                  isUser={message.user_id_send === userId}
                  text={message.message}
                  image={message.sender_user.image}
                />
                <div ref={messagesEndRef} />
              </>
            );
          })
        ) : (
          <h1>No meesage</h1>
        )}
      </div>

      <form
        onSubmit={handleSubmit(onSubmitChat)}
        className="w-full  px-1 py-2 bg-orange-400"
      >
        <div className="bg-white flex gap-1 rounded-lg overflow-hidden mx-3">
          <input
            placeholder="Enter your message"
            className="flex-1 px-2 py-1 outline-none"
            {...register("message", { required: true })}
          />
          <button type="submit">
            <IoMdSend color="blue" size={18} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatClient;
