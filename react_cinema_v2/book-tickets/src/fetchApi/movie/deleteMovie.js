import { supabase } from "../../../utils/supabase";

export const deleteMovieApi = async (id) => {
  const { error: errorDeleteMovieGenre } = await supabase
    .from("movie_genres")
    .delete()
    .eq("movie_id", id);

  if (errorDeleteMovieGenre) {
    throw new Error("Some thing wrong when delete movie genre");
  }

  const { error: errorDeleteMovie } = await supabase
    .from("movies")
    .delete()
    .eq("id", id);

  if (errorDeleteMovie) {
    throw new Error("Some thing wrong when delete movie");
  }
};
