import RadarChart from "./Radarchart";

export default function Progression() {
	const general = {
		title: "Moyenne générale",
		degree: "16.5",
	};
	const cards = [
		{
			slug: "math",
			subject: "Mathématiques",
			degree: 17.5,
			rank: 5,
			bg_rank: "bg-math/33",
			color: "text-math",
			bg: "bg-math",
		},
		{
			slug: "physique",
			subject: "Physique",
			degree: 16.5,
			rank: false,
			bg_rank: "bg-physique/33",
			color: "text-physique",
			bg: "bg-physique",
		},
		{
			slug: "chimie",
			subject: "Chimie",
			degree: 14,
			rank: false,
			bg_rank: "bg-chimie/33",
			color: "text-chimie",
			bg: "bg-chimie",
		},
		{
			slug: "svt",
			subject: "S.V.T",
			degree: 15.75,
			rank: false,
			bg_rank: "bg-svt/33",
			color: "text-svt",
			bg: "bg-svt",
		},
		{
			slug: "english",
			subject: "Anglais",
			degree: 18.5,
			rank: 1,
			bg_rank: "bg-english/33",
			color: "text-english",
			bg: "bg-english",
		},
		{
			slug: "philosophie",
			subject: "Philosophie",
			degree: 19,
			rank: 10,
			bg_rank: "bg-philosophie/33",
			color: "text-philosophie",
			bg: "bg-philosophie",
		},
	];
	return (
		<section className="px-0 md:px-5 py-5 flex flex-col gap-6">
			{/* Title + Cards */}
			<div className="flex flex-col gap-6">
				{/* Titles */}
				<div className="flex flex-col gap-1.5">
					<h1 className="flex gap-1 font-bold text-3xl">Ma progression</h1>
					<p className="text-neutral-500 text-[13px] sm:text-sm">
						Visualise ton chemin vers la réussite.
					</p>
				</div>
				{/* Cards */}
				<section className="grid grid-cols-12 gap-y-5 gap-0 sm:gap-5 lg:gap-y-10 lg:gap-10">
					{/* Moyenne générale */}
					<div className="col-span-12 sm:col-span-6 lg:col-span-4 bg-white p-3 pb-6 flex flex-col justify-start items-center gap-5 shadow-[3px_3px_10px_0px_rgba(0,_0,_0,_0.1)] border border-neutral-200">
						<p className="font-semibold text-base sm:text-2xl self-start w-full">
							{general.title}
						</p>
						<div
							className={`relative rounded-full w-1/2 aspect-square bg-conic from-skblue from-${general.degree}% to-neutral-200 to-0% transition-all duration-300`}
							style={{
								background: `conic-gradient(var(--color-skblue) ${
									general.degree * 18
								}deg, #e5e5e5 0deg)`,
							}}
						>
							<div className="absolute top-1/2 left-1/2 -translate-1/2 w-[85%] h-[85%] flex justify-center items-center text-2xl sm:text-md lg:text-2xl xl:text-4xl font-semibold bg-white rounded-full">
								{general.degree}
								<span className="text-xs text-neutral-400 font-normal">
									/20
								</span>
							</div>
						</div>
					</div>
					{/* Radar Chart */}
					<div className="col-span-12 sm:col-span-6 lg:col-span-8 bg-white p-3 pb-0 flex flex-col justify-start items-center shadow-[3px_3px_10px_0px_rgba(0,_0,_0,_0.1)] border border-neutral-200">
						<p className="font-semibold text-base sm:text-2xl self-start w-full">
							Compétence développée
						</p>
						<div className="-mt-5 w-[260px] min-[400px]:w-[300px]">
							<RadarChart />
						</div>
					</div>
					{/* Subjects */}
					{cards.map((card) => (
						<div
							key={card.subject}
							className="col-span-12 sm:col-span-4 xl:col-span-3 bg-white p-3 pb-6 flex flex-col justify-start items-center gap-5 shadow-[3px_3px_10px_0px_rgba(0,_0,_0,_0.1)] border border-neutral-200"
						>
							<div className="flex items-center justify-between self-start w-full">
								<p className="font-semibold">{card.subject}</p>
								{card.rank && (
									<p
										className={`${card.bg_rank} font-bold ${card.color} text-[8px] flex justify-center items-center p-1 h-4`}
									>
										TOP {card.rank} %
									</p>
								)}
							</div>

							<div
								className={`relative rounded-full w-1/2 aspect-square bg-conic from-skblue from-${card.degree}% to-neutral-200 to-0% transition-all duration-300`}
								style={{
									background: `conic-gradient(var(--color-${card.slug}) ${
										card.degree * 18
									}deg, #e5e5e5 0deg)`,
								}}
							>
								<div className="absolute top-1/2 left-1/2 -translate-1/2 w-[85%] h-[85%] flex justify-center items-center text-2xl sm:text-base md:text-md lg:text-xl font-semibold bg-white rounded-full">
									{card.degree}
									<span className="text-xs text-neutral-400 font-normal">
										/20
									</span>
								</div>
							</div>
						</div>
					))}
				</section>
			</div>
		</section>
	);
}
