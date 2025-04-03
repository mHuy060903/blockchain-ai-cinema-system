import Chatgpt from "../assets/images/chatgpt.jpg";

const AIChat = ({ isUser, text, isHTML }) => {
  if (isUser) {
    return (
      <div className="w-full flex justify-end">
        <p className="py-2.5 px-5 bg-[#e8e8e880] rounded-3xl">{text}</p>
      </div>
    );
  }

  return (
    <div className="w-full flex items-start gap-2">
      <img src={Chatgpt} width={20} height={20} />
      {isHTML ? (
        <p
          className="py-2.5 px-5 bg-[#ed884080] rounded-lg"
          dangerouslySetInnerHTML={{ __html: text }}
        ></p>
      ) : (
        <p className="py-2.5 px-5 bg-[#ed884080] rounded-lg">{text}</p>
      )}
    </div>
  );
};

export default AIChat;
