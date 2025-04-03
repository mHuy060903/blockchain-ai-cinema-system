import { supabase } from "../../../utils/supabase";

export const duplicateMovieApi = async (movie) => {
  const { id, genre, genreId, created_at, rating, ...movieInsert } = movie;

  const { data, error } = await supabase
    .from("movies")
    .insert([{ ...movieInsert, rating: 0, title: movieInsert.title + " copy" }])
    .select()
    .single();

  if (error) {
    throw new Error("Something went wrong insert");
  }

  const mapGenre = genreId.map((cur) => ({ movie_id: data.id, genre_id: cur }));

  const { error: errorMovieGenre } = await supabase
    .from("movie_genres")
    .insert(mapGenre)
    .select();

  if (errorMovieGenre) {
    console.log(errorMovieGenre.message);
    throw new Error("Something went wrong insert movie genre");
  }
};
