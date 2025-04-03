import { Router } from "express";
import { createClient } from "@supabase/supabase-js";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const router = Router();
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

router.post("/chat", async (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ error: "Message is required" });

  try {
    // Lấy danh sách phim từ Supabase
    const dataMovie = await dataMovies();
    const movieDataString = JSON.stringify(dataMovie, null, 2);

    // Khởi tạo chatbot Gemini
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const chat = model.startChat({
      history: [],
      generationConfig: {
        maxOutputTokens: 500,
      },
    });

    // Gửi prompt yêu cầu chatbot trả lời dựa vào danh sách phim
    const result = await chat.sendMessage(
      `Dưới đây là danh sách phim hiện có trên website:\n${movieDataString}\n\n` +
        `Nếu người dùng hỏi về phim, hãy sử dụng dữ liệu trên để trả lời kèm link đến phim. ` +
        `Nếu câu hỏi không liên quan đến phim, hãy trả lời bình thường.\n\n` +
        `Câu hỏi của người dùng: "${message}"`
    );

    const response = await result.response;
    const text = await response.text();

    res.json({ reply: text });
  } catch (error) {
    console.error("Lỗi chatbot:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const dataMovies = async () => {
  try {
    let result = {};
    const { data, error } = await supabase
      .from("movie_genres")
      .select("*, movies(*), gernes(*)");

    if (error) {
      console.error("Lỗi lấy dữ liệu phim:", error.message);
      return [];
    }

    data.forEach((cur) => {
      if (result[cur.movie_id]) {
        result[cur.movie_id].genres.push(cur.gernes.name);
      } else {
        result[cur.movie_id] = {
          ...cur.movies,
          genres: [cur.gernes.name],
          movie_url: `http://localhost:5173/category/movie/${cur.movie_id}`,
        };
      }
    });

    return Object.values(result);
  } catch (error) {
    console.error("Lỗi khi lấy dữ liệu phim:", error);
    return [];
  }
};

export default router;
