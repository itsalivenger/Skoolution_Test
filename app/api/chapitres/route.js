import clientPromise from "@/app/utils/db_Connection";

export async function GET() {
  const client = await clientPromise;
  const db = client.db("Skoolution");

  // ── fetch only the chapitres field ───────────────────────────────
  const doc = await db
    .collection("Matiere")
    .findOne({}, { projection: { "Mathematiques.chapitres": 1, _id: 0 } });

  const chapitres = doc?.Mathematiques?.chapitres || [];

  return new Response(JSON.stringify(chapitres), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
