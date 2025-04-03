import { supabase } from "../../../utils/supabase";

export const editSeatTypesApi = async (seat) => {
  const { data, error } = await supabase
    .from("seat_types")
    .update(seat)
    .eq("id", seat.id)
    .select();

  if (error) {
    throw new Error("Somethings wrong when update");
  }

  return data;
};
