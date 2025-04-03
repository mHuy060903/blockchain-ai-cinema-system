import { supabase } from "../../../utils/supabase";

export const getAllBooking = async ({ page, sortBy }) => {
  const PAGE_SIZE = import.meta.env.VITE_PAGE_SIZE;

  let query = supabase
    .from("booking")
    .select(
      "*, users(email), showtimes(*,movies(title), screens(name, cinemas(name)))",
      { count: "exact" }
    );

  if (sortBy) {
    query = query.order(sortBy.field, {
      ascending: sortBy.direction === "asc",
    });
  }

  if (page) {
    const from = (page - 1) * Number(PAGE_SIZE);
    const to = from + Number(PAGE_SIZE) - 1;
    
    query = query.range(from, to);
  }

  const { data, error, count } = await query;

  if (error) {
    console.log(error);
    throw new Error("Something went wrong");
  }

  return { data, count };
};
