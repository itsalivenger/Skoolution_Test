// --- Server API: /api/add_competence.ts ---
import clientPromise from "@/app/utils/db_Connection";

export async function POST(req) {
  try {
    const body = await req.json();
    const { chapitreId, title } = body;

    if (!chapitreId || !title) {
      return new Response(JSON.stringify({ error: "Missing data" }), { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("Skoolution");

    const newCompetence = {
      id: Date.now(), // or better use UUID if needed
      title,
      sous_chapitres: [],
    };

    const updateRes = await db.collection("Matiere").updateOne(
      { "Mathematiques.chapitres.id": chapitreId },
      {
        $push: {
          "Mathematiques.chapitres.$.competences": newCompetence,
        },
      }
    );

    if (updateRes.matchedCount === 0) {
      return new Response(JSON.stringify({ error: "Chapter not found" }), { status: 404 });
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}
