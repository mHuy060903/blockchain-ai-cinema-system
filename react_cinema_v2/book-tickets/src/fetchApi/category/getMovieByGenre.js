import { supabase } from "../../../utils/supabase";

export const getMovieByGenre = async (arrGenreId) => {
  let { data: movie_genres, error } = await supabase
    .from("movie_genres")
    .select("*");

  if (error) {
    throw new Error("Somethings went wrong");
  }

  let { data: movies, error: errorMovie } = await supabase
    .from("movies")
    .select("*");

  if (arrGenreId.length === 0) {
    return movies;
  }

  if (errorMovie) {
    throw new Error("Somethings went wrong");
  }
  const test = [];
  movie_genres.forEach((movieGenre) => {
    if (arrGenreId.includes(movieGenre.genre_id)) {
      test.push(movieGenre);
    }
  });

  const arrIdMovie = [];
  test.forEach((genreMovie) => {
    const index = arrIdMovie.findIndex(
      (cur) => cur.idMovie === genreMovie.movie_id
    );

    if (index === -1) {
      arrIdMovie.push({
        idMovie: genreMovie.movie_id,
        genres: [genreMovie.genre_id],
      });
    } else {
      arrIdMovie[index].genres.push(genreMovie.genre_id);
    }
  });

  const arrResult = arrIdMovie.filter((movieGenre) => {
    return movieGenre.genres.length === arrGenreId.length;
  });

  const arrIdMovieFinal = arrResult.map((cur) => cur.idMovie);

  movies = movies.filter((cur) => arrIdMovieFinal.includes(cur.id));

  return movies;
};
