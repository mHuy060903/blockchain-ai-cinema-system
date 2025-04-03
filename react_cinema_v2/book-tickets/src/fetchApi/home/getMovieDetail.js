import { supabase } from "../../../utils/supabase";

export const getMovieDetailApi = async (id) => {
  let { data: movie, error } = await supabase
    .from("movies")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.log(error);
    throw new Error("Somethings wrong when get data");
  }

  let { data: movie_genres, error: errorGenreMovie } = await supabase
    .from("movie_genres")
    .select("*, gernes(name)")
    .eq("movie_id", movie.id);

  if (errorGenreMovie) {
    throw new Error("Somethings wrong when get data movie genres");
  }

  const array = movie_genres.map((genre) => genre.gernes.name);

   


  return { ...movie, genres: array };
};
