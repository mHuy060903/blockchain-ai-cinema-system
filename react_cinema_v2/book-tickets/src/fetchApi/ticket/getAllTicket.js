import { supabase } from "../../../utils/supabase";

export const getAllTicket = async (userId) => {
  if (!userId) {
    return [];
  }
  let { data: tickets, error } = await supabase
    .from("tickets")
    .select(
      "*, booking!inner(user_id, showtimes(movies(title), show_time_start, show_date, screens(name, cinemas(name))), seat_number)"
    )
    .eq("booking.user_id", userId);

  if (error) {
    throw new Error("Some things went wrong");
  }

  return tickets;
};
