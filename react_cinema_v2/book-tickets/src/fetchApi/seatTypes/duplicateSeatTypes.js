import { supabase } from "../../../utils/supabase";

export const duplicateSeatTypesApi = async (id) => {
  let { data: seat_types, error } = await supabase
    .from("seat_types")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.log(error);
    throw new Error("No data with id");
  }

  const { id: idDataGet, created_at, ...dataInsert } = seat_types;
  console.log(dataInsert);
  const { data, error: errorInsert } = await supabase
    .from("seat_types")
    .insert([{ ...dataInsert, type_name: dataInsert.type_name + " copy" }])
    .select();

  if (errorInsert) {
    console.log(errorInsert);
    throw new Error("Somethings wrong when insert duplicate");
  }

  return data;
};
