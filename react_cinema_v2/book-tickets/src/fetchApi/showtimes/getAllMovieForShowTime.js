import { supabase } from "../../../utils/supabase";
export const getAllMovieForShowTime = async () => {
  let { data: movies, error } = await supabase.from("movies").select("*");

  if (error) {
    throw new Error("Error when get all data movies");
  }

  return movies;
};
