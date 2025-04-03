import { supabase } from "../../../utils/supabase";

export const deleteGerneApi = async (id) => {
  const { error } = await supabase.from("gernes").delete().eq("id", id);

  if (error) {
    throw new Error(error.message);
  }
};
