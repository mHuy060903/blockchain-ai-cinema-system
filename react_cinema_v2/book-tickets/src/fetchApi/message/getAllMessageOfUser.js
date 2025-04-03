import { supabase } from "../../../utils/supabase";

export const getAllMessageOfUserApi = async (userId) => {
  if (!userId) {
    return [];
  }

  let { data: message, error } = await supabase
    .from("message")
    .select(
      `*,   group_user:users!group_id (email, image, role), 
      sender_user:users!user_id_send (email, image, role)`
    )
    .eq("group_id", userId);

  if (error) {
    console.log(error.message);
    throw new Error("Somethings went wrong");
  }

  return message;
};
