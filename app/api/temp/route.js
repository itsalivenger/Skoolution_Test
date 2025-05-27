import { NextResponse } from 'next/server';
import clientPromise from '@/app/utils/db_Connection';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('Skoolution');
    const matieres = db.collection('Matiere');

    const matiereDoc = await matieres.findOne({});

    if (!matiereDoc?.Mathematiques?.chapitres) {
      return NextResponse.json({ message: 'No chapters found.' }, { status: 404 });
    }

    const changes = [];

    matiereDoc.Mathematiques.chapitres.forEach(chapitre => {
      chapitre.competences.forEach(competence => {
        competence.sous_chapitres.forEach(sousChap => {
          sousChap.questions.forEach(question => {
            if (typeof question.correct_choice === 'string') {
              changes.push({
                questionId: question._id,
                before: question.correct_choice,
                after: 0,
              });
              question.correct_choice = 0;
            }
          });
        });
      });
    });

    if (changes.length > 0) {
      await matieres.replaceOne({ _id: matiereDoc._id }, matiereDoc);
      return NextResponse.json({
        message: `Updated ${changes.length} questions with string correct_choice`,
        changes,
      });
    }

    return NextResponse.json({ message: 'No string correct_choice found.' });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Server error', message: error.message }, { status: 500 });
  }
}
