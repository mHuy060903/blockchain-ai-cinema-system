import { supabase } from "../../../utils/supabase";

export const editCinemaApi = async (cinema) => {
  const { data, error } = await supabase
    .from("cinemas")
    .update(cinema)
    .eq("id", cinema.id)
    .select();

  if (error) {
    console.log(error.message);
    throw new Error("Some thing went wrong update!");
  }

  return data;
};
