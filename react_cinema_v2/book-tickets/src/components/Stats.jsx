import { HiOutlineBriefcase } from "react-icons/hi2";
import { GiCash } from "react-icons/gi";
import Stat from "./Stat";
import { formatCurrency } from "../../utils/constant";

const Stats = ({ bookings }) => {
  const numBookings = bookings?.length;

  // 2.
  const sales = bookings?.reduce((acc, cur) => acc + cur.total_price, 0);



  return (
    <div className="grid grid-cols-4 gap-5">
      <Stat
        title="Bookings"
        color="blue"
        icon={<HiOutlineBriefcase size={24} />}
        value={numBookings}
      />
      <Stat
        title="Sales"
        color="green"
        icon={<GiCash size={24} />}
        value={`${formatCurrency(sales)} vnđ`}
      />
    </div>
  );
};

export default Stats;
