import bcryptjs from "bcryptjs";
import { supabase } from "../../../utils/supabase";

export const registerUserApi = async (newUser) => {
  let { data: users, error } = await supabase
    .from("users")
    .select("email, password")
    .eq("email", newUser.email);

  if (error) {
    throw new Error(error.message);
  }

  if (users.length > 0) {
    throw new Error("This email was used");
  }
  const salt = await bcryptjs.genSalt(10);
  const hashedPassword = await bcryptjs.hash(newUser.password, salt);

  const { data, error: insertError } = await supabase
    .from("users")
    .insert([{ ...newUser, password: hashedPassword }])
    .select();

  if (insertError) {
    console.log(insertError);
    throw new Error("Add user is wrong");
  }

  return data;
};
