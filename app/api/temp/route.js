import { ObjectId } from "mongodb";
import clientPromise from "@/app/utils/db_Connection"; // adjust if needed

export async function GET() {
  const client = await clientPromise;
  const db = client.db("Skoolution");

  const doc = await db.collection("Matiere").findOne();
  const matiere = doc.Mathematiques;
  const chapitres = matiere.chapitres;

  if (!chapitres[1]) {
    return Response.json({ error: "Second chapter not found" }, { status: 404 });
  }

  // Replace question id with _id
  chapitres[1].competences = chapitres[1].competences.map((competence) => ({
    ...competence,
    sous_chapitres: competence.sous_chapitres.map((sousChapitre) => ({
      ...sousChapitre,
      questions: sousChapitre.questions.map((q) => ({
        ...q,
        _id: new ObjectId(),
        id: undefined, // optionally remove the old `id` if present
      })),
    })),
  }));

  // Update the document
  await db.collection("Matiere").updateOne(
    { _id: doc._id },
    { $set: { "Mathematiques.chapitres": chapitres } }
  );

  return Response.json({ success: true });
}
