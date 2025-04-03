import { useState } from "react";
import { RiArmchairFill } from "react-icons/ri";

const ChairScreen = () => {
  const [isSelected, setIsSelectted] = useState(false);

  return <RiArmchairFill size={26} color="white" />;
};

export default ChairScreen;
