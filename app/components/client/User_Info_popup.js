'use client'
import { useState } from "react";

export default function UserInfoPopup({ onSubmit, onClose }) {
    const [name, setName] = useState("");
    const [filiere, setFiliere] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({ name, filiere });
        onSubmit({ name, filiere });

        onClose();
        setName("");
        setFiliere("");
    };

    return (
        <>
            <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
                <div className="bg-white rounded-2xl shadow-xl p-6 w-11/12 max-w-md animate-scaleIn">
                    <h2 className="text-xl font-semibold mb-4 text-center">User Information</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1" htmlFor="name">
                                Name
                            </label>
                            <input
                                id="name"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1" htmlFor="filiere">
                                Filiere
                            </label>
                            <input
                                id="filiere"
                                type="text"
                                value={filiere}
                                onChange={(e) => setFiliere(e.target.value)}
                                required
                                className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="flex justify-end space-x-3 pt-2">
                            <button
                                type="button"
                                onClick={() => onClose()}
                                className="px-4 py-2 rounded-xl bg-gray-200 hover:bg-gray-300"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 shadow"
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
