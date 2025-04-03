import { supabase } from "../../../utils/supabase";

export const updateGerneApi = async (gerne) => {
  console.log(gerne);
  const { data, error } = await supabase
    .from("gernes")
    .update({ name: gerne.name })
    .eq("id", gerne.id)
    .select();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};
