import { ObjectId } from "mongodb";
import clientPromise from "@/app/utils/db_Connection";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { questionId } = await req.json();

    if (!questionId) {
      return NextResponse.json({ success: false, error: "Missing questionId" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("Skoolution");

    const result = await db.collection("Matiere").updateOne(
      {}, // Assuming only one subject document
      {
        $pull: {
          "Mathematiques.chapitres.$[].competences.$[].sous_chapitres.$[].questions": {
            _id: new ObjectId(questionId),
          },
        },
      }
    );

    if (result.modifiedCount > 0) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ success: false, error: "Question not found" }, { status: 404 });
    }
  } catch (err) {
    console.error("Error deleting question:", err);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}
