import { supabase } from "../../../utils/supabase";

export const editUserApi = async ({
  image,
  phone,
  address,
  userPath,
  idUser,
}) => {
  let path = userPath;

  if (image?.length !== 0 && image !== null) {
    const { 0: imageUser } = image;

    const { data, error } = await supabase.storage
      .from("images")
      .upload(new Date().toISOString() + ".jpg", imageUser);

    if (error) {
      throw new Error("Upload image wrong");
    }
    path =
      import.meta.env.VITE_SUPABASE_URL +
      "/storage/v1/object/public/" +
      data.fullPath;
  }

  const { data: dataUpdate, error: errorUpdate } = await supabase
    .from("users")
    .update({ image: path, phone, address })
    .eq("id", idUser)
    .select("id, email, role, token, image, phone ,address")
    .single();

  if (errorUpdate) {
    throw new Error("Somethings wrong went update user");
  }

  return dataUpdate;
};
