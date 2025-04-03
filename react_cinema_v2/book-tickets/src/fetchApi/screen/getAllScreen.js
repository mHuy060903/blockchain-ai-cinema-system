import { supabase } from "../../../utils/supabase";

export const getAllScreenApi = async () => {
  let { data: screens, error } = await supabase
    .from("screens")
    .select("*, provinces(name), cinemas(name)");

  if (error) {
    console.log(error.message);
    throw new Error("Somethings wrong when get data");
  }

  return { screens };
};
