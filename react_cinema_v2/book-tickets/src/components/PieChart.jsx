import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
} from "recharts";

const PieCharts = ({ dataSalesByMoive = [] }) => {
  const numChairUserOrder = [
    { label: "1-2 seats", value: 0, color: "#7e22ce" },
    { label: "3-5 seats", value: 0, color: "#1d4ed8" },
    { label: "5-7 seats", value: 0, color: "#0f766e" },
    { label: "8-10 seats", value: 0, color: "#d7cb10" },
  ];

  dataSalesByMoive.forEach((booking) => {
    if (booking.seat_number.length <= 2) {
      numChairUserOrder.at(0).value += 1;
    } else if (
      booking.seat_number.length <= 5 &&
      booking.seat_number.length > 2
    ) {
      numChairUserOrder.at(1).value += 1;
    } else if (
      booking.seat_number.length <= 7 &&
      booking.seat_number.length > 5
    ) {
      numChairUserOrder.at(2).value += 1;
    } else {
      numChairUserOrder.at(3).value += 1;
    }
  });

  return (
    <div className="w-full bg-gray-800 rounded-lg flex items-start flex-col">
      <h1 className="text-2xl font-bold ml-4"> Percent of seat order</h1>
      <ResponsiveContainer width="100%" height={350}>
        <PieChart>
          <Pie
            data={numChairUserOrder}
            nameKey="label"
            dataKey="value"
            innerRadius={85}
            outerRadius={110}
            cx="40%"
            cy="50%"
            paddingAngle={3}
          >
            {numChairUserOrder.map((entry, index) => (
              <Cell key={index} fill={entry.color} stroke={entry.color} />
            ))}
          </Pie>
          <Tooltip />
          <Legend
            verticalAlign="middle"
            align="right"
            width="30%"
            layout="vertical"
            iconSize={15}
            iconType="circle"
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PieCharts;
