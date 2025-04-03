import { supabase } from "../../../utils/supabase";
export const duplicateGerneApi = async (id) => {
  let { data: gerne, error } = await supabase
    .from("gernes")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  const { data, error: errorInsert } = await supabase
    .from("gernes")
    .insert([{ name: gerne.name + " copy" }])
    .select();

  if (errorInsert) {
    console.log(errorInsert.message);
  }

  return data;
};
