import { RiArmchairFill } from "react-icons/ri";

const Chair = ({
  name,
  color,
  isEmptyChair,
  isStatus,
  handleToggleSelected,
  isSelected,
}) => {
  return (
    <button
      disabled={isStatus !== "available"}
      onClick={() => handleToggleSelected(name)}
      className={`${
        isStatus !== "available" && "cursor-not-allowed"
      } relative cursor-pointer ${isEmptyChair ? "invisible" : ""}`}
    >
      <RiArmchairFill
        className="opacity-80 "
        size={32}
        style={{
          color: isSelected
            ? "blue"
            : isStatus === "available"
            ? color
            : "gray",
        }}
      />
      <span className="text-black font-medium absolute text-[10px] left-[50%] top-[30%] -translate-x-[50%] -translate-y-[50%]">
        {name}
      </span>
    </button>
  );
};

export default Chair;
