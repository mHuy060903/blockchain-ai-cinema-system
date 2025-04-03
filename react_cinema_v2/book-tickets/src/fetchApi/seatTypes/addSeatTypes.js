import { supabase } from "../../../utils/supabase";

export const addSeatTypesApi = async (seat) => {
  const { data, error } = await supabase
    .from("seat_types")
    .insert([seat])
    .select();

  if (error) {
    throw new Error("Somethings wrong when insert data");
  }

  return data;
};
