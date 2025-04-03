import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";



const PieChartTopMovie = ({ bookings = [] }) => {
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  let arrayMovieMostOrder = []; //{title: '', value: 13}
  
  bookings.forEach((booking) => {
    const index = arrayMovieMostOrder.findIndex(
      (movie) => movie.title === booking.showtimes.movies.title
    );
    if (index > -1) {
      arrayMovieMostOrder.at(index).value += booking.seat_number.length;
    } else {
      arrayMovieMostOrder.push({
        title: booking.showtimes.movies.title,
        value: booking.seat_number.length,
      });
    }
  });
  arrayMovieMostOrder.sort((a, b) => a.value - b.value);

  arrayMovieMostOrder =
    arrayMovieMostOrder.length > 4
      ? arrayMovieMostOrder.splice(0, 4)
      : arrayMovieMostOrder;

  return (
    <div className="w-full bg-gray-800 rounded-lg flex items-start flex-col">
      <h1 className="text-2xl font-bold ml-4"> Percent of most order movie</h1>
      <ResponsiveContainer width="100%" height={350}>
        <PieChart>
          <Pie
            data={arrayMovieMostOrder}
            nameKey="title"
            dataKey="value"
            innerRadius={85}
            outerRadius={110}
            cx="40%"
            cy="50%"
            paddingAngle={3}
          >
            {arrayMovieMostOrder.map((entry, index) => (
              <Cell key={index} fill={COLORS[index]} stroke={COLORS[index]} />
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

export default PieChartTopMovie;
