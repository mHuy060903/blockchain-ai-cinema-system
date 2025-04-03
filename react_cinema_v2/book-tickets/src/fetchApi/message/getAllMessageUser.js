import { supabase } from "../../../utils/supabase";

export const getAllMessageUser = async () => {
  let { data: message, error } = await supabase
    .from("message")
    .select(
      `*,   group_user:users!group_id (email, image, role), 
      sender_user:users!user_id_send (email, image, role)`
    )
    .eq("group_user.role", "user");

  if (error) {
    console.log(error.message);
    throw new Error("Somethings went wrong");
  }

  const arrayResult = []; //{ idGroup: 1,user: {image, name} , message: []}

  message.forEach((mess) => {
    const index = arrayResult.findIndex((cur) => cur.idGroup === mess.group_id);
    if (index >= 0) {
      arrayResult[index].messages.push(mess);
    } else {
      arrayResult.push({
        idGroup: mess.id_group,
        user: { ...mess.group_user },
        messages: [mess],
      });
    }
  });

  return arrayResult;
};
