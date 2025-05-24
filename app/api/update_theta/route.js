import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import clientPromise from '@/app/utils/db_Connection';

export async function PUT(req) {
  try {
    const { user_id, competence_id, theta } = await req.json();

    console.log("Updating user:", user_id, "competence:", competence_id, "to theta:", theta);

    if (typeof theta !== 'number') {
      return NextResponse.json({ error: 'Theta must be a number' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db('Skoolution');
    const users = db.collection('User');

    const updateKey = `thetas.${competence_id}.theta`;

    const result = await users.updateOne(
      { _id: new ObjectId(user_id) },
      { $set: { [updateKey]: theta } }
    );

    console.log("Mongo update result:", result);

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, updatedTheta: theta });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Server error', message: err.message }, { status: 500 });
  }
}
