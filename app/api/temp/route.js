import { ObjectId } from 'mongodb';
import clientPromise from '@/app/utils/db_Connection';

async function fixCorrectChoice() {
  const client = await clientPromise;
  const db = client.db('Skoolution');
  const matiereCol = db.collection('Matiere');

  // Get the whole document (assuming just one)
  const doc = await matiereCol.findOne({});

  if (!doc || !doc.Mathematiques?.chapitres) {
    console.log('No Mathematiques or chapitres found');
    return;
  }

  let modifiedCount = 0;

  // Traverse all questions and fix if needed
  for (const chapitre of doc.Mathematiques.chapitres) {
    for (const competence of chapitre.competences) {
      for (const sous_chapitre of competence.sous_chapitres) {
        for (const question of sous_chapitre.questions) {
          if (typeof question.correct_choice !== 'number') {
            // Update this question's correct_choice to 0
            const res = await matiereCol.updateOne(
              {
                "Mathematiques.chapitres.competences.sous_chapitres.questions._id": question._id
              },
              {
                $set: {
                  "Mathematiques.chapitres.$[].competences.$[].sous_chapitres.$[].questions.$[q].correct_choice": 0
                }
              },
              {
                arrayFilters: [{ "q._id": question._id }]
              }
            );
            modifiedCount += res.modifiedCount;
          }
        }
      }
    }
  }

  console.log(`Fixed correct_choice in ${modifiedCount} questions`);
}

fixCorrectChoice()
  .then(() => console.log('Done'))
  .catch(console.error);
