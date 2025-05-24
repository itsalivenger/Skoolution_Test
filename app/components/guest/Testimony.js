import SwiperComponents from "./SwiperComponents";

export default function Testimony() {
	return (
		<section
			id="témoignage"
			className="bg-skblue-second dark:bg-skblack-second w-full flex justify-center px-5 xl:px-0 py-28 text-[14px] lg:text-[16px]"
		>
			<div className="flex flex-col justify-between gap-15 w-full lg:w-11/12 xl:w-10/12 max-w-[1260px]">
				{/* Top Column */}
				<div className="flex flex-col gap-4">
					<h2 className="text-3xl md:text-4xl xl:text-5xl font-bold">
						Ce que nos <span className="text-skblue">Élèves</span> disent?
					</h2>
					<p className="text-skgray  dark:text-skgray-second">
						Ils ont amélioré leurs résultats grâce à Skoolution
					</p>
				</div>
				{/* Bottom Column */}
				<div>
					<SwiperComponents />
				</div>
			</div>
		</section>
	);
}
