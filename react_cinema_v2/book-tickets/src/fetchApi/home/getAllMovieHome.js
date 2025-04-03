import { supabase } from "../../../utils/supabase";
export const getAllMovieHome = async () => {
  let { data: featured_movies, errorFeatured } = await supabase
    .from("featured_movies")
    .select("*, movies(*)");

  if (errorFeatured) {
    throw new Error("Something wrong went get data featured movies");
  }

  const arrayMovieNow = [],
    idMovieNow = [],
    arrayMovieComing = [],
    idMovieComing = [];

  featured_movies.forEach((movie) => {
    if (movie.type === "now") {
      arrayMovieNow.push(movie.movies);
      idMovieNow.push(movie.movie_id);
    } else {
      arrayMovieComing.push(movie.movies);
      idMovieComing.push(movie.movie_id);
    }
  });

  let { data: movies, error } = await supabase
    .from("movies")
    .select("*")
    .order("release_date", {
      ascending: false,
    });

  if (error) {
    throw new Error("Somethings wrong went get data movies");
  }

  movies = movies.filter((movie) => !idMovieNow.includes(movie.id));
  movies = movies.filter((movie) => !idMovieComing.includes(movie.id));

  movies.forEach((movie) => {
    const timeMovie = new Date(`${movie.release_date}`).getTime();
    const timeNow = new Date().getTime() + 1000 * 60 * 60 * 24 * 3;

    if (timeMovie <= timeNow) {
      arrayMovieNow.push(movie);
    } else {
      arrayMovieComing.push(movie);
    }
  });

  return { arrayMovieNow, arrayMovieComing };
};
