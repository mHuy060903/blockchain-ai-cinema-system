import { supabase } from "../../../utils/supabase";

export const updatedUsedTicket = async (qr_code) => {
  let { data: tickets, error } = await supabase
    .from("tickets")
    .select(
      "*, booking(showtimes(movies(title), show_time_start, show_date, screens(name, cinemas(name))), seat_number)"
    )
    .eq("qr_code", qr_code)
    .single();

  if (error) {
    console.log(error.message);
    throw new Error("Something went wrong select");
  }

  if (!tickets.is_used) {
    const { data, error: errorUpdate } = await supabase
      .from("tickets")
      .update({ is_used: true })
      .eq("qr_code", qr_code)
      .select();

    if (errorUpdate) {
      throw new Error("Something went wrong update");
    }
    return {
      message: `Vé vào hợp lệ movie: ${
        tickets.booking.showtimes.movies.title
      }, date: ${tickets.booking.showtimes.show_date},
      start: ${tickets.booking.showtimes.show_time_start},
      cinema: ${tickets.booking.showtimes.screens.cinemas.name}
      seats: ${tickets.booking.seat_number.join(", ")}`,
    };
  }

  return { message: "Vé đã được sử dụng" };
};
