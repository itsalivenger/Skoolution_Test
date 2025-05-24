import { NextResponse } from 'next/server';
import clientPromise from "@/app/utils/db_Connection";

export async function POST(request) {
  try {
    const { name, filiere } = await request.json();
    if (!name || !filiere) 
      return NextResponse.json({ error: 'name & filiere required' }, { status: 400 });

    const client = await clientPromise;
    const db = client.db('Skoolution');
    const matieres = db.collection('Matiere');

    const matiereDoc = await matieres.findOne({});

    const thetas = {};
    if (matiereDoc?.Mathematiques?.chapitres) {
      matiereDoc.Mathematiques.chapitres.forEach(chapitre => {
        chapitre.competences.forEach(competence => {
          thetas[competence.id.toString()] = {
            id: competence.id,
            theta: 0
          };
        });
      });
    }

    const users = db.collection('User');
    const { insertedId } = await users.insertOne({
      name,
      filiere,
      thetas,
    });

    return NextResponse.json({ _id: insertedId }, { status: 201 });

  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
