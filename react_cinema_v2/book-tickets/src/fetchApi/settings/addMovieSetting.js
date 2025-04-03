import { supabase } from "../../../utils/supabase";

export const addMovieSettingApi = async (data) => {
  const { data: inserData, error } = await supabase
    .from("featured_movies")
    .insert([data])
    .select();

  if (error) {
    console.log(error.message);
    throw new Error("Somethings wrong went insert data");
  }

  return inserData;
};
