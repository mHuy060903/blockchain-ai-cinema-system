import { supabase } from "../../../utils/supabase";

export const getFullCinemas = async () => {
  let { data: cinemas, error } = await supabase.from("cinemas").select("*");

  if (error) {
    throw new Error("Some thing wrong when get all cinemas");
  }

  return cinemas;
};
