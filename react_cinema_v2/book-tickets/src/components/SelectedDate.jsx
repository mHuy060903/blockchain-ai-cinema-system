import { useSearchParams } from "react-router-dom";
import { daysOfWeek } from "../../utils/constant";

const SelectedDate = ({ stringDate }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const date = new Date(stringDate);
  const day = daysOfWeek[date.getDay()];
  const month = date.getMonth() + 1;
  const dateNum = date.getDate().toString().padStart(2, "0");

  const dateSearch = searchParams.get("date");

  const isSelected =
    dateSearch ===
    `${date.getFullYear()}-${month.toString().padStart(2, "0")}-${dateNum}`;

  const handleClickDateShowtime = () => {
    searchParams.set(
      "date",
      `${date.getFullYear()}-${month.toString().padStart(2, "0")}-${dateNum}`
    );
    setSearchParams(searchParams);
  };

  return (
    <div
      onClick={handleClickDateShowtime}
      className={`flex items-center gap-3 p-2 ${
        isSelected ? "border-black" : "border-white"
      }  border-2 cursor-pointer hover:border-black`}
    >
      <div className="flex flex-col gap-1 text-gray-600">
        <span>{month.toString().padStart(2, "0")}</span>
        <span>{day}</span>
      </div>
      <h1 className="text-2xl text-gray-600 font-semibold">{dateNum}</h1>
    </div>
  );
};

export default SelectedDate;
