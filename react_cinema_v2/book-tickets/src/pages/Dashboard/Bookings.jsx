import { formatCurrency } from "../../../utils/constant";

import Loader from "../../components/Loader";
import Pagination from "../../components/Pagination";
import SortBy from "../../components/SortBy";
import { useGetAllBooking } from "../../features/booking/useGetAllBooking";

const Bookings = () => {
  const { isLoading, isError, data } = useGetAllBooking();

  return (
    <div className="text-white w-full flex flex-col gap-5 overflow-y-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">All Movies</h1>
        <SortBy
          options={[
            { value: "total_price-asc", label: "Sort by price (low first)" },
            { value: "total_price-desc", label: "Sort by price (high  first)" },
          ]}
        />
      </div>
      <div className="w-full">
        <table className="table-auto w-full">
          <thead>
            <tr className="bg-slate-600/40  rounded-lg text-left">
              <th className="py-3 font-medium">Email</th>
              <th className="py-3 font-medium">Movie</th>
              <th className="py-3 font-medium">Date</th>
              <th className="py-3 font-medium">Time</th>
              <th className="py-3 font-medium">Status</th>
              <th className="py-3 font-medium">Price</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={6} className="text-center py-10">
                  <Loader size={120} />
                </td>
              </tr>
            ) : (
              data?.data.map((booking) => (
                <tr key={booking.id}>
                  <td className="w-[50px] pr-2 py-3">
                    <p>{booking.users.email}</p>
                  </td>
                  <td>
                    <p>{booking.showtimes.movies.title}</p>
                  </td>
                  <td>
                    <p>{booking.showtimes.show_date}</p>
                  </td>
                  <td>
                    <p>
                      {booking.showtimes.show_time_start
                        .toString()
                        .slice(0, -3)}
                    </p>
                  </td>
                  <td>
                    <p
                      className={`${
                        booking.status === "Succeeded"
                          ? "bg-green-600 text-white"
                          : "bg-gray-600 text-white"
                      } inline-block p-2 rounded-lg font-semibold`}
                    >
                      {booking.status}
                    </p>
                  </td>
                  <td>
                    <p>{formatCurrency(booking.total_price)}</p>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <Pagination count={data?.count} />
      </div>
    </div>
  );
};

export default Bookings;
