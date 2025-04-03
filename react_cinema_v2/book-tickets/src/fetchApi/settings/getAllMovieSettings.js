import { supabase } from "../../../utils/supabase";

export const getAllMovieSettings = async (type) => {
  let {
    data: featured_movies,
    error,
    count,
  } = await supabase
    .from("featured_movies")
    .select("*, movies(title)", { count: "exact" })
    .eq("type", type);

  if (error) {
    console.log(error.message);
    throw new Error("Somethings wrong when get data");
  }

  return { featured_movies, count };
};
