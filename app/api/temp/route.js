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

    matiereDoc.Mathematiques.chapitres.forEach((chapitre) => {
      chapitre.competences.forEach((competence) => {
        competence.sous_chapitres.forEach((sousChap) => {
          sousChap.questions.forEach((question) => {
            const before = question.param_b;
            if (before > 3) {
              question.param_b = 3;
              changes.push({ questionId: question._id, before, after: 3 });
            } else if (before < -3) {
              question.param_b = -3;
              changes.push({ questionId: question._id, before, after: -3 });
            }
          });
        });
      });
    });

    if (changes.length > 0) {
      await matieres.replaceOne({ _id: matiereDoc._id }, matiereDoc);
      return NextResponse.json({
        message: `Clamped ${changes.length} param_b values to [-3, 3]`,
        changes,
      });
    }

    return NextResponse.json({ message: 'No param_b values out of range found.' });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Server error', message: error.message }, { status: 500 });
  }
}
