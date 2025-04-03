import { getToday } from "../../../utils/constant";
import { supabase } from "../../../utils/supabase";

export const getBookingByDay = async (date) => {
  const { data, error } = await supabase
    .from("booking")
    .select("*, showtimes(*,movies(title, id))")
    .eq("status", "Succeeded")
    .gte("created_at", date)
    .lte("created_at", getToday({ end: true }))
    .order("created_at", {
      ascending: true,
    });

  if (error) {
    console.log(error.message);
    throw new Error("Something went wrong");
  }

  return data;
};
