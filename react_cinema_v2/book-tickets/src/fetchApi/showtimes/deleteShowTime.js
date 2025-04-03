import { supabase } from "../../../utils/supabase";

export const deleteShowTimeApi = async (id) => {
  const { error } = await supabase.from("showtimes").delete().eq("id", id);

  if (error) {
    throw new Error("Somethings wrong when delete");
  }
};
