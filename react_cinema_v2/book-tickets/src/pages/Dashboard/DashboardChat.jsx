import Message from "../../components/Message";
import { IoMdSend } from "react-icons/io";
import NavbarItemChatDashBoard from "../../components/NavbarItemChatDashBoard";
import { useEffect, useRef, useState } from "react";
import { supabase } from "../../../utils/supabase";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { findMessageOfUser } from "../../fetchApi/message/findMessageOfUser";
const DashboardChat = () => {
  const [dataMessages, setDataMessages] = useState({
    data: [],
    idGroup: 0,
    chat: [],
  });
  const messagesEndRef = useRef(null);

  const { register, handleSubmit, reset } = useForm();

  const userId = useSelector((state) => state.auth?.user?.id);
  const getInitialMessages = async () => {
    let { data: message, error } = await supabase
      .from("message")
      .select(
        `*,   group_user:users!group_id (email, image, role), 
      sender_user:users!user_id_send (email, image, role)`
      )
      .eq("group_user.role", "user");

    if (error) {
      console.log(error.message);
      throw new Error("Somethings went wrong");
    }

    const arrayResult = []; //{ idGroup: 1,user: {image, name} , message: []}

    message.forEach((mess) => {
      if (mess.group_user) {
        const index = arrayResult.findIndex(
          (cur) => cur.idGroup === mess.group_id
        );
        if (index >= 0) {
          arrayResult[index].messages.push(mess);
        } else {
          arrayResult.push({
            idGroup: mess.group_id,
            user: { ...mess.group_user },
            messages: [mess],
          });
        }
      }
    });
    console.log(arrayResult);
    setDataMessages((prev) => ({ ...prev, data: arrayResult }));
  };

  const getMessagesAndSubscribe = async () => {
    await getInitialMessages();
    const message = supabase
      .channel("custom-all-channel")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "message" },
        async (payload) => {
          const data = await findMessageOfUser(payload.new.id);

          setDataMessages((prevDataMessages) => {
            const dataMessageCopy = { ...prevDataMessages };

            const index = dataMessageCopy.data.findIndex(
              (cur) => cur.idGroup === data.group_id
            );

            if (index === -1) {
              dataMessageCopy.data.push({
                idGroup: data.group_id,
                user: { ...data.group_user },
                messages: [data],
              });
              return { ...prevDataMessages, data: dataMessageCopy.data };
            }

            const indexMess = dataMessageCopy.data[index].messages.findIndex(
              (cur) => cur.id === data.id
            );
            if (indexMess === -1) {
              dataMessageCopy.data[index].messages.push(data);
            }

            return { ...prevDataMessages, data: dataMessageCopy.data };
          });

          // console.log(dataMessageCopy);
          // // const findIndex = dataMessages.findIndex(cur => cur.idGroup === idGroupSelected)

          // const index = dataMessageCopy.findIndex(
          //   (cur) => cur.idGroup === idGroupSelected
          // );
          // console.log(index);
          // dataMessageCopy[index].messages.push(data);
          // setDataMessages(dataMessageCopy);
          // setChat(dataMessageCopy[index].messages);
        }
      )
      .subscribe();
  };

  const onClickSelectedChat = (id) => {
    setDataMessages((prev) => {
      const dataCopy = { ...prev };

      const index = dataCopy.data.findIndex((cur) => cur.idGroup === id);

      if (index >= 0) {
        dataCopy.idGroup = id;
        dataCopy.chat = dataCopy.data[index].messages;
      } else {
        dataCopy.chat = []; // Đảm bảo rằng chat luôn là mảng
      }

      return dataCopy;
    });
  };

  useEffect(() => {
    const initialize = async () => {
      await getMessagesAndSubscribe();
    };
    initialize();
  }, []);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    scrollToBottom();
  }, [dataMessages]);
  const onSubmitChat = async (data) => {
    const { data: message, error } = await supabase
      .from("message")
      .insert([
        {
          group_id: dataMessages.idGroup,
          user_id_send: userId,
          message: data.message,
        },
      ])
      .select();
    reset();
  };

  return (
    <div className="text-white w-full flex flex-col gap-5 h-full ">
      <div className="flex items-start justify-start h-full ">
        <div className=" h-full  bg-[#262626] ">
          <div className="flex flex-col h-full overflow-auto">
            {dataMessages.data.length === 0 ? (
              <h1>Nobody chat</h1>
            ) : (
              dataMessages.data.map((cur) => (
                <NavbarItemChatDashBoard
                  onClickSelectedChat={onClickSelectedChat}
                  key={cur.idGroup}
                  user={{ ...cur.user, id: cur.idGroup }}
                  lastMessage={cur.messages[cur.messages.length - 1]}
                  isSelected={dataMessages.idGroup === cur.idGroup}
                />
              ))
            )}
          </div>
        </div>
        <div className=" flex-1 h-full flex flex-col justify-between gap-3 bg-[#313a34]">
          <div className="flex flex-col gap-1 overflow-y-auto flex-1 p-2 ">
            {!dataMessages.idGroup ? (
              <h1>Selected one user to chat</h1>
            ) : (
              dataMessages.data[
                dataMessages.data.findIndex(
                  (cur) => cur.idGroup === dataMessages.idGroup
                )
              ].messages.map((cur) => (
                <Message
                  key={cur.id}
                  isUser={cur.user_id_send === userId}
                  text={cur.message}
                  image={cur.sender_user.image}
                />
              ))
            )}
            {/* <Message isUser={true} />
            <Message isUser={false} />
            <Message isUser={false} /> */}
            <div ref={messagesEndRef} />
          </div>
          <form
            onSubmit={handleSubmit(onSubmitChat)}
            className="w-full flex items-center bg-[#2f3431] justify-start"
          >
            <input
              {...register("message", { required: true })}
              placeholder="Enter message"
              className="flex-1 bg-[#2f3431] outline-none px-4 py-1"
            />
            <button type="submit" className="p-2 bg-green-500 rounded-lg">
              <IoMdSend color="white" size={30} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DashboardChat;
