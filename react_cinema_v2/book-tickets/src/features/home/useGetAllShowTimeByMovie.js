import { useQuery } from "@tanstack/react-query";
import { getAllShowTimeByMovieApi } from "../../fetchApi/home/getAllShowTimeByMovie";
import { useParams, useSearchParams } from "react-router-dom";

export const useGetAllShowTimeByMovie = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const now = new Date();

  const timeDecode = `${now.getFullYear()}-${(now.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${now.getDate().toString().padStart(2, "0")}`;
  const date = searchParams.get("date") || timeDecode;

  

  const { isLoading, isError, data } = useQuery({
    queryFn: () => getAllShowTimeByMovieApi(id, date),
    queryKey: ["showtime_movies", id, date],
  });

  return { isLoading, isError, data };
};
