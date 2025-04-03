import { PAGE_SIZE } from "../../../utils/constant";
import { supabase } from "../../../utils/supabase";

export const getAllSeatTypesApi = async ({ page, sortBy }) => {
  let query = supabase.from("seat_types").select("*", { count: "exact" });

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

  let { data: seat_types, error, count } = await query;

  if (error) {
    throw new Error("Somethings wrong when get data");
  }

  return { seat_types, count };
};
