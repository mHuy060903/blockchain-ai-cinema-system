import { Router } from "express";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
dotenv.config();
const router = Router();
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);
router.get("/movies", async (req, res) => {
  const { data, error } = await supabase.from("movies").select("*");
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

router.get("/types-movies", async (req, res) => {
  let result = {};
  const { data, error } = await supabase
    .from("movie_genres")
    .select("*, movies(*), gernes(*)");
  if (error) return res.status(500).json({ error: error.message });

  data.forEach((cur) => {
    if (result[cur.movie_id]) {
      result[cur.movie_id].genres.push(cur.gernes.name);
    } else {
      result[cur.movie_id] = {
        ...cur.movies,
        genres: [cur.gernes.name],
      };
    }
  });
  const resultEnd = Object.values(result);
  res.json(resultEnd);
});

export default router;
