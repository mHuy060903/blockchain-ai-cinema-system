import { supabase } from "../../../utils/supabase";

export const getAllCinema = async ({ page }) => {
  let query = supabase
    .from("cinemas")
    .select("*, provinces(name, lat, lng)", { count: "exact" });
  const PAGE_SIZE = Number(import.meta.env.VITE_PAGE_SIZE);
  if (page) {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;
    query = query.range(from, to);
  }
  let { data: cinemas, error, count } = await query;

  if (error) {
    console.log(error.message);
    throw new Error("Some thing went wrong when get cinemas");
  }

  return { cinemas, count };
};
