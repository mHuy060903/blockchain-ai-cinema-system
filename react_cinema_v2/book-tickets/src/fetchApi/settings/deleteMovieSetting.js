import { supabase } from "../../../utils/supabase";
export const deleteMovieSetting = async (id) => {
  const { error } = await supabase
    .from("featured_movies")
    .delete()
    .eq("id", id);

  if (error) {
    throw new Error("Somethings wrong went delete");
  }
};
