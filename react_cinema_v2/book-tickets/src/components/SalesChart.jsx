/* eslint-disable react/prop-types */
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const SalesChart = ({ bookings = [] }) => {
  const data = []; // {date: 23-04-2024, price: 20000}

  bookings.forEach((cur) => {
    const index = data.findIndex((book) => book.date === cur.date);
    if (index >= 0) {
      data[index].price += cur.total_price;
    } else {
      data.push({ date: cur.date, price: cur.total_price });
    }
  });
  console.log(data);

  return (
    <div className="flex flex-col bg-gray-800 rounded-lg gap-4 w-full">
      <h1 className="ml-4 font-bold text-2xl">Sales</h1>
      <ResponsiveContainer width="100%" height={300} className="">
        <AreaChart
          width={600}
          height={300}
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis className="" dataKey="date" tick={{ fill: "white" }} />
          <YAxis tick={{ fill: "white" }} />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="price"
            stroke="#7135dc"
            fill="#3506da"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalesChart;
