import { supabase } from "../../../utils/supabase";

export const deleteCinemaApi = async (id) => {
  const { error } = await supabase.from("cinemas").delete().eq("id", id);

  if (error) {
    console.log(error.message);
    throw new Error("Some thing went wrong when delete cinema");
  }
};
