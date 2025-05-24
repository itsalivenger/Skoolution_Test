import { Facebook, Instagram, Linkedin, Mail } from "lucide-react";

export default function Footer() {
	return (
		<section className="bg-skblack text-white/70 w-full flex justify-center px-5 xl:px-0 pt-16 text-[14px] lg:text-[16px]">
			<div className="flex flex-col text-center sm:text-start w-full lg:w-11/12 xl:w-10/12 max-w-[1260px]">
				<div className="flex flex-col sm:flex-row items-center sm:items-start gap-10 sm:gap-20 lg:gap-40">
					{/* Column 1 */}
					<div className="w-full md:w-4/12 lg:w-3/12 flex flex-col gap-5">
						{/* Logo */}
						<div className="font-poppins text-2xl sm:text-3xl flex justify-center sm:justify-start items-center gap-1 tracking-wide font-semibold uppercase">
							<span className="flex justify-center items-center px-3.5 h-[40px] bg-white text-skblue">
								sk
							</span>
							<span className="text-white sm:inline-block">oolution</span>
						</div>
						{/* Description */}
						<p className="leading-7">
							Skoolution est une startup EdTech qui transforme l’évaluation des
							lycéens scientifiques marocains grâce à des tests adaptatifs
							intelligents.
						</p>
					</div>
					{/* Column 2 */}
					<div className="flex flex-col gap-5">
						<h3 className="text-xl lg:text-2xl font-semibold text-white text-nowrap">
							Liens utiles
						</h3>
						<div className="flex flex-col gap-2">
							<a href="#">Accueil</a>
							<a href="#">À propos</a>
							<a href="#">Contact</a>
							<a href="#">Blog</a>
							<a href="#">FAQ</a>
						</div>
					</div>
					{/* Column 3 */}
					<div className="flex flex-col gap-5">
						<h3 className="text-xl lg:text-2xl font-semibold text-white">
							Réseaux sociaux
						</h3>
						<div className="flex gap-5">
							<a href="mailto:contact@skoolution.com">
								<Mail size={20} />
							</a>
							<a
								href="https://www.linkedin.com/company/skoolution/"
								target="_blank"
							>
								<Linkedin size={20} />
							</a>
							<a href="https://www.instagram.com/skoolution/" target="_blank">
								<Instagram size={20} />
							</a>
							<a
								href="https://www.facebook.com/people/Skoolution/61565846353427/"
								target="_blank"
							>
								<Facebook size={20} />
							</a>
						</div>
					</div>
				</div>
				<div className="pt-10 pb-16 sm:pb-10">
					<p>© {new Date().getFullYear()} Skoolution. Tous droits réservés.</p>
				</div>
			</div>
		</section>
	);
}
