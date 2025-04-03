import { toast } from "react-toastify";
import { supabase } from "../../../utils/supabase";

export const addShowTimeApi = async (showtime) => {
  let { data: showtimes, error } = await supabase
    .from("showtimes")
    .select("*")
    .eq("show_date", showtime.show_date)
    .eq("screen_id", showtime.screen_id);

  if (error) {
    throw new Error("Somethings wrong went get showtimes");
  }

  let checkTime = [];
  if (showtimes.length > 0) {
    const dateShowtimeStart = new Date(
      `${showtime.show_date} ${showtime.show_time_start}`
    ).getTime();
    const dateShowtimeEnd = new Date(
      `${showtime.date_end} ${showtime.show_time_end}`
    ).getTime();

    checkTime = showtimes.filter((showtimeMap) => {
      const startTime = new Date(
        `${showtimeMap.show_date} ${showtimeMap.show_time_start}`
      ).getTime();
      const endTime = new Date(
        `${showtimeMap.date_end} ${showtimeMap.show_time_end}`
      ).getTime();

      return dateShowtimeStart < endTime && dateShowtimeEnd > startTime;
    });
  }

  if (checkTime.length > 0) {
    toast.error("Trùng lịch chiếu phim");
    throw new Error("Time start and end is overlap");
  }

  const { data: dataInsert, error: errorInsert } = await supabase
    .from("showtimes")
    .insert([showtime])
    .select();

  if (errorInsert) {
    console.log(errorInsert.message);
    throw new Error("Something wrong when insert showtime");
  }

  return dataInsert;
};
