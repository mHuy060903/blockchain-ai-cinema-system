import { supabase } from "../../../utils/supabase";

export const getAllMovieByDate = async () => {
  let { data: featured_movies, error: errorFeaturedMovie } = await supabase
    .from("featured_movies")
    .select("movie_id");

  const array = featured_movies.map((movie) => movie.movie_id);

  if (errorFeaturedMovie) {
    console.log(errorFeaturedMovie.message);
    throw new Error("Somethings wrong went get data");
  }

  let { data: movies, error } = await supabase
    .from("movies")
    .select("*")
    .order("release_date", {
      ascending: false,
    });

  movies = movies.filter((movie) => !array.includes(movie.id));

  if (error) {
    console.log(error.message);
    throw new Error("Somethings wrong went get data");
  }

  const arrayMovieNow = [],
    arrayReseveComing = [];

  movies.forEach((movie) => {
    const timeMovie = new Date(`${movie.release_date}`).getTime();
    const timeNow = new Date().getTime() + 1000 * 60 * 60 * 24 * 3;

    if (timeMovie <= timeNow) {
      arrayMovieNow.push(movie);
    } else {
      arrayReseveComing.push(movie);
    }
  });

  const arrayMovieComing = arrayReseveComing.reverse();

  return { arrayMovieNow, arrayMovieComing };
};
