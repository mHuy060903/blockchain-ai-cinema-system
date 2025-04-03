import { supabase } from "../../../utils/supabase";

export const getAllFavorite = async (arr) => {
  let { data: booking, error } = await supabase
    .from("movies")
    .select("*")
    .in("id", arr);

  if (error) {
    console.log(error.message)
    throw new Error("Something went wrong");
  }

  return booking
};
