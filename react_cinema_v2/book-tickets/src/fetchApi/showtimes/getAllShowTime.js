import { supabase } from "../../../utils/supabase";
import { PAGE_SIZE } from "../../../utils/constant";
export const getAllShowTimeApi = async ({ page, sortBy }) => {
  let query = supabase
    .from("showtimes")
    .select(
      "*, screens(name, provinces(id,name), cinemas(id,name)), movies(id,title)",
      { count: "exact" }
    );

  if (sortBy) {
    query = query.order(sortBy.field, {
      ascending: sortBy.direction === "asc",
    });
  }

  if (page) {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;
    query = query.range(from, to);
  }
  let { data: showtimes, error, count } = await query;

  if (error) {
    throw new Error("Somethings wrong when get all data");
  }

  return { showtimes, count };
};
