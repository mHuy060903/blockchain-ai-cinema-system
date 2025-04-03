import Filter from "../../components/Filter";
import Loader from "../../components/Loader";
import PieCharts from "../../components/PieChart";
import PieChartTopMovie from "../../components/PieChartTopMovie";
import SalesChart from "../../components/SalesChart";
import Stats from "../../components/Stats";
import { useGetBookingByDate } from "../../features/DashboardHome/useGetBookingByDate";

const Dashboard = () => {
  const { isLoading, bookings } = useGetBookingByDate();
  console.log(bookings);
  return (
    <div className="text-white w-full flex flex-col gap-5 overflow-y-auto">
      <div className="flex justify-between items-center mt-2">
        <h1 className="text-xl font-semibold">Dashboard</h1>
        <Filter
          filterField="last"
          options={[
            {
              value: 7,
              label: "Last 7 days",
            },
            {
              value: 30,
              label: "Last 30 days",
            },
            {
              value: 90,
              label: "Last 90 days",
            },
          ]}
        />
      </div>
      {isLoading ? (
        <Loader size={50} color="white" />
      ) : (
        <>
          <Stats bookings={bookings} />
          <div className="flex  flex-col gap-3">
            <SalesChart bookings={bookings} />
            <div className="flex items-start w-full justify-between gap-4">
              <PieCharts dataSalesByMoive={bookings} />
              <PieChartTopMovie bookings={bookings} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
