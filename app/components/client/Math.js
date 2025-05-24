'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { faSquareRootVariable } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	ICertificatePaperOutline,
	IExamMultipleChoiceOutline,
	IExamQualificationOutline,
} from 'healthicons-react';
import UserInfoPopup from './User_Info_popup';      // ← adjust path if needed
import { apiRequest } from '@/app/utils/request';
import { saveInStorage } from '@/app/utils/storage';

export default function Math() {
	/* ─────────────────── state / router ─────────────────── */
	const [showPopup, setShowPopup] = useState(false);
	const router = useRouter();

	/* ─────────────────── handlers ────────────────────────── */
	const handleSubmit = async ({ name, filiere }) => {
		try {
			const body = {
				name,
				filiere,
				thetas: [],               // start empty
			}

			const response = await apiRequest({
				url: '/api/user/add_user',          // your endpoint
				method: 'POST',
				body,
				headers: { 'Content-Type': 'application/json' },
			});

			console.log(response);
			setShowPopup(false);
			saveInStorage('user_id', response.data._id)
		} catch (err) {
			console.error('Failed to create user', err);
			// optional: toast / error UI
		}

		router.push('/subjects/math/lessons');
	};

	/* ─────────────────── render ──────────────────────────── */
	return (
		<section className="px-0 md:px-5 py-5 flex flex-col gap-6">
			{/* title */}
			<div className="flex flex-col gap-1.5">
				<h1 className="flex gap-1 font-bold text-3xl">
					Mathématiques
					<FontAwesomeIcon icon={faSquareRootVariable} className="w-8" />
				</h1>
				<p className="text-neutral-500 text-[13px] sm:text-sm">
					Défie‑toi avec des exercices et des quiz adaptés.
				</p>
			</div>

			{/* cards */}
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
				{/* card 2 – normal navigation */}
				<div
					onClick={() => setShowPopup(true)}
					className="flex flex-col shadow-[3px_3px_10px_0px_rgba(0,0,0,0.1)] rounded-xs overflow-hidden"
				>
					<div className="bg-white flex justify-center items-center h-[160px]">
						<IExamMultipleChoiceOutline width={90} height={90} className="text-[#4000A6]" />
					</div>
					<div className="bg-[#4000A6] text-white p-3 py-5 flex flex-col gap-0.5">
						<h3 className="font-semibold">Leçons</h3>
						<p className="text-sm text-neutral-200">12 Leçon</p>
					</div>
				</div>

				{/* card 3 */}
				<div
					onClick={() => setShowPopup(true)}
					className="flex flex-col shadow-[3px_3px_10px_0px_rgba(0,0,0,0.1)] rounded-xs overflow-hidden"
				>
					<div className="bg-white flex justify-center items-center h-[160px]">
						<IExamQualificationOutline width={90} height={90} className="text-[#273B45]" />
					</div>
					<div className="bg-[#273B45] text-white p-3 py-5 flex flex-col gap-0.5">
						<h3 className="font-semibold">Contrôles</h3>
						<p className="text-sm text-neutral-200">18 Contrôle</p>
					</div>
				</div>

				{/* card 4 */}
				<div
					onClick={() => setShowPopup(true)}
					className="flex flex-col shadow-[3px_3px_10px_0px_rgba(0,0,0,0.1)] rounded-xs overflow-hidden"
				>
					<div className="bg-white flex justify-center items-center h-[160px]">
						<ICertificatePaperOutline width={90} height={90} className="text-[#306D8B]" />
					</div>
					<div className="bg-[#306D8B] text-white p-3 py-5 flex flex-col gap-0.5">
						<h3 className="font-semibold">Examens nationaux</h3>
						<p className="text-sm text-neutral-200">25 Examen</p>
					</div>
				</div>
			</div>

			{/* popup */}
			{showPopup && (
				<UserInfoPopup
					onSubmit={handleSubmit}
					onClose={() => setShowPopup(false)}
				/>
			)}
		</section>
	);
}
