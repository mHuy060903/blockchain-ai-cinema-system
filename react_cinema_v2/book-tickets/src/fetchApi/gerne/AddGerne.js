import { supabase } from "../../../utils/supabase";

export const addGerneApi = async (genre) => {
  const { data, error } = await supabase
    .from("gernes")
    .insert([{ name: genre.name }])
    .select();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};
