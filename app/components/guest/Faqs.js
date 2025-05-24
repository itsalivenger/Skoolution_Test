import Faq from "./Faq";

export default function Faqs() {
	return (
		<section
			id="faqs"
			className="w-full px-5 py-22 xl:px-0 lg:w-11/12 xl:w-10/12 max-w-[1260px] flex  flex-col gap-15"
		>
			<h2 className="text-3xl md:text-4xl xl:text-5xl font-bold">
				Vous avez des <span className="text-skblue">Questions ?</span>
			</h2>
			<div className="grid grid-cols-1 min-[960px]:grid-cols-2 gap-5">
				<Faq
					title="Est-ce que Skoolution est vraiment gratuit ?"
					description="Oui, vous pouvez essayer Skoolution gratuitement pendant 7 jours."
				/>
				<Faq
					title="Puis-je utiliser Skoolution sur mon smartphone ?"
					description="Oui, vous pouvez essayer Skoolution gratuitement pendant 7 jours."
				/>
				<Faq
					title="Comment puis-je suivre mes progrès ?"
					description="Oui, vous pouvez essayer Skoolution gratuitement pendant 7 jours."
				/>
				<Faq
					title="Comment fonctionne le diagnostic de début ?"
					description="Oui, vous pouvez essayer Skoolution gratuitement pendant 7 jours."
				/>
				<Faq
					title="Skoolution propose-t-il des exercices interactifs ?"
					description="Oui, vous pouvez essayer Skoolution gratuitement pendant 7 jours."
				/>
				<Faq
					title="Puis-je accéder à mes cours hors ligne ?"
					description="Oui, vous pouvez essayer Skoolution gratuitement pendant 7 jours."
				/>
			</div>
		</section>
	);
}
