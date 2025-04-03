import { supabase } from "../../../utils/supabase";

export const autoUpdateDateMovie = async () => {
  let { data: movies, error } = await supabase
    .from("movies")
    .select("*")
    .order("release_date", {
      ascending: false,
    });

  if (error) {
    throw new Error("Somethings wrong went get data movies");
  }
  const timeNow = new Date().getTime() + 1000 * 60 * 60 * 24 * 4;
  const timeNow1 = new Date().getTime() + 1000 * 60 * 60 * 24 * 1;
  movies = movies.map((movie, index) => {
    if (index < movies.length / 2) {
      const date4 = new Date(timeNow);
      movie.release_date = `${date4.getFullYear()}-${(date4.getMonth() + 1)
        .toString()
        .padStart(2, 0)}-${date4.getDate().toString().padStart(2, 0)}`;
    } else {
      const date1 = new Date(timeNow1);

      movie.release_date = `${date1.getFullYear()}-${(date1.getMonth() + 1)
        .toString()
        .padStart(2, 0)}-${date1.getDate().toString().padStart(2, 0)}`;
    }
  });

  movies.forEach((movie) => async () => {
    await supabase
      .from("movies")
      .update({ release_date: movie.release_date })
      .eq("id", movie.id)
      .select();
  });
};
