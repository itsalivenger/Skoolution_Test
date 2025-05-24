// app/api/get-questions/route.js
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);
const dbName = 'Skoolution';

export async function GET() {
  try {
    await client.connect();
    const db = client.db(dbName);
    const matiere = db.collection('Matiere');

    const doc = await matiere.findOne({}, { projection: { 'Mathematiques.chapitres.competences.sous_chapitres.questions.question': 1 } });

    const allQuestions = [];

    doc?.Mathematiques?.chapitres?.forEach(chapitre => {
      chapitre.competences?.forEach(competence => {
        competence.sous_chapitres?.forEach(sc => {
          sc.questions?.forEach(q => {
            if (q.question) allQuestions.push(q.question);
          });
        });
      });
    });

    return Response.json({ questions: allQuestions });
  } catch (error) {
    console.error(error);
    return new Response('Error fetching questions', { status: 500 });
  } finally {
    await client.close();
  }
}
