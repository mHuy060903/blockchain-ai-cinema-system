import { supabase } from "../../../utils/supabase";

export const duplicateCinemaApi = async (idCinema) => {
  let { data: cinema, error } = await supabase
    .from("cinemas")
    .select("*")
    .eq("id", idCinema)
    .single();

  if (error) {
    throw new Error("Not id in table");
  }

  const { created_at, id, ...movieInsert } = cinema;

  const { data, error: errorInsert } = await supabase
    .from("cinemas")
    .insert([movieInsert])
    .select();

  if (errorInsert) {
    console.log(errorInsert.message);
    throw new Error("Insert cinema went wrong");
  }

  return data;
};
