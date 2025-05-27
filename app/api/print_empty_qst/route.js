import { ObjectId } from 'mongodb';
import clientPromise from '@/app/utils/db_Connection';

async function countNonNumberCorrectChoice() {
  const client = await clientPromise;
  const db = client.db('Skoolution');
  const matiereCol = db.collection('Matiere');

  const doc = await matiereCol.findOne({});

  if (!doc || !doc.Mathematiques?.chapitres) {
    console.log('No Mathematiques or chapitres found');
    return;
  }

  let nonNumberCount = 0;
  let totalQuestions = 0;

  for (const chapitre of doc.Mathematiques.chapitres) {
    for (const competence of chapitre.competences) {
      for (const sous_chapitre of competence.sous_chapitres) {
        for (const question of sous_chapitre.questions) {
          totalQuestions++;
          if (typeof question.correct_choice !== 'number') {
            nonNumberCount++;
            console.log(`Question _id: ${question._id} has non-number correct_choice:`, question.correct_choice);
          }
        }
      }
    }
  }

  console.log(`Total questions: ${totalQuestions}`);
  console.log(`Questions with non-number correct_choice: ${nonNumberCount}`);
}

countNonNumberCorrectChoice()
  .then(() => console.log('Done'))
  .catch(console.error);
