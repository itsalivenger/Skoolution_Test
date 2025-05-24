'use client';
import { useEffect } from 'react';

export default function PopupModal({ isOpen, onClose, theta }) {
    const THETA_THRESHOLD = 1.5;
    const THETA_MIN = -3; // minimum expected theta value
    const THETA_MAX = 3;  // max expected theta value

    // Clamp theta in range [THETA_MIN, THETA_MAX]
    const clampedTheta = Math.min(Math.max(theta, THETA_MIN), THETA_MAX);

    // Calculate progress as % between THETA_MIN and THETA_THRESHOLD
    // If theta < threshold, progress shows proportion between min and threshold
    // If theta >= threshold, progress is 100%
    let progress;
    if (clampedTheta >= THETA_THRESHOLD) {
        progress = 100;
    } else if (clampedTheta <= THETA_MIN) {
        progress = 0;
    } else {
        progress = ((clampedTheta - THETA_MIN) / (THETA_THRESHOLD - THETA_MIN)) * 100;
    }

    const passed = theta >= THETA_THRESHOLD;
    const scaledTheta = ((clampedTheta + 3) / 6) * 20;

    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 backdrop-blur-sm bg-white/10 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-6 max-w-sm shadow-xl text-center space-y-4">
                <h2 className="text-xl font-bold">Test terminé !</h2>
                <p>Votre valeur de compétence (θ) est :</p>
                <p className="text-2xl font-mono text-blue-600">
                    {scaledTheta.toFixed(2)} / 20
                </p>


                <div className="text-sm text-gray-700">
                    {passed
                        ? "Seuil atteint ✅"
                        : `Objectif : θ ≥ ${THETA_THRESHOLD.toFixed(2)}`}
                </div>

                <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                    <div
                        className={`h-full ${passed ? 'bg-green-500' : 'bg-yellow-500'}`}
                        style={{ width: `${progress}%` }}
                    />
                </div>

                <button
                    className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600"
                    onClick={onClose}
                >
                    Fermer
                </button>
            </div>
        </div>
    );
}
