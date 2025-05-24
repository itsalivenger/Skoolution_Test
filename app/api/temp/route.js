import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);
const dbName = 'Skoolution';

export async function GET() {
  try {
    await client.connect();
    const db = client.db(dbName);
    const matiere = db.collection('Matiere');

    const doc = await matiere.findOne({});

    if (!doc) {
      return new Response('No document found.', { status: 404 });
    }

    const updatedMathematiques = doc.Mathematiques;

    updatedMathematiques.chapitres?.forEach(chapitre => {
      chapitre.competences?.forEach(competence => {
        competence.sous_chapitres?.forEach(sc => {
          sc.questions?.forEach(q => {
            // Clean choices
            q.choices = q.choices?.map(choice =>
              typeof choice === 'string' && choice.startsWith('\\;')
                ? choice.replace(/^\\;/, '')
                : choice
            );

            // Replace $\vn$ and $\\vn$ in question
            if (typeof q.question === 'string') {
              q.question = q.question
                .replace(/\$\\vn\$/g, '$\\left(v_n\\right)_{n\\in \\mathbb{N}}$')
                .replace(/\$\vn\$/g, '$\\left(v_n\\right)_{n\\in \\mathbb{N}}$');
            }
          });
        });
      });
    });

    await matiere.updateOne(
      { _id: doc._id },
      { $set: { Mathematiques: updatedMathematiques } }
    );

    return new Response('Choices and questions cleaned successfully.', { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response('Error cleaning data', { status: 500 });
  } finally {
    await client.close();
  }
}
