import { supabase } from "../../../utils/supabase";
export const deletePayment = async (id) => {
  let { data: booking, error } = await supabase
    .from("booking")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    throw new Error("Somethings went wrong");
  }

  let { data: showtimes, error: errorShowtimes } = await supabase
    .from("showtimes")
    .select("*")
    .eq("id", booking.showtime_id)
    .single();

  if (errorShowtimes) {
    throw new Error("Somethings went wrong");
  }
  const newStatusSeat = showtimes.status_seat.map((seat) => {
    if (booking.seat_number.includes(seat.name)) {
      return { ...seat, status: "available" };
    }
    return seat;
  });

  const { data, error: errorUpdate } = await supabase
    .from("showtimes")
    .update({ status_seat: newStatusSeat })
    .eq("id", booking.showtime_id)
    .select();

  if (errorUpdate) {
    throw new Error("Somethings went wrong");
  }

  const { error: errorDeleteBooking } = await supabase
    .from("booking")
    .delete()
    .eq("id", id);

  if (errorDeleteBooking) {
    throw new Error("Somethings went wrong");
  }
};
