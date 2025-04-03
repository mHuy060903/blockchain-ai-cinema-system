import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getAllGenres } from "../../fetchApi/gerne/getAll";

export const useGetAllGerne = () => {
  const [searchParams] = useSearchParams();

  const page = searchParams.get("page") ? Number(searchParams.get("page")) : 1;
  
  const { isLoading, isError, data } = useQuery({
    queryKey: ["genres", page],
    queryFn: () => getAllGenres({ page }),
  });

  return { isLoading, isError, data };
};
