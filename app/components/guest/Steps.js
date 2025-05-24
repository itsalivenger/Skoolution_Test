import Button from "../ui/Button";

export default function Steps() {
	return (
		<section
			className="
			w-full px-5 py-10 xl:px-0 lg:w-11/12 xl:w-10/12 max-w-[1260px] flex flex-col gap-15 
			justify-between"
		>
			{/* Top Section */}
			<div className="flex flex-col gap-4 mb-15">
				<h2 className="text-3xl md:text-4xl xl:text-5xl font-bold">
					Comment <span className="text-skblue">ça marche ?</span>
				</h2>
				<p className="text-skgray dark:text-skgray-second ">
					Comprenez en quelques étapes comment profiter pleinement de nos
					services.
				</p>
			</div>
			{/* Center Section */}
			<div className="grid grid-cols-1 min-[640px]:grid-cols-2 min-[1200px]:grid-cols-12 gap-x-24 gap-y-[156px]">
				{/* first */}
				<div className="relative min-[1200px]:col-span-4 flex flex-col items-center text-center bg-white dark:bg-skblack-second shadow-lg p-5 pt-20 gap-3 border border-skgray/3">
					<p className="font-semibold">Inscription gratuite</p>
					<p className="text-skgray dark:text-skgray-second  -second text-sm">
						Créez votre compte en 2 minutes avec un formulaire simple.
					</p>
					<div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-skblue-second dark:bg-[#252D36] w-30 h-30 rounded-full text-skblue flex justify-center items-center text-5xl font-semibold">
						01
					</div>
					{/* Start Horizontal Arrow */}
					<div className="hidden sm:inline-block absolute -right-20 top-1/3 -translate-y-1/2 w-16 h-1 bg-skblue rounded-r-full"></div>
					<div className="hidden sm:inline-block absolute -right-20 top-1/3 -translate-y-1/2 w-5 h-5 border-t-4 border-r-4 border-skblue rotate-45"></div>
					{/* End Horizontal Arrow */}
					{/* End Vertical Arrow */}
					<div className="inline-block sm:hidden absolute left-1/2 -bottom-20 -translate-x-1/2 w-1 h-16 bg-skblue "></div>
					<div className="inline-block sm:hidden absolute left-1/2 -bottom-20 -translate-x-1/2 w-5 h-5 border-b-4 border-l-4 border-skblue -rotate-45"></div>
					{/* End Vertical Arrow */}
				</div>
				{/* Second */}
				<div className="relative min-[1200px]:col-span-4 flex flex-col items-center text-center bg-white dark:bg-skblack-second shadow-lg p-5 pt-20 gap-3 border border-skgray/3">
					<p className="font-semibold">Test de diagnostic</p>
					<p className="text-skgray dark:text-skgray-second  text-sm">
						Identifiez vos points forts et à améliorer pour personnaliser votre
						apprentissage.
					</p>
					<div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-skblue-second dark:bg-[#252D36] w-30 h-30 rounded-full text-skblue flex justify-center items-center text-5xl font-semibold">
						02
					</div>
					{/* Start Horizontal Arrows */}
					<div className="hidden min-[1200px]:inline-block absolute -right-20 top-1/3 -translate-y-1/2 w-16 h-1 bg-skblue rounded-r-full"></div>
					<div className="hidden min-[1200px]:inline-block absolute -right-20 top-1/3 -translate-y-1/2 w-5 h-5 border-t-4 border-r-4 border-skblue rotate-45"></div>
					{/* End Horizontal Arrows */}
					{/* End Vertical Arrow */}
					<div className="inline-block sm:hidden absolute left-1/2 -bottom-20 -translate-x-1/2 w-1 h-16 bg-skblue "></div>
					<div className="inline-block sm:hidden absolute left-1/2 -bottom-20 -translate-x-1/2 w-5 h-5 border-b-4 border-l-4 border-skblue -rotate-45"></div>
					{/* End Vertical Arrow */}
				</div>
				{/* Third */}
				<div className="relative min-[1200px]:col-span-4 flex flex-col items-center text-center bg-white dark:bg-skblack-second shadow-lg p-5 pt-20 gap-3 border border-skgray/3">
					<p className="font-semibold">Plan personnalisé</p>
					<p className="text-skgray dark:text-skgray-second  text-sm">
						Recevez un programme de révision personnalisé selon vos besoins.
					</p>
					<div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-skblue-second dark:bg-[#252D36] w-30 h-30 rounded-full text-skblue flex justify-center items-center text-5xl font-semibold">
						03
					</div>
					{/* Start Horizontal Arrows */}
					<div className="hidden min-[640px]:inline-block min-[1200px]:hidden absolute -right-20 top-1/3 -translate-y-1/2 w-16 h-1 bg-skblue rounded-r-full"></div>
					<div className="hidden min-[640px]:inline-block min-[1200px]:hidden absolute -right-20 top-1/3 -translate-y-1/2 w-5 h-5 border-t-4 border-r-4 border-skblue rotate-45"></div>
					{/* End Horizontal Arrows */}
					{/* End Vertical Arrow */}
					<div className="inline-block sm:hidden absolute left-1/2 -bottom-20 -translate-x-1/2 w-1 h-16 bg-skblue "></div>
					<div className="inline-block sm:hidden absolute left-1/2 -bottom-20 -translate-x-1/2 w-5 h-5 border-b-4 border-l-4 border-skblue -rotate-45"></div>
					{/* End Vertical Arrow */}
				</div>
				{/* Fourth */}
				<div className="relative min-[1200px]:col-span-4 min-[1200px]:col-start-3 flex flex-col items-center text-center bg-white dark:bg-skblack-second shadow-lg p-5 pt-20 gap-3 border border-skgray/3">
					<p className="font-semibold">Suivi des progrès</p>
					<p className="text-skgray dark:text-skgray-second  text-sm">
						Consultez vos résultats instantanément pour suivre vos progrès.
					</p>
					<div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-skblue-second dark:bg-[#252D36] w-30 h-30 rounded-full text-skblue flex justify-center items-center text-5xl font-semibold">
						04
					</div>
					{/* Start Horizontal Arrows */}
					<div className="hidden min-[1200px]:inline-block absolute -right-20 top-1/3 -translate-y-1/2 w-16 h-1 bg-skblue rounded-r-full"></div>
					<div className="hidden min-[1200px]:inline-block absolute -right-20 top-1/3 -translate-y-1/2 w-5 h-5 border-t-4 border-r-4 border-skblue rotate-45"></div>
					{/* End Horizontal Arrows */}
					{/* End Vertical Arrow */}
					<div className="inline-block sm:hidden absolute left-1/2 -bottom-20 -translate-x-1/2 w-1 h-16 bg-skblue "></div>
					<div className="inline-block sm:hidden absolute left-1/2 -bottom-20 -translate-x-1/2 w-5 h-5 border-b-4 border-l-4 border-skblue -rotate-45"></div>
					{/* End Vertical Arrow */}
				</div>
				{/* Fifth */}
				<div className="relative min-[1200px]:col-span-4 min-[1200px]:col-start-7 flex flex-col items-center text-center bg-white dark:bg-skblack-second shadow-lg p-5 pt-20 gap-3 border border-skgray/3">
					<p className="font-semibold">Améliorez-vous</p>
					<p className="text-skgray dark:text-skgray-second  text-sm">
						Répétez les révisions jusqu’à l’évaluation finale pour suivre vos
						progrès.
					</p>
					<div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-skblue-second dark:bg-[#252D36] w-30 h-30 rounded-full text-skblue flex justify-center items-center text-5xl font-semibold">
						05
					</div>
				</div>
			</div>
			{/* Bottom Section */}
			<Button
				href="/login"
				color="text-white"
				bg="bg-skblue"
				text="Testez gratuitement"
				addStyle="mx-auto w-full sm:w-60"
			/>
		</section>
	);
}
