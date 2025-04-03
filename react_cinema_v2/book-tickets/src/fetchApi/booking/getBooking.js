import { supabase } from "../../../utils/supabase";

export const getBookingApi = async (id) => {
  const arrSeat = [];
  const fiveMinutesAgo = new Date(
    new Date().getTime() - 5 * 60 * 1000
  ).toISOString();

  const { data: deletedBookings, error: fetchError } = await supabase
    .from("booking")
    .select("*")
    .lt("booking_time", fiveMinutesAgo)
    .eq("status", "Incomplete");

  if (fetchError) {
    console.error("Error fetching data:", fetchError);
  } else {
    deletedBookings.forEach((cur) => {
      arrSeat.push(...cur.seat_number);
    });

    const { error: deleteError } = await supabase
      .from("booking")
      .delete()
      .lt("booking_time", fiveMinutesAgo)
      .eq("status", "Incomplete");

    if (deleteError) {
      console.error("Error deleting data:", deleteError.message);
    } else {
      console.log("Deleted bookings:", deletedBookings.message);
    }
  }

  let { data: showtimes, error } = await supabase
    .from("showtimes")
    .select("*, screens(*,cinemas(name)), movies(*)")
    .eq("id", id)
    .single();

  if (error) {
    throw new Error("Somethings wrong went get data showtime");
  }
  const new_status_seat = [];
  showtimes.status_seat.forEach((cur) => {
    if (arrSeat.includes(cur.name)) {
      new_status_seat.push({ ...cur, status: "available" });
    } else {
      new_status_seat.push(cur);
    }
  });

  const { data: showtimeUpdate, error: errorUpdate } = await supabase
    .from("showtimes")
    .update({ status_seat: new_status_seat })
    .eq("id", id)
    .select("*, screens(*)")
    .single();

  if (errorUpdate) {
    throw new Error("Something wrong went update showtime update");
  }

  let { data: seat_types, error: errorSeatTypes } = await supabase
    .from("seat_types")
    .select("*");

  if (errorSeatTypes) {
    throw new Error("Somethings wrong wen get data seat types");
  }

  const num = showtimeUpdate.status_seat.reduce((acc, cur) => {
    if (cur.status === "available") {
      acc += 1;
    }
    return acc;
  }, 0);

  return {
    showtimes: {
      ...showtimes,
      status_seat: showtimeUpdate.status_seat,
      num: `${num}/${showtimeUpdate.status_seat.length}`,
    },
    seat_types,
  };
};
