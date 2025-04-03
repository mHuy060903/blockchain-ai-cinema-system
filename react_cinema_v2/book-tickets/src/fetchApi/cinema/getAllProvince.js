import { supabase } from "../../../utils/supabase";

export const getAllProvinceApi = async () => {
  let { data: provinces, error } = await supabase.from("provinces").select("*");

  if (error) {
    throw new Error("Get all provinces is error");
  }

  return provinces;
};
