// --- Server API: /api/get_chapitres.ts ---
import clientPromise from "@/app/utils/db_Connection";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("Skoolution");

    // Fetch only the Mathematiques.chapitres array
    const doc = await db.collection("Matiere").findOne(
      {},
      { projection: { "Mathematiques.chapitres": 1 } }
    );

    const chapitres = doc?.Mathematiques?.chapitres || [];

    return new Response(JSON.stringify({ chapitres }), { status: 200 });
  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}
