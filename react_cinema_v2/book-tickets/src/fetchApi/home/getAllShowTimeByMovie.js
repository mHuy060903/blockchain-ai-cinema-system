import { supabase } from "../../../utils/supabase";

export const getAllShowTimeByMovieApi = async (movieId, dateSelected) => {
  const now = new Date();
  now.setMinutes(now.getMinutes() + 10);
  const time = `${now.getHours().toString().padStart(2, "0")}:${now
    .getMinutes()
    .toString()
    .padStart(2, "0")}:00`;

  const stringDateToday = `${now.getFullYear()}-${(now.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${now.getDate().toString().padStart(2, "0")}`;

  const isToday = stringDateToday === dateSelected;

  let query = supabase
    .from("showtimes")
    .select("*, movies(*), screens(cinemas(name,id,lat,lng), provinces(name, id))", {
      count: "exact",
    })
    .eq("movie_id", movieId)
    .eq("show_date", dateSelected);

  if (isToday) {
    query = query.gt("show_time_start", time);
  }

  let { data: showtimes, error, count } = await query;

  if (error) {
    console.log(error.message);
    throw new Error("Somethings wrong when get data");
  }
  const myMap = {};

  if (count === 0) {
    return { myMap, count };
  }

  const provinceIds = new Set();
  const cinemaIds = new Set();
  const screenIds = new Set();

  showtimes.forEach((showtime) => {
    provinceIds.add(showtime.screens.provinces.id);
    cinemaIds.add(showtime.screens.cinemas.id);
    screenIds.add(showtime.screen_id);
  });

  const arrayScreenIds = Array.from(screenIds);
  const arrayCinemaIds = Array.from(cinemaIds);
  const arrayProvince = Array.from(provinceIds);

  showtimes.map((showtime, index) => {
    if (myMap[showtime.screens.provinces.name]) {
      myMap[showtime.screens.provinces.name].push(showtime);
    } else {
      myMap[showtime.screens.provinces.name] = [];
      const arrayCopy = [...myMap[showtime.screens.provinces.name]];
      arrayCopy.push(showtime);
      myMap[showtime.screens.provinces.name] = arrayCopy;
    }
  });

  /*
   array = [
   {
   id:1,
   province: Binh Dinh
   cinema: [  {id: 15, name: CinemaBinhDinh, screens: [{name: P1, showtime: [{time}] } ] } ]
   }
   
   ]
   
   
   */

  // const array
  console.log(myMap);
  return { myMap, count };
};
