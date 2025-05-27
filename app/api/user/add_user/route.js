import { NextResponse } from 'next/server';
import clientPromise from "@/app/utils/db_Connection";

export async function POST(request) {
  try {
    const { name, filiere } = await request.json();

    if (!name || !filiere) {
      return NextResponse.json({ error: 'name & filiere required' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db('Skoolution');
    const matieres = db.collection('Matiere');
    const users = db.collection('User');

    // Check if user already exists with same name AND filiere
    let user = await users.findOne({ name, filiere });
    console.log(user);

    if (user) {
      // User exists → login: return user data
      return NextResponse.json({ user, message: 'Logged in' }, { status: 200 });
    }

    // User doesn't exist → create new

    // Prepare thetas object
    const matiereDoc = await matieres.findOne({});
    const thetas = {};

    if (matiereDoc?.Mathematiques?.chapitres) {
      matiereDoc.Mathematiques.chapitres.forEach(chapitre => {
        chapitre.competences.forEach(competence => {
          thetas[competence.id.toString()] = {
            id: competence.id,
            theta: 0,
          };
        });
      });
    }

    // Insert new user
    const insertResult = await users.insertOne({
      name,
      filiere,
      thetas,
    });

    // Fetch inserted user data
    user = await users.findOne({ _id: insertResult.insertedId });

    return NextResponse.json({ user, message: 'Account created' }, { status: 201 });

  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
