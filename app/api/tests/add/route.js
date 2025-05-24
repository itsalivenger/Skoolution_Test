// // /pages/api/tests/add.js (or /app/api/tests/add/route.js for Next 13 app router)

// import clientPromise from "@/lib/mongodb";

// export async function POST(req) {
//   try {
//     const client = await clientPromise;
//     const db = client.db("Skoolution");

//     const testObj = await req.json();

//     // Basic validation
//     if (
//       !testObj.question ||
//       !Array.isArray(testObj.choices) ||
//       testObj.choices.length !== 4 ||
//       typeof testObj.correct_choice !== "number" ||
//       !testObj.sous_chap ||
//       isNaN(testObj.param_a) ||
//       isNaN(testObj.param_b)
//     ) {
//       return new Response(
//         JSON.stringify({ success: false, message: "Invalid test object" }),
//         { status: 400, headers: { "Content-Type": "application/json" } }
//       );
//     }

//     // Insert with auto-generated _id by MongoDB
//     const result = await db.collection("Questions").insertOne(testObj);

//     return new Response(
//       JSON.stringify({ success: true, insertedId: result.insertedId }),
//       { status: 201, headers: { "Content-Type": "application/json" } }
//     );
//   } catch (error) {
//     console.error("Failed to insert test:", error);
//     return new Response(
//       JSON.stringify({ success: false, error: error.message }),
//       { status: 500, headers: { "Content-Type": "application/json" } }
//     );
//   }
// }
