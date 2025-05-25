import clientPromise from "@/app/utils/db_Connection";
import { ObjectId } from "mongodb";

export async function POST(req) {
    try {
        const body = await req.json();
        const { chapitreId, competenceId, sousChapitreTitle } = body;

        if (!chapitreId || !competenceId || !sousChapitreTitle) {
            return new Response(JSON.stringify({ error: "Missing required fields" }), { status: 400 });
        }

        const client = await clientPromise;
        const db = client.db("Skoolution");

        const newSousChapitre = {
            id: new ObjectId().toString(), // generate string id
            title: sousChapitreTitle,
            questions: [],
        };

        const chapitreId_num = Number(chapitreId)
        const competenceId_num = Number(competenceId)
        const updateResult = await db.collection("Matiere").updateOne(
            {
                "Mathematiques.chapitres.id": chapitreId_num,
                "Mathematiques.chapitres.competences.id": competenceId_num,
            },
            {
                $push: {
                    "Mathematiques.chapitres.$[chap].competences.$[comp].sous_chapitres": newSousChapitre,
                },
            },
            {
                arrayFilters: [
                    { "chap.id": chapitreId_num },
                    { "comp.id": competenceId_num },
                ],
            }
        );

        
        if (updateResult.matchedCount === 0) {
            return new Response(JSON.stringify({ error: "Chapitre or competence not found" }), { status: 404 });
        }

        return new Response(JSON.stringify({ success: true, sousChapitre: newSousChapitre }), { status: 200 });
    } catch (error) {
        console.error("Error adding sous-chapitre:", error);
        return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
    }
}
