import clientPromise from "@/app/utils/db_Connection";
import { ObjectId } from "mongodb";

export async function DELETE(request) {
  const id = new URL(request.url).searchParams.get("id");
  if (!id) {
    return new Response(
      JSON.stringify({ success: false, message: "id required" }),
      { status: 400 }
    );
  }

  const client = await clientPromise;
  const db = client.db("Skoolution");

  // Pull the question from any nested questions array by _id
  const res = await db.collection("Matiere").updateOne(
    { "Mathematiques.chapitres.competences.sous_chapitres.questions._id": new ObjectId(id) },
    { $pull: { "Mathematiques.chapitres.$[].competences.$[].sous_chapitres.$[].questions": { _id: new ObjectId(id) } } }
  );

  if (res.modifiedCount === 0) {
    return new Response(
      JSON.stringify({ success: false, message: "not found" }),
      { status: 404 }
    );
  }

  return new Response(JSON.stringify({ success: true }), { status: 200 });
}
