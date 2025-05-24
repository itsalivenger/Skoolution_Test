import { useState, useEffect } from 'react'
import { faSquareRootVariable } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { apiRequest } from '@/app/utils/request';
import { saveInStorage } from '@/app/utils/storage';

export default function Lessons() {
	const [chapitres, setChapitres] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const result = await apiRequest({ url: "/api/chapitres" });
				if (result.success) {
					setChapitres(result.data || []);
					// saveInStorage('chapitres', result.data)
				} else {
					setError("Failed to fetch data.");
				}
			} catch (err) {
				setError("An unexpected error occurred.");
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	if (loading) {
		return <p>Loading chapters...</p>;
	}

	if (error) {
		return <p className="text-red-600">Error: {error}</p>;
	}
	return (
		<section className="px-0 md:px-5 py-5 flex flex-col gap-6">
			<div className="flex flex-col gap-6">
				<div className="flex flex-col gap-1.5">
					<h1 className="flex gap-1 font-bold text-3xl">
						Mathématiques{" "}
						<FontAwesomeIcon icon={faSquareRootVariable} className="w-8" />
					</h1>
					<p className="text-neutral-500 text-[13px] sm:text-sm">
						Défie-toi avec des exercices et des quiz adaptés.
					</p>
				</div>

				<div className="grid grid-cols-1 min-[840px]:grid-cols-2 xl:grid-cols-3 gap-8">
					{chapitres.map((chapitre) => (
						<Link
							key={chapitre.title}
							href={{
								pathname: `/subjects/math/lessons/${encodeURIComponent(chapitre.title)}`,
							}}
							className="flex flex-col min-[465px]:flex-row gap-0 bg-white shadow-[3px_3px_10px_0px_rgba(0,_0,_0,_0.1)] hover:scale-[1.02] transition-transform duration-200"
							onClick={()=> saveInStorage('current_chapter', chapitre)}
						>
							<div className="flex justify-center items-center p-5 bg-skblue/10">
								<FontAwesomeIcon
									icon={faSquareRootVariable}
									className="w-9 text-[#135EA5]"
								/>
							</div>
							<div className="flex flex-col gap-1 p-3 flex-grow-1">
								<p className="font-semibold">{chapitre.title}</p>
								<p className="text-neutral-400 text-xs">{chapitre.subtitle}</p>
								<div>
									<p className="flex justify-end text-xs text-neutral-400">
										{chapitre.degree}/20 Note
									</p>
									<div className="bg-neutral-200 h-3 w-full mt-1">
										<div
											className="bg-skblue h-3"
											style={{ width: `${(chapitre.degree / 20) * 100}%` }}
										/>
									</div>
								</div>
							</div>
						</Link>
					))}
				</div>
			</div>
		</section>
	);
}
