import { supabase } from "../../../utils/supabase";
export const duplicateScreenApi = async (idScreen) => {
  let { data: screen, error } = await supabase
    .from("screens")
    .select("*")
    .eq("id", idScreen)
    .single();

  if (error || !screen) {
    throw new Error("No id with screen");
  }

  const { id, created_at, ...dataInsert } = screen;

  const { data, error: errorInsert } = await supabase
    .from("screens")
    .insert([dataInsert])
    .select();

  if (errorInsert) {
    throw new Error("Something wrong when insert");
  }

  return data;
};
