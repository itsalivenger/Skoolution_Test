import Header from "../components/client/Header";
import Sidebar from "../components/client/Sidebar";
import Home from "../components/client/Home";

export default function page() {
	return (
		<section className="flex h-dvh overflow-hidden">
			<Sidebar />
			<section className="flex flex-col w-full py-5 pr-[12px] md:pr-5 pl-[72px] md:pl-5 bg-[#fafafa]  overflow-y-scroll">
				<Header />
				<Home />
			</section>
		</section>
	);
}
