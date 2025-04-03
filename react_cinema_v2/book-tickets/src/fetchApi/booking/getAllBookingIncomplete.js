import { supabase } from "../../../utils/supabase";

export const getAllBookingIncomplete = async (userId) => {
  const fiveMinutesAgo = new Date(
    new Date().getTime() - 5 * 60 * 1000
  ).toISOString();

  const {
    data: deletedBookings,
    error: fetchError,
    count,
  } = await supabase
    .from("booking")
    .select("*", { count: "exact" })
    .lt("booking_time", fiveMinutesAgo)
    .eq("status", "Incomplete")
    .eq("user_id", userId)
    .order("created_at", {
      ascending: false,
    });

  if (fetchError) {
    throw new Error("Somethings went wrong");
  }

  return { deletedBookings, count };
};
