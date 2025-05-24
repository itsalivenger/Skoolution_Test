import Header from "@/app/components/client/Header";
import Sidebar from "@/app/components/client/Sidebar";
import Competences from "@/app/components/client/Competences";

export default function page() {
	return (
		<section className="flex h-dvh overflow-hidden">
			<Sidebar />
			<section className="flex flex-col w-full py-5 pr-[12px] md:pr-5 pl-[72px] md:pl-5 bg-[#fafafa]  overflow-y-scroll">
				<Header />
				<Competences />
			</section>
		</section>
	);
}
