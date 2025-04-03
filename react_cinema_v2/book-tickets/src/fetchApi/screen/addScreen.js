import { supabase } from "../../../utils/supabase";

export const addScreenApi = async (screen) => {
  const { data, error } = await supabase
    .from("screens")
    .insert([screen])
    .select();

  if (error) {
    console.log(error.message);
    throw new Error("Something wrong when insert");
  }

  return data;
};
