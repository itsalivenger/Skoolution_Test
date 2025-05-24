import { Bell, Pencil, Search } from "lucide-react";

export default function Header() {
	return (
		<section>
			<div className="w-full flex gap-3 items-center justify-between">
				<div className="relative w-full">
					<input
						type="search"
						placeholder="Rechercher une leçon, un test, une matière ..."
						className="border border-neutral-200 p-3 pl-12 w-full bg-white placeholder:text-sm h-10"
					/>
					<Search
						size={20}
						className="absolute top-1/2 -translate-y-1/2 left-4 text-neutral-500 rounded-sm"
					/>
				</div>
				<div className="flex items-center gap-1">
					<div className="flex justify-end">
						<button className="bg-skblue text-white flex items-center justify-center gap-2 px-1.5 md:py-3 md:px-6 h-9 md:h-10 w-9 md:w-auto rounded-full md:rounded-none cursor-pointer">
							<Pencil size={18} />
							<span className="hidden md:inline text-nowrap">
								2ème année Bac PC/SVT
							</span>
						</button>
					</div>
					<div className="flex justify-end">
						<button className="text-neutral-400 flex items-center justify-center gap-1 w-9 rounded-full cursor-pointer">
							<span>|</span>
							<Bell size={18} />
						</button>
					</div>
					<div className="w-9 flex justify-end">
						<img
							src="/sk/testimony_4.webp"
							alt="Profile"
							className="w-9 h-9 border-2 border-skblue rounded-full"
						/>
					</div>
				</div>
			</div>
		</section>
	);
}
