import clientPromise from "@/app/utils/db_Connection";
import { ObjectId } from "mongodb";

export async function POST(req) {
  try {
    const body = await req.json();

    const { chapitreId, competenceId, sousChapitreId, questionId, question, choices, correct_choice } = body;

    if (!chapitreId || !competenceId || !sousChapitreId || !questionId) {
      return new Response(JSON.stringify({ error: "Missing required identifiers" }), { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("Skoolution");

    const updateResult = await db.collection("Matiere").updateOne(
      {
        "Mathematiques.chapitres.id": chapitreId,
        "Mathematiques.chapitres.competences.id": competenceId,
        "Mathematiques.chapitres.competences.sous_chapitres.id": sousChapitreId,
        "Mathematiques.chapitres.competences.sous_chapitres.questions._id": new ObjectId(questionId),
      },
      {
        $set: {
          "Mathematiques.chapitres.$[chap].competences.$[comp].sous_chapitres.$[sc].questions.$[q].question": question,
          "Mathematiques.chapitres.$[chap].competences.$[comp].sous_chapitres.$[sc].questions.$[q].choices": choices,
          "Mathematiques.chapitres.$[chap].competences.$[comp].sous_chapitres.$[sc].questions.$[q].correct_choice": correct_choice,
        },
      },
      {
        arrayFilters: [
          { "chap.id": chapitreId },
          { "comp.id": competenceId },
          { "sc.id": sousChapitreId },
          { "q._id": new ObjectId(questionId) },
        ],
      }
    );

    if (updateResult.matchedCount === 0) {
      return new Response(JSON.stringify({ error: "Question not found" }), { status: 404 });
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("Error updating question:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}
