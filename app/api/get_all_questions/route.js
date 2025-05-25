import clientPromise from "@/app/utils/db_Connection";
import { ObjectId } from "mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("Skoolution");

    const doc = await db.collection("Matiere").findOne({}, { projection: { Mathematiques: 1 } });
    if (!doc || !doc?.Mathematiques) {
      return new Response(JSON.stringify({ questions: [] }), { status: 200 });
    }

    const questions = [];

    for (const chapitre of doc.Mathematiques.chapitres || []) {
      for (const competence of chapitre.competences || []) {
        for (const sousChapitre of competence.sous_chapitres || []) {
          for (const question of sousChapitre.questions || []) {
            questions.push({
              questionId: question._id.toString(),
              chapitreId: chapitre.id,
              chapitreTitle: chapitre.title,
              competenceId: competence.id,
              competenceTitle: competence.title,
              sousChapitreId: sousChapitre.id,
              sousChapitreTitle: sousChapitre.title,
              question: question.question,
              choices: question.choices,
              correct_choice: question.correct_choice,
            });
          }
        }
      }
    }

    return new Response(JSON.stringify({ questions }), { status: 200 });
  } catch (error) {
    console.error("Error fetching questions:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}
