import { supabase } from "../../../utils/supabase";

export const findMessageOfUser = async (id) => {
  let { data: message, error } = await supabase
    .from("message")
    .select(
      `*,   group_user:users!group_id (email, image, role), 
      sender_user:users!user_id_send (email, image, role)`
    )
    .eq("id", id)
    .single();

  if (error) {
    console.log(error.message);
    throw new Error("Somethings went wrong");
  }

  return message;
};
