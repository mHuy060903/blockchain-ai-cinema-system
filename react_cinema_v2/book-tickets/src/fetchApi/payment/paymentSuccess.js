import { formatCurrency } from "../../../utils/constant";
import { generateRandomString } from "../../../utils/generateToken";
import { supabase } from "../../../utils/supabase";
import axios from "axios";
export const paymentSuccess = async (id) => {
  const now = new Date();
  const { data, error } = await supabase
    .from("booking")
    .update({ status: "Succeeded", booking_time: now })
    .eq("id", id)
    .select("*,users(email)")
    .single();

  if (error) {
    throw new Error("Something went wrong");
  }

  const ticket = { booking_id: data.id, qr_code: generateRandomString(12) };

  const { data: dataTicket, error: errorTicket } = await supabase
    .from("tickets")
    .insert([ticket])
    .select()
    .single();

  if (errorTicket) {
    throw new Error("Something went wrong");
  }

  try {
    const date = new Date(data.booking_time);
    const strDate = `${date.getHours().toString().padStart(2, "0")}:${date
      .getMinutes()
      .toString()
      .padStart(2, "0")} ${date.getDay().toString().padStart(2, "0")}/${(
      date.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}/${date.getFullYear()}`;
    await axios.post("http://localhost:4242/sendMessage", {
      price: formatCurrency(data.total_price),
      email: data.users.email,
      time: strDate,
      idBooking: data.id,
    });
  } catch (e) {
    console.log(e.message);
    throw new Error("Something went wrong");
  }

  return dataTicket;
};
