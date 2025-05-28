// app/api/fix-question-ids/route.js
import { NextResponse } from 'next/server';
import clientPromise from '@/app/utils/db_Connection';
import { ObjectId } from 'mongodb';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('Skoolution');
    const matieres = db.collection('Matiere');

    const doc = await matieres.findOne({});

    if (!doc?.Mathematiques?.chapitres) {
      return NextResponse.json({ message: 'No chapters found.' }, { status: 404 });
    }

    let updatedCount = 0;

    doc.Mathematiques.chapitres.forEach(chapitre => {
      chapitre.competences.forEach(competence => {
        competence.sous_chapitres.forEach(sousChap => {
          sousChap.questions.forEach(question => {
            if (question.id && !question._id) {
              question._id = new ObjectId();
              delete question.id;
              updatedCount++;
            }
          });
        });
      });
    });

    if (updatedCount > 0) {
      await matieres.replaceOne({ _id: doc._id }, doc);
    }

    return NextResponse.json({ message: `Updated ${updatedCount} questions.` });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Server error', message: error.message }, { status: 500 });
  }
}
