import { supabase } from "../../../utils/supabase";
import QRCode from "qrcode";
export const getTicketDetail = async (id) => {
  let { data: tickets, error } = await supabase
    .from("tickets")
    .select(
      "*, booking(showtimes(movies(title), show_time_start, show_date, screens(name, cinemas(name))), seat_number)"
    )
    .eq("id", id)
    .single();

  if (error) {
    console.log(error);
    throw new Error("Somethings went wrong");
  }

  const qrCodeUrl = await QRCode.toDataURL(tickets.qr_code);
  return { ...tickets, qr_url: qrCodeUrl };
};
