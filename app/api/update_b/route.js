import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import clientPromise from '@/app/utils/db_Connection';

export async function PUT(req) {
  try {
    const { _id, new_param_b: param_b } = await req.json();

    if (!_id || typeof param_b !== 'number') {
      return NextResponse.json({ error: 'Invalid _id or param_b' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db('Skoolution');
    const matiere = db.collection('Matiere');

    const result = await matiere.updateOne(
      {
        "Mathematiques.chapitres.competences.sous_chapitres.questions._id": new ObjectId(_id)
      },
      {
        $set: {
          "Mathematiques.chapitres.$[].competences.$[].sous_chapitres.$[].questions.$[q].param_b": param_b
        }
      },
      {
        arrayFilters: [{ "q._id": new ObjectId(_id) }]
      }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: 'Question not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, updatedParamB: param_b });
  } catch (err) {
    return NextResponse.json({ error: 'Server error', message: err.message }, { status: 500 });
  }
}
