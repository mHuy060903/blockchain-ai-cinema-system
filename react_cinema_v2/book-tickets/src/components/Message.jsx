const Message = ({ isUser, text, image }) => {
  return (
    <div
      className={`flex items-center gap-1 ${
        isUser ? "justify-end" : "justify-start"
      } w-full `}
    >
      <div
        className={`w-10   rounded-full overflow-hidden ${isUser && "order-2"}`}
      >
        <img className="w-full h-full object-cover" src={image} />
      </div>
      <p
        className={`text-black bg-[#2f3431] ${
          isUser && "order-1 bg-green-700"
        } p-1 rounded-lg text-wrap w-full text-white/80 font-medium `}
      >
        {text}
      </p>
    </div>
  );
};

export default Message;
