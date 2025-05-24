import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";
import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function SwiperComponents() {
	const swiperRef = useRef(null);
	return (
		<>
			<div className="relative">
				{/* Custom Navigation Buttons */}
				<div className="absolute -top-2 min-[425px]:-top-15 min-[490px]:-top-25 min-[640px]:-top-30 -right-2 min-[425px]:right-0 z-10 flex space-x-2 p-4 ">
					<button
						onClick={() => swiperRef.current?.slidePrev()}
						className="text-skblue dark:text-white border-1 dark:border-2 border-skblue dark:border-white p-1 sm:p-2 rounded-full cursor-pointer"
					>
						<ChevronLeft />
					</button>
					<button
						onClick={() => swiperRef.current?.slideNext()}
						className="text-skblue dark:text-white border-1 dark:border-2 border-skblue dark:border-white p-1 sm:p-2 rounded-full cursor-pointer"
					>
						<ChevronRight />
					</button>
				</div>
				<Swiper
					onSwiper={(swiper) => {
						swiperRef.current = swiper;
					}}
					spaceBetween={50}
					breakpoints={{
						0: { slidesPerView: 1 },
						768: { slidesPerView: 2 },
						1024: { slidesPerView: 3 },
					}}
					loop={true}
					modules={[Pagination, Navigation]}
					className="p-3"
				>
					<SwiperSlide>
						<div className="flex flex-col mx-auto gap-3.5 bg-white dark:bg-skblack-second p-8 max-w-96 h-full rounded-sm shadow-xl">
							<div className="flex items-center gap-4">
								<img
									src="/sk/testimony_1.webp"
									alt="Testimony 1"
									className="w-20 h-20"
								/>
								<div className="flex flex-col gap-0.5 justify-center">
									<p className="font-semibold">Youssef</p>
									<p className="text-sm text-skgray dark:text-skgray-second">
										Élève
									</p>
									<p className="mt-1 -ml-1 font-semibold">⭐ 4.9</p>
								</div>
							</div>
							<p className="text-skgray dark:text-skgray-second text-sm line-clamp-3 h-[60px]">
								Grâce à Skoolution, j'ai augmenté ma moyenne en maths de 3
								points en seulement deux mois.
							</p>
						</div>
					</SwiperSlide>
					<SwiperSlide>
						<div className="flex flex-col mx-auto gap-3.5 bg-white dark:bg-skblack-second p-8 max-w-96 rounded-sm shadow-xl">
							<div className="flex items-center gap-4">
								<img
									src="/sk/testimony_2.webp"
									alt="Testimony 2"
									className="w-20 h-20"
								/>
								<div className="flex flex-col gap-0.5 justify-center">
									<p className="font-semibold">Amina</p>
									<p className="text-sm text-skgray dark:text-skgray-second">
										Élève
									</p>
									<p className="mt-1 -ml-1 font-semibold">⭐ 4.2</p>
								</div>
							</div>
							<p className="text-skgray dark:text-skgray-second text-sm line-clamp-3 h-[60px]">
								Les tests adaptatifs m'ont aidée à comprendre mes lacunes et à
								progresser rapidement.
							</p>
						</div>
					</SwiperSlide>
					<SwiperSlide>
						<div className="flex flex-col mx-auto gap-3.5 bg-white dark:bg-skblack-second p-8 max-w-96 rounded-sm shadow-xl">
							<div className="flex items-center gap-4">
								<img
									src="/sk/testimony_3.webp"
									alt="Testimony 3"
									className="w-20 h-20"
								/>
								<div className="flex flex-col gap-0.5 justify-center">
									<p className="font-semibold">M. El Amrani</p>
									<p className="text-sm text-skgray dark:text-skgray-second">
										Professeur
									</p>
									<p className="mt-1 -ml-1 font-semibold">⭐ 5.0</p>
								</div>
							</div>
							<p className="text-skgray dark:text-skgray-second text-sm line-clamp-3 h-[60px]">
								Skoolution est un outil indispensable pour mes élèves. Le suivi
								personnalisé fait toute la différence.
							</p>
						</div>
					</SwiperSlide>
					<SwiperSlide>
						<div className="flex flex-col mx-auto gap-3.5 bg-white dark:bg-skblack-second p-8 max-w-96 rounded-sm shadow-xl">
							<div className="flex items-center gap-4">
								<img
									src="/sk/testimony_5.webp"
									alt="Testimony 5"
									className="w-20 h-20"
								/>
								<div className="flex flex-col gap-0.5 justify-center">
									<p className="font-semibold">Samir</p>
									<p className="text-sm text-skgray dark:text-skgray-second">
										Professeur
									</p>
									<p className="mt-1 -ml-1 font-semibold">⭐ 5.0</p>
								</div>
							</div>
							<p className="text-skgray dark:text-skgray-second text-sm line-clamp-3 h-[60px]">
								Skoolution a transformé ma manière d’enseigner. L’accompagnement
								personnalisé permet à chaque élève de progresser à son rythme.
							</p>
						</div>
					</SwiperSlide>
					<SwiperSlide>
						<div className="flex flex-col mx-auto gap-3.5 bg-white dark:bg-skblack-second p-8 max-w-96 rounded-sm shadow-xl">
							<div className="flex items-center gap-4">
								<img
									src="/sk/testimony_4.webp"
									alt="Testimony 4"
									className="w-20 h-20"
								/>
								<div className="flex flex-col gap-0.5 justify-center">
									<p className="font-semibold">Karima</p>
									<p className="text-sm text-skgray dark:text-skgray-second">
										Élève
									</p>
									<p className="mt-1 -ml-1 font-semibold">⭐ 5.0</p>
								</div>
							</div>
							<p className="text-skgray dark:text-skgray-second text-sm line-clamp-3 h-[60px]">
								Skoolution m'a permis d'apprendre plus efficacement en me
								concentrant sur mes points faibles. Je vois une vraie
								amélioration !
							</p>
						</div>
					</SwiperSlide>
					<SwiperSlide>
						<div className="flex flex-col mx-auto gap-3.5 bg-white dark:bg-skblack-second p-8 max-w-96 rounded-sm shadow-xl">
							<div className="flex items-center gap-4">
								<img
									src="/sk/testimony_6.webp"
									alt="Testimony 6"
									className="w-20 h-20"
								/>
								<div className="flex flex-col gap-0.5 justify-center">
									<p className="font-semibold">Imad</p>
									<p className="text-sm text-skgray dark:text-skgray-second">
										Élève
									</p>
									<p className="mt-1 -ml-1 font-semibold">⭐ 4.8</p>
								</div>
							</div>
							<p className="text-skgray dark:text-skgray-second text-sm line-clamp-3 h-[60px]">
								Grâce aux exercices personnalisés, j’ai pu progresser à mon
								rythme et mieux comprendre mes erreurs.
							</p>
						</div>
					</SwiperSlide>
				</Swiper>
			</div>
		</>
	);
}
