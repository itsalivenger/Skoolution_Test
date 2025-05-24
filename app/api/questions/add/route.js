import clientPromise from "@/app/utils/db_Connection";

/**
 * Body expected:
 * {
 *   chapitre_id: 1,
 *   competence_id: 2,
 *   sous_chapitre_id: 5,
 *   question: "…",
 *   choices: ["…","…","…","…"],
 *   correct_choice: 1,
 *   param_a: 1.2,
 *   param_b: -0.4
 * }
 */
export async function POST(request) {
  try {
    const payload = await request.json();
    // --- minimal validation ---------------------------------------
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

    // --- connect DB ----------------------------------------------
    const client = await clientPromise;
    const db = client.db("Skoolution");
    const col = db.collection("Matiere");

    // --- build MongoDB update path --------------------------------
    // We find the unique doc, then use array filters to push deep
    const res = await col.updateOne(
      {},
      {
        $push: {
          "Mathematiques.chapitres.$[chap].competences.$[comp].sous_chapitres.$[sc].questions":
            {
              id: Date.now(), // or new ObjectId()
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
