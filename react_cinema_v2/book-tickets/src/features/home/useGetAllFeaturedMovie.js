import { useQuery } from "@tanstack/react-query";
import { getAllMovieHome } from "../../fetchApi/home/getAllMovieHome";

export const useGetAllFeaturedMovieHome = () => {
  const {
    isLoading: isLoadingGetFeaturedMovie,
    isError: isErrorGetFeaturedMovie,
    data: movieFeatured,
  } = useQuery({
    queryFn: getAllMovieHome,
    queryKey: ["movie_featured"],
  });

  return { isLoadingGetFeaturedMovie, isErrorGetFeaturedMovie, movieFeatured };
};
