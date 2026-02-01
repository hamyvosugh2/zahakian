import { supabase } from "../lib/supabaseClient";

export default async function handler(req, res) {
  const { data, error } = await supabase
    .from("test_table")
    .select("*")
    .limit(1);
  if (error) {
    return res.status(500).json({ error: error.message });
  }
  return res.status(200).json({ data });
}
