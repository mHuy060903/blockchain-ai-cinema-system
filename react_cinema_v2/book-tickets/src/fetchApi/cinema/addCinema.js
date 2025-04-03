import { supabase } from "../../../utils/supabase";

export const addCinemaApi = async (cinema) => {
  const { data, error } = await supabase
    .from("cinemas")
    .insert([cinema])
    .select();

  if (error) {
    console.log(error.message);
    throw new Error("Some thing error when insert");
  }

  return data;
};
