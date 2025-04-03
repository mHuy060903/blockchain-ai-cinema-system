import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { getAllFavorite } from "../../fetchApi/favorite/getAllFavorite";

export const useGetAllFavorite = () => {
  const arr = useSelector((state) => state.favorites.movies);

  const { isLoading, isError, data } = useQuery({
    queryFn: () => getAllFavorite(arr),
    queryKey: ["favorites"],
  });

  return { isLoading, isError, data };
};
