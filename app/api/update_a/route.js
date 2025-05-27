import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import clientPromise from '@/app/utils/db_Connection';

function probCorrect(theta, a, b) {
  return 1 / (1 + Math.exp(-a * (theta - b)));
}

function update_a({ old_a, param_b, thetas, reponses }) {
  const learning_rate = 0.01;
  const sum = thetas.reduce((acc, theta, i) => {
    const p = probCorrect(theta, old_a, param_b);
    const r_i = reponses[i];
    return acc + (theta - param_b) * (r_i - p);
  }, 0);
  return old_a + learning_rate * sum;
}

export async function PUT(req) {
  try {
    const { question, user_id, response, current_theta } = await req.json();
    const _id = question._id;
    const param_b = question.param_b;

    if (!_id || !user_id || ![0, 1].includes(response)) {
      return NextResponse.json({ error: 'Invalid payload dedrno' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db('Skoolution');
    const matiereCol = db.collection('Matiere');

    // Step 1: Add the new answer to the question's answers array
    const pushResult = await matiereCol.updateOne(
      {
        "Mathematiques.chapitres.competences.sous_chapitres.questions._id": new ObjectId(_id)
      },
      {
        $push: {
          "Mathematiques.chapitres.$[].competences.$[].sous_chapitres.$[].questions.$[q].answers": {
            user_id,
            response,
            theta: current_theta
          }
        }
      },
      {
        arrayFilters: [{ "q._id": new ObjectId(_id) }]
      }
    );

    if (pushResult.modifiedCount === 0) {
      return NextResponse.json({ error: 'Question not found or not updated' }, { status: 404 });
    }

    // Step 2: Retrieve the question with answers again
    const doc = await matiereCol.findOne({
      "Mathematiques.chapitres.competences.sous_chapitres.questions._id": new ObjectId(_id)
    });

    if (!doc) {
      return NextResponse.json({ error: 'Document not found' }, { status: 404 });
    }

    let foundQuestion = null;

    outer: for (const chapitre of doc.Mathematiques.chapitres) {
      for (const competence of chapitre.competences) {
        for (const sous_chapitre of competence.sous_chapitres) {
          for (const q of sous_chapitre.questions) {
            if (q._id.toString() === _id.toString()) {
              foundQuestion = q;
              break outer;
            }
          }
        }
      }
    }

    if (!foundQuestion || !foundQuestion.answers) {
      return NextResponse.json({ error: 'Answers not found in question' }, { status: 404 });
    }

    // Step 3: Calculate new param_a based on answers
    const thetas = foundQuestion.answers.map(ans => ans.theta);
    const reponses = foundQuestion.answers.map(ans => ans.response);
    const old_a = foundQuestion.param_a ?? question.param_a ?? 1; // fallback to 1 if missing

    const new_a = update_a({ old_a, param_b, thetas, reponses });

    // Step 4: Update param_a in the question
    const aUpdateResult = await matiereCol.updateOne(
      {
        "Mathematiques.chapitres.competences.sous_chapitres.questions._id": new ObjectId(_id)
      },
      {
        $set: {
          "Mathematiques.chapitres.$[].competences.$[].sous_chapitres.$[].questions.$[q].param_a": new_a
        }
      },
      {
        arrayFilters: [{ "q._id": new ObjectId(_id) }]
      }
    );

    return NextResponse.json({ success: true, updated_param_a: new_a });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Server error', message: err.message }, { status: 500 });
  }
}
