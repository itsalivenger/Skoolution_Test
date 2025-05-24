import clientPromise from "@/app/utils/db_Connection";

/**
 * Body expected:
 * {
 *   questions: [
 *     {
 *       chapitre_id: 1,
 *       competence_id: 2,
 *       sous_chapitre_id: 5,
 *       question: "…",
 *       choices: ["…","…","…","…"],
 *       correctChoice: 1,
 *       paramA: 1.2,
 *       paramB: -0.4
 *     },
 *     ...
 *   ]
 * }
 */
export async function POST(request) {
  try {
    const { questions } = await request.json();

    if (!Array.isArray(questions) || questions.length === 0) {
      return new Response(
        JSON.stringify({ success: false, message: "questions array required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // basic field check (first element is enough since all share schema)
    const mustHave = [
      "chapitre_id",
      "competence_id",
      "sous_chapitre_id",
      "question",
      "choices",
      "correct_choice",
    ];
    if (!mustHave.every((k) => k in questions[0])) {
      return new Response(
        JSON.stringify({ success: false, message: "Missing fields." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // connect DB
    const client = await clientPromise;
    const db = client.db("Skoolution");
    const col = db.collection("Matiere");

    // build bulk operations
    const ops = questions.map((q) => ({
      updateOne: {
        filter: {}, // the unique 'Matiere' doc
        update: {
          $push: {
            "Mathematiques.chapitres.$[chap].competences.$[comp].sous_chapitres.$[sc].questions":
              {
                id: Date.now(),
                question:       q.question,
                choices:        q.choices,
                correct_choice: q.correct_choice,
                param_a:        q.param_a,
                param_b:        q.param_b,
              },
          },
        },
        arrayFilters: [
          { "chap.id": q.chapitre_id },
          { "comp.id": q.competence_id },
          { "sc.id":   q.sous_chapitre_id },
        ],
      },
    }));

    const result = await col.bulkWrite(ops, { ordered: false });

    return new Response(
      JSON.stringify({ success: true, inserted: result.modifiedCount }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("Bulk insert error:", err);
    return new Response(
      JSON.stringify({ success: false, error: err.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
