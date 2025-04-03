import { supabase } from "../../../utils/supabase";

export const editMovieApi = async (movie) => {
  let path = movie.path;
  if (movie.image.length !== 0) {
    const { 0: image } = movie.image;

    const { data, error } = await supabase.storage
      .from("images")
      .upload(new Date().toISOString() + ".jpg", image);

    if (error) {
      throw new Error("Upload image wrong");
    }
    path =
      import.meta.env.VITE_SUPABASE_URL +
      "/storage/v1/object/public/" +
      data.fullPath;
  }

  const newMovie = { ...movie, image: path };
  const { genre, path: pathGet, ...lastMovie } = newMovie;

  const { data: movieUpdated, error: errorUpdated } = await supabase
    .from("movies")
    .update(lastMovie)
    .eq("id", lastMovie.id)
    .select()
    .single();

  if (errorUpdated) {
    console.log(errorUpdated.message);
    throw new Error("Update user is error");
  }
  const mapGenre = genre.map((item) => ({
    movie_id: movieUpdated.id,
    genre_id: item,
  }));

  console.log(mapGenre);

  const { error: errorDelete } = await supabase
    .from("movie_genres")
    .delete()
    .eq("movie_id", movieUpdated.id);

  if (errorDelete) {
    throw new Error("Delete genre is wrong");
  }
  const { data, error: errorInserMovieGenre } = await supabase
    .from("movie_genres")
    .insert(mapGenre)
    .select();

  if (errorInserMovieGenre) {
    console.log(errorInserMovieGenre.message);
    throw new Error("Insert Movie Genre is error");
  }

  return data;
};
