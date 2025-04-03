import { subDays } from "date-fns";
import { getToday } from "../../../utils/constant";
import { supabase } from "../../../utils/supabase";

export const getAllMovieMostOrder = async () => {
  const queryDate = subDays(new Date(), 7).toISOString();

  const { data, error } = await supabase
    .from("booking")
    .select("*, showtimes(*,movies(title, id, director,image))")
    .eq("status", "Succeeded")
    .gte("created_at", queryDate)
    .lte("created_at", getToday({ end: true }))
    .order("created_at", {
      ascending: true,
    });

  if (error) {
    throw new Error("Something went wrong");
  }

  let { data: movie_genres, error: errorGernes } = await supabase
    .from("movie_genres")
    .select("*, gernes(*)");

  if (errorGernes) {
    console.log(errorGernes.message);
    throw new Error("Somethings went wrong");
  }

  const arrayResult = []; //{id: 1, movie: {}, value: 3}
  data.forEach((cur) => {
    const index = arrayResult.findIndex(
      (obj) => obj.id === cur.showtimes.movies.id
    );
    if (index >= 0) {
      arrayResult[index].value += cur.seat_number.length;
    } else {
      const genre = movie_genres.find(
        (ge) => ge.movie_id === cur.showtimes.movies.id
      );
      arrayResult.push({
        id: cur.showtimes.movies.id,
        movie: { ...cur.showtimes.movies, genre: genre.gernes.name },
        value: cur.seat_number.length,
      });
    }
  });

  arrayResult.sort((a, b) => b.value - a.value);

  return arrayResult;
};
