import { supabase } from "../../../utils/supabase";

export const getAllGenreApi = async () => {
  let { data: gernes, error } = await supabase.from("gernes").select("*");

  if (error) {
    throw new Error("Somethings wrong when get data");
  }

  return gernes;
};
