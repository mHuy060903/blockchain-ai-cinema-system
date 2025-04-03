import { generateRandomToken } from "../../../utils/generateToken";
import { supabase } from "../../../utils/supabase";
import bcryptjs from "bcryptjs";
// import jwt from "jsonwebtoken";

export const loginUserApi = async (user) => {
  const { data: userData, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", user.email)
    .single();

  if (!userData || error) {
    throw new Error("Email or password not correct");
  }

  const isMatch = await bcryptjs.compare(user.password, userData.password);

  if (!isMatch) {
    throw new Error("Password not correct");
  }

  const token = generateRandomToken();

  const { data: userUpdated, error: erorUpdate } = await supabase
    .from("users")
    .update({
      token: token,
      token_expiry: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    })
    .eq("id", userData.id)
    .select("id, email, role, token, image, phone ,address")
    .single();

  if (erorUpdate) {
    throw new Error(erorUpdate.message);
  }

  return userUpdated;
};

export const fetchTokenLogin = async () => {
  const token = localStorage.getItem("token");

  if (!token) return;

  let { data: user, error: errorGetUser } = await supabase
    .from("users")
    .select("email, role, token_expiry")
    .eq("token", token)
    .single();

  if (errorGetUser) {
    throw new Error(errorGetUser.message);
  }

  if (!user) return;

  const dateToken = new Date(user.token_expiry).getTime();
  const now = new Date().getTime();

  if (now > dateToken) return;

  const { data: userUpdated, error: errorUpdate } = await supabase
    .from("users")
    .update({ token_expiry: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000) })
    .eq("email", user.email)
    .select("id, email, role, token, image, phone ,address")
    .single();

  if (errorUpdate) {
    throw new Error(errorUpdate.message);
  }

  return userUpdated;
};

export const loginWithGoogle = async () => {
  let { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};
