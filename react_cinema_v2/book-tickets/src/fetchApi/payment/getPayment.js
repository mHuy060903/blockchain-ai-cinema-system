import { supabase } from "../../../utils/supabase";

export const getPaymentApi = async (id) => {
  let { data: booking, error } = await supabase
    .from("booking")
    .select(
      "*, showtimes(movies(title, image), screens(cinemas(name)), show_date, show_time_start)"
    )
    .eq("id", id)
    .single();

  if (error) {
    console.log(error.message);
    throw new Error("Could not find booking or somethings went wrong");
  }

  return booking;
};
