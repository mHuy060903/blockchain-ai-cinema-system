import { supabase } from "../../../utils/supabase";

export const deleteSeatTypesApi = async (id) => {
  const { error } = await supabase.from("seat_types").delete().eq("id", id);

  if (error) {
    throw new Error("Somethings wrong when delete");
  }
};
