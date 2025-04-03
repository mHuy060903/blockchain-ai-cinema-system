import { supabase } from "../../../utils/supabase";

export const addMovieApi = async (movie) => {
  const { 0: image } = movie.image;
 
  const { data, error } = await supabase.storage
    .from("images")
    .upload(new Date().toISOString() + ".jpg", image);

  if (error) {
    throw new Error("Image could not upload");
  }

  const path =
    import.meta.env.VITE_SUPABASE_URL +
    "/storage/v1/object/public/" +
    data.fullPath;

  const { imageNoNeed, genre, ...movieAdd } = movie;

  const { data: insertMovie, error: errorInsert } = await supabase
    .from("movies")
    .insert([{ ...movieAdd, image: path, rating: 0 }])
    .select();

  if (errorInsert) {
    console.log(errorInsert.message);
    throw new Error("Could not insert movie");
  }

  console.log(insertMovie)

  const mapGenre = genre.map((item) => ({
    movie_id: insertMovie[0].id,
    genre_id: item,
  }));
  console.log(mapGenre)

  const { data: dataGenre, error: errorGenre } = await supabase
    .from("movie_genres")
    .insert(mapGenre)
    .select();

  if (errorGenre) {
    throw new Error("Error insert genre");
  }

  return insertMovie;
};
