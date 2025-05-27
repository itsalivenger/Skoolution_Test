import { ObjectId } from "mongodb";
import clientPromise from "@/app/utils/db_Connection";

export async function POST(request) {
  try {
    const payload = await request.json();

    const required = [
      "chapitre_id",
      "competence_id",
      "sous_chapitre_id",
      "question",
      "choices",
      "correct_choice",
    ];
    if (!required.every((k) => payload[k] !== undefined)) {
      return new Response(
        JSON.stringify({ success: false, message: "Missing fields." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const client = await clientPromise;
    const db = client.db("Skoolution");
    const col = db.collection("Matiere");

    const res = await col.updateOne(
      {},
      {
        $push: {
          "Mathematiques.chapitres.$[chap].competences.$[comp].sous_chapitres.$[sc].questions":
            {
              _id: new ObjectId(), // use MongoDB ObjectId
              question: payload.question,
              choices: payload.choices,
              correct_choice: payload.correct_choice,
              param_a: payload.param_a,
              param_b: payload.param_b,
            },
        },
      },
      {
        arrayFilters: [
          { "chap.id": payload.chapitre_id },
          { "comp.id": payload.competence_id },
          { "sc.id": payload.sous_chapitre_id },
        ],
      }
    );

    if (res.matchedCount === 0) {
      return new Response(
        JSON.stringify({ success: false, message: "Path not found." }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Insert question error:", err);
    return new Response(
      JSON.stringify({ success: false, error: err.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
