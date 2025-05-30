import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import clientPromise from '@/app/utils/db_Connection';

export async function PUT(req) {
  try {
    const { user_id, competence_id, theta } = await req.json();

    if (!user_id) {
      return NextResponse.json({ error: 'Missing or invalid user_id' }, { status: 400 });
    }
    if (!competence_id) {
      return NextResponse.json({ error: 'Invalid or missing competence_id' }, { status: 400 });
    }
    if (typeof theta !== 'number') {
      return NextResponse.json({ error: 'Theta must be a number' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db('Skoolution');
    const users = db.collection('User');

    const updateKey = `thetas.${competence_id}`;

    const updateObj = {
      id: competence_id,
      theta: theta,
    };

    const result = await users.updateOne(
      { _id: new ObjectId(user_id) },
      { $set: { [updateKey]: updateObj } }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const updatedUser = await users.findOne(
      { _id: new ObjectId(user_id) },
      { projection: { thetas: 1 } }
    );

    return NextResponse.json(
      {
        success: true,
        updatedTheta: theta,
        updatedThetas: updatedUser?.thetas || {}
      },
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Server error', message: err.message }, { status: 500 });
  }
}
