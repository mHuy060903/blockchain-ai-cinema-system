import { supabase } from "../../../utils/supabase";

export const editScreenApi = async (screen) => {
  const { data, error } = await supabase
    .from("screens")
    .update(screen)
    .eq("id", screen.id)
    .select();

  if (error) {
    throw new Error("Somethings wrong when update screen");
  }

  return data;
};
