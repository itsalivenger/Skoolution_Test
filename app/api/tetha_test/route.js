import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import clientPromise from '@/app/utils/db_Connection';

export async function PUT(req) {
  try {
    const { user_id, sous_chapitre, theta } = await req.json();
    const sous_chapitre_id = sous_chapitre.id;

    if (!user_id) {
      return NextResponse.json({ error: 'Missing or invalid user_id' }, { status: 400 });
    }
    if (!sous_chapitre_id) {
      return NextResponse.json({ error: 'Invalid or missing sous_chapitre_id' }, { status: 400 });
    }
    if (typeof theta !== 'number') {
      return NextResponse.json({ error: 'Theta must be a number' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db('Skoolution');
    const users = db.collection('User');

    // Find current user's existing theta for this sous_chapitre
    const user = await users.findOne(
      { _id: new ObjectId(user_id) },
      { projection: { [`sous_chapitre_thetas.${sous_chapitre_id}`]: 1 } }
    );

    const existingTheta = user?.sous_chapitre_thetas?.[sous_chapitre_id]?.theta;

    // Only update if new theta is greater or no existing theta
    if (existingTheta === undefined || theta > existingTheta) {
      const updateKey = `sous_chapitre_thetas.${sous_chapitre_id}`;
      const updateObj = {
        id: sous_chapitre_id,
        theta: theta,
      };

      const result = await users.updateOne(
        { _id: new ObjectId(user_id) },
        { $set: { [updateKey]: updateObj } }
      );

      if (result.matchedCount === 0) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
      }
    }

    // Return current state after update or skip
    const updatedUser = await users.findOne(
      { _id: new ObjectId(user_id) },
      { projection: { sous_chapitre_thetas: 1 } }
    );

    return NextResponse.json(
      {
        success: true,
        updatedTheta: theta,
        updatedSousChapitreThetas: updatedUser?.sous_chapitre_thetas || {}
      },
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Server error', message: err.message }, { status: 500 });
  }
}
