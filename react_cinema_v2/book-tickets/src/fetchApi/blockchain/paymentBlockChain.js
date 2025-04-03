import { generateRandomString } from "../../../utils/generateToken";
import { supabase } from "../../../utils/supabase";

export const paymentBlockChainApi = async (booking) => {
  const now = new Date();
  const { data, error } = await supabase
    .from("booking")
    .insert([booking])
    .select()
    .single();

  if (error) {
    console.log(error.message);
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

  const { data: dataBooking, error: errorBooking } = await supabase
    .from("booking")
    .update({ status: "Succeeded", booking_time: now })
    .eq("id", data.id)
    .select("*,users(email)")
    .single();

  if (errorBooking) {
    throw new Error("Something went wrong");
  }

  const ticket = { booking_id: data.id, qr_code: generateRandomString(12) };

  const { data: dataTicket, error: errorTicket } = await supabase
    .from("tickets")
    .insert([ticket])
    .select()
    .single();

  if (errorTicket) {
    throw new Error("Something went wrong");
  }

  return dataTicket;
};
