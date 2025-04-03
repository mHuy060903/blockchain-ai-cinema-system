import { supabase } from "../../../utils/supabase";

export const addBookingApi = async (booking) => {
  const { data, error } = await supabase
    .from("booking")
    .insert([booking])
    .select()
    .single();

  if (error) {
    throw new Error("Somethings wrong when insert data");
  }

  let { data: showtimes, error: errorShowtime } = await supabase
    .from("showtimes")
    .select("*")
    .eq("id", booking.showtime_id)
    .single();

  if (errorShowtime) {
    throw new Error("Somethings wrong when get data showtime");
  }
  const new_status_seat = [];

  showtimes.status_seat.forEach((seat) => {
    if (booking.seat_number.includes(seat.name)) {
      new_status_seat.push({ ...seat, status: "booked" });
    } else {
      new_status_seat.push(seat);
    }
  });

  const { data: showtimeUpdate, error: errorUpdateSeat } = await supabase
    .from("showtimes")
    .update({ status_seat: new_status_seat })
    .eq("id", booking.showtime_id)
    .select();

  if (errorUpdateSeat) {
    throw new Error("Somethings wrong when update seat");
  }

  return data;
};
