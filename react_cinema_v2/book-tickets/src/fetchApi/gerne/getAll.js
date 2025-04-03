import { supabase } from "../../../utils/supabase";

export const getAllGenres = async ({ page }) => {
  const PAGE_SIZE = import.meta.env.VITE_PAGE_SIZE;
  let query = supabase.from("gernes").select("*", { count: "exact" });

  if (page) {
    const from = (page - 1) * Number(PAGE_SIZE);
    const to = from + Number(PAGE_SIZE) - 1;
    console.log(from, to);
    query = query.range(from, to);
  }

  const { data: gernes, error, count } = await query;

  if (error) {
    throw new Error(error.message);
  }

  return { gernes, count };
};

export const changeDateToString = (string) => {
  const date = new Date(string);

  return `${date.getDate().toString().padStart(2, "0")}/${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}/${date.getFullYear()} ${date
    .getHours()
    .toString()
    .padStart(2, "0")}:${date
    .getMinutes()
    .toString()
    .padStart(2, "0")}:${date.getSeconds()} `;
};
