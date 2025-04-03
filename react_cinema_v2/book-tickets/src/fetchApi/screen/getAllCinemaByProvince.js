import { supabase } from "../../../utils/supabase";

export const getAllCinemaByProvince = async (idProvince) => {
  if (!idProvince) {
    return [];
  }

  let { data: cinemas, error } = await supabase
    .from("cinemas")
    .select("*")
    .eq("province_id", idProvince);

  if (error) {
    console.log(error.message);
    throw new Error("Somethings went wrong when get data cinema");
  }
  return cinemas;
};
