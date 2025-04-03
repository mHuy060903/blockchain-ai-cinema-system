import { supabase } from "../../../utils/supabase";

export const deleteScreenApi = async (id) => {
  const { error } = await supabase.from("screens").delete().eq("id", id);

  if (error) {
    throw new Error("Something wrong went delete");
  }
};
