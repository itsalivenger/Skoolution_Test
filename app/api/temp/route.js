import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb"; // adjust if needed

export async function GET() {
  const client = await clientPromise;
  const db = client.db("Skoolution");
  const collection = db.collection("Matiere");

  try {
    const doc = await collection.findOne({ "Mathematiques": { $exists: true } });
    if (!doc) return NextResponse.json({ message: "Mathematiques not found" }, { status: 404 });

    let updated = false;

    const chapitres = doc.Mathematiques.chapitres.map(chapitre => {
      chapitre.competences = chapitre.competences.map(comp => {
        comp.sous_chapitres = comp.sous_chapitres.map(sous => {
          sous.questions = sous.questions.map(q => {
            const cleaned = q.question.replace(/ *\\+ */g, ""); // remove \ with surrounding spaces
            if (q.question !== cleaned) {
              q.question = cleaned;
              updated = true;
            }
            return q;
          });
          return sous;
        });
        return comp;
      });
      return chapitre;
    });

    if (updated) {
      await collection.updateOne(
        { _id: doc._id },
        { $set: { "Mathematiques.chapitres": chapitres } }
      );
      return NextResponse.json({ message: "Backslashes with spaces cleaned." });
    } else {
      return NextResponse.json({ message: "No changes needed." });
    }
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
