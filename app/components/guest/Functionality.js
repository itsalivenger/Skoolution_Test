import { ChartNoAxesCombined, Gauge, ListTodo, SquarePen } from "lucide-react";
import Button from "../ui/Button";

export default function Functionality() {
	return (
		<section
			id="fonctionnalité"
			className="bg-skblue-second dark:bg-skblack-second w-full flex justify-center px-5 xl:px-0 py-10 text-[14px] lg:text-[16px] min-h-screen"
		>
			<div className="flex flex-col sm:flex-row justify-between items-center gap-10 w-full lg:w-11/12 xl:w-10/12 max-w-[1260px]">
				{/* Left Column */}
				<div className="w-full min-[500px]:w-2/3 sm:w-1/2  flex flex-row-reverse justify-center sm:justify-start">
					<img
						src="/sk/student_4.webp"
						alt="Student 4"
						className="w-full -mb-0 sm:-mb-6 inline-block dark:hidden"
					/>
					<img
						src="/sk_dark/student_4.webp"
						alt="Student 4"
						className="w-full -mb-0 sm:-mb-6 hidden dark:inline-block"
					/>
				</div>
				{/* Right Column */}
				<div className="w-full sm:w-1/2 flex flex-col gap-12">
					<div className="flex flex-col gap-3">
						<h2 className="text-3xl md:text-4xl xl:text-5xl font-bold">
							<span className="text-skblue">Fonctionnalité</span> clé
						</h2>
						<p className="text-skgray dark:text-skgray-second">
							Découvrez ce qui rend notre plateforme unique.
						</p>
					</div>
					<div className="flex flex-col gap-5">
						{/* First */}
						<div className="flex items-center gap-5">
							<div className="bg-skblue-third w-fit p-3 sm:p-6 text-skblue rounded-sm">
								<Gauge size={30} />
							</div>
							<div className="flex flex-col justify-center gap-1">
								<h3 className="font-semibold text-md">
									Tests interactifs en temps réel
								</h3>
								<p className="text-skgray dark:text-skgray-second text-sm">
									Les tests interactifs évaluent vos connaissances avec des
									questions et corrections instantanées.
								</p>
							</div>
						</div>
						{/* Second */}
						<div className="flex items-center gap-5">
							<div className="bg-skblue-third w-fit  p-3 sm:p-6 text-skblue rounded-sm">
								<ListTodo size={30} />
							</div>
							<div className="flex flex-col justify-center gap-1">
								<h3 className="font-semibold text-md">
									Révision ciblée efficace.
								</h3>
								<p className="text-skgray dark:text-skgray-second text-sm">
									Le plan de révision s'adapte à vos lacunes pour optimiser
									votre apprentissage.
								</p>
							</div>
						</div>
						{/* Third */}
						<div className="flex items-center gap-5">
							<div className="bg-skblue-third w-fit  p-3 sm:p-6 text-skblue rounded-sm">
								<SquarePen size={30} />
							</div>
							<div className="flex flex-col justify-center gap-1">
								<h3 className="font-semibold text-md">
									Contenus exclusifs conformes.
								</h3>
								<p className="text-skgray dark:text-skgray-second text-sm">
									Accès à des ressources exclusives selon les référentiels
									marocains.
								</p>
							</div>
						</div>
						{/* Fourth */}
						<div className="flex items-center gap-5">
							<div className="bg-skblue-third w-fit  p-3 sm:p-6 text-skblue rounded-sm">
								<ChartNoAxesCombined size={30} />
							</div>
							<div className="flex flex-col justify-center gap-1">
								<h3 className="font-semibold text-md">Suivi visuel précis.</h3>
								<p className="text-skgray dark:text-skgray-second text-sm">
									Suivi de vos progrès à l’aide de graphiques précis et
									détaillés.
								</p>
							</div>
						</div>
					</div>
					<Button
						href="/login"
						color="text-white"
						bg="bg-skblue"
						text="Commencer"
						addStyle="w-fit"
					/>
				</div>
			</div>
		</section>
	);
}
