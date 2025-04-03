/* eslint-disable react/prop-types */
const NavbarItemChatDashBoard = ({
  isSelected,
  user,
  lastMessage,
  onClickSelectedChat,
}) => {
  return (
    <div
      onClick={() => {
        onClickSelectedChat(user.id);
      }}
      className={`flex items-center gap-2 overflow-hidden w-48  p-1 px-4 ${
        isSelected && "bg-green-800"
      } `}
    >
      <div className="w-10 h-10 rounded-full overflow-hidden">
        <img src={user.image} className="w-full h-full" />
      </div>
      <div className="flex flex-col overflow-hidden flex-1">
        <h3 className="font-semibold text-lg ">{user.email}</h3>
        <span className="text-nowrap text-sm text-gray-400 font-medium">
          {lastMessage.message}
        </span>
      </div>
    </div>
  );
};

export default NavbarItemChatDashBoard;
