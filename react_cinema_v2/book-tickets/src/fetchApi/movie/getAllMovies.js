import { supabase } from "../../../utils/supabase";

export const getAllMovies = async ({ page }) => {
  const PAGE_SIZE = import.meta.env.VITE_PAGE_SIZE;
  let query = supabase
    .from("movies")
    .select("*", { count: "exact" })
    .order("created_at", {
      ascending: true,
    });

  if (page) {
    const from = (page - 1) * Number(PAGE_SIZE);
    const to = from + Number(PAGE_SIZE) - 1;
    query = query.range(from, to);
  }
  let { data: movies, error, count } = await query;

  if (error) {
    throw new Error(error.message);
  }
  movies = await Promise.all(
    movies.map(async (movie) => {
      let { data: movie_genres, error } = await supabase
        .from("movie_genres")
        .select(
          `
  *,
  gernes (id,
    name
  )
`
        )
        .eq("movie_id", movie.id);

      if (error) {
        throw new Error(error.message);
      }

      const genre = movie_genres.map((cur) => cur.gernes.name);
      const genreId = movie_genres.map((cur) => cur.gernes.id);

      const newMovie = { ...movie, genre, genreId };

      return newMovie;
    })
  );

  return { movies, count };
};
