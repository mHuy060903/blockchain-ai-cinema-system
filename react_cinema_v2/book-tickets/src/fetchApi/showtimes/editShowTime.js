import { supabase } from "../../../utils/supabase";
export const editShowTimeApi = async (showtime) => {
  let { data: showtimes, error } = await supabase
    .from("showtimes")
    .select("*")
    .eq("show_date", showtime.show_date)
    .eq("screen_id", showtime.screen_id)
    .neq("id", showtime.id);
  if (error) {
    throw new Error("Somethings wrong went get showtimes");
  }

  let checkTime = [];
  if (showtimes.length > 0) {
    const dateShowtimeStart = new Date(
      `${showtime.show_date} ${showtime.show_time_start}`
    ).getTime();
    const dateShowtimeEnd = new Date(
      `${showtime.show_date} ${showtime.show_time_end}`
    ).getTime();

    console.log("DateShowStartEnd", dateShowtimeStart, dateShowtimeEnd);
    checkTime = showtimes.filter((showtimeMap) => {
      const startTime = new Date(
        `${showtimeMap.show_date} ${showtimeMap.show_time_start}`
      ).getTime();
      const endTime = new Date(
        `${showtimeMap.show_date} ${showtimeMap.show_time_end}`
      ).getTime();

      return dateShowtimeStart < endTime && dateShowtimeEnd > startTime;
    });
  }

  if (checkTime.length > 0) {
    throw new Error("Time start and end is overlap");
  }

  const { data, error: errorUpdate } = await supabase
    .from("showtimes")
    .update(showtime)
    .eq("id", showtime.id)
    .select();

  if (errorUpdate) {
    throw new Error("Somethings wrong when update showtime");
  }

  return data;
};
