import { apiRequest } from "./request";

function probCorrect(theta, a, b) {
    return 1 / (1 + Math.exp(-a * (theta - b)));
}

function calculerTau({ t, lambda = .01 }) {
    const tau_init = .05;
    return tau_init / (1 + t * lambda)
}

function logLikelihood(theta, responses, items) {
    let sum = 0;
    for (let i = 0; i < responses.length; i++) {
        const item = items[i];
        if (!item) continue;
        const p = probCorrect(theta, item.a ?? 1, item.b ?? 0);
        if (responses[i] === 1) {
            sum += Math.log(p);
        } else {
            sum += Math.log(1 - p);
        }
    }
    return sum;
}

export function updateTheta(theta, responses, items) {
    const minTheta = -3;
    const maxTheta = 3;
    const step = 0.1;

    let bestTheta = theta;
    let bestLL = logLikelihood(theta, responses, items);

    for (let t = minTheta; t <= maxTheta; t += step) {
        const ll = logLikelihood(t, responses, items);
        if (ll > bestLL) {
            bestLL = ll;
            bestTheta = t;
        }
    }

    return bestTheta;
}

export function selectNextItem({ theta, pool, askedSet }) {
    const askedIds = new Set(askedSet.map(q => q._id));
    let bestQ = null;
    let bestInfo = -1;

    for (const q of pool) {
        const id = q._id ?? q.id; // support both _id and id
        if (!id || askedIds.has(id)) continue;

        const a = q.param_a ?? 1;
        const b = q.param_b;
        if (typeof b !== 'number') continue;

        const p = probCorrect(theta, a, b);
        if (isNaN(p)) continue;

        const info = p * (1 - p);
        if (info > bestInfo) {
            bestInfo = info;
            bestQ = q;
        }
    }

    return bestQ || pool.find(q => !askedIds.has(q._id ?? q.id)) || null;
}

export async function update_b({ currentQuest, theta, r, question_num }) {
    const { param_a, param_b } = currentQuest;
    const p = probCorrect(theta, param_a, param_b);
    const _id = currentQuest._id;
    const tau = calculerTau({ t: question_num });

    const new_param_b = param_b - tau * (r - p)

    console.log(new_param_b);
    console.log(currentQuest.param_b);
    const response = await apiRequest({ url: '/api/update_b', method: 'PUT', body: { new_param_b, _id } });
    console.log(response);
    return response;
}

export async function update_a({ currentQuest, user_id, r, theta }) {
    const body = { question: currentQuest, user_id, response: r, current_theta: theta }
    const response = await apiRequest({ url: '/api/update_a', method: 'PUT', body });

    return response;
}

export async function finalize({ user_id, competence_id, theta, setShowPopup, sous_chapitre }) {
    const response = await apiRequest({
        url: `/api/update_theta`,
        method: 'PUT',
        body: { user_id, competence_id, theta }
    })

    // hna kansift request l route ta3 tetha d'un exercice
    const res = await apiRequest({
        url: `/api/tetha_test`,
        method: 'PUT',
        body: { user_id, sous_chapitre, theta }
    })
    console.log(response);
    setShowPopup(true);

    return response
}