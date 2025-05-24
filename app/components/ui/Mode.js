"use client";
import { MoonStar, Sun } from "lucide-react";
import { useState } from "react";
export default function Mode() {
	const [isDark, setIsDark] = useState(false);
	return (
		<button
			onClick={() => {
				setIsDark(!isDark);
				document.documentElement.classList.toggle("dark");
			}}
			className="border cursor-pointer border-gray-400 p-2.5 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-700 dark:bg-neutral-800 bg-neutral-50 "
		>
			{isDark && <Sun size={20} color="orange" />}
			{!isDark && <MoonStar size={20} color="#1c398e" />}
		</button>
	);
}
