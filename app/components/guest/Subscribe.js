import { Mail } from "lucide-react";

export default function Subscribe() {
	return (
		<section className="bg-skblue text-white w-full flex justify-center px-5 xl:px-0 py-10 text-[14px] lg:text-[16px]">
			<div className="flex flex-col sm:flex-row items-center text-center gap-5  sm:text-start w-full lg:w-11/12 xl:w-10/12 max-w-[1260px]">
				<p className="font-semibold text-xl sm:text-2xl lg:text-3xl sm:w-1/2">
					Join the world largest online{" "}
					<br className="hidden md:inline-block" /> learning platform
				</p>
				<form className="relative w-full sm:w-1/2">
					<input
						type="email"
						placeholder="name@email.com"
						className="w-full bg-white placeholder:text-neutral-500 placeholder:pl-6 outline-0 border-0 text-skblack p-5"
					/>
					<Mail
						size={24}
						strokeWidth={1.25}
						className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500"
					/>
					<button
						type="button"
						className="absolute right-2 top-1/2 -translate-y-1/2 h-[calc(100%-16px)] bg-skblue p-2.5"
					>
						Rejoignez<span className="inline sm:hidden md:inline">-nous</span>
					</button>
				</form>
			</div>
		</section>
	);
}
