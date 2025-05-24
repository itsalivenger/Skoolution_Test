import { MoveRight } from "lucide-react";
import Link from "next/link";

export default function Button({ text, color, bg, href, addStyle }) {
	return (
		<div>
			<Link
				href={href}
				className={`group flex justify-center items-center gap-1 border border-skblue dark:border-skblack text-base ${color} ${bg} px-0 lg:px-3 xl:px-7 h-[40px] font-semibold text-nowrap rounded-xs ${addStyle}`}
			>
				<p className="translate-x-[14px] group-hover:translate-x-0 transition-all duration-500">
					{text}
				</p>
				<MoveRight className="-translate-x-5/6 scale-0 opacity-0 group-hover:opacity-100 group-hover:scale-100  group-hover:-translate-x-0 transition-all duration-500" />
			</Link>
		</div>
	);
}
